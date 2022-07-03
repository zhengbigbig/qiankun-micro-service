import React, { FC, useEffect, useRef, useState } from 'react';
import { addGlobalUncaughtErrorHandler, loadMicroApp, MicroApp, removeGlobalUncaughtErrorHandler } from 'qiankun';
import history from '@/utils/history';
import * as H from 'history';
import ResultPage from '@/components/ResultPage';
import { Prompt } from 'react-router';

interface MicroAppLoaderProps {
    entry: string; // 微应用的路口地址
}

const MicroAppLoader: FC<MicroAppLoaderProps> = (props) => {
    const { entry } = props;
    console.log('entry', entry);

    const [loading, setLoading] = useState(false);
    const [prompt, setPrompt] = useState({
        when: false,
        message: (location: H.Location, action: H.Action) => '是否要离开当前页面',
    });
    const containerRef = useRef<any>();
    const appRef = useRef<MicroApp>();

    useEffect(() => {
        setLoading(true);
        const _entry = entry.startsWith('http') ? entry : `${location.origin}${entry}`;
        appRef.current = loadMicroApp(
            {
                name: _entry,
                entry: `${_entry}`,
                container: containerRef.current || '',
                props: {
                    history: history,
                    setPrompt,
                },
            },
            {
                singular: false,
            }
        );
        appRef.current.loadPromise.then(() => {
            setLoading(false);
        });
        const exceptionHandler = (e: any) => {
            console.log('异常捕获', e, appRef.current?.getStatus());
        };
        appRef.current.loadPromise.catch((e) => {
            console.log('子引用加载失败', e);
            history.push('/app/500');
        });
        addGlobalUncaughtErrorHandler(exceptionHandler);
        return () => {
            console.log('卸载子应用');
            removeGlobalUncaughtErrorHandler(exceptionHandler);
            appRef.current?.unmount();
        };
    }, [entry]);

    return (
        <>
            <Prompt when={prompt.when} message={prompt.message} />
            {loading && <ResultPage status="loading" />}
            <div ref={containerRef} />
        </>
    );
};

export default MicroAppLoader;
