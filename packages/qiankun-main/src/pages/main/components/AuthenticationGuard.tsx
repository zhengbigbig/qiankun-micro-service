import React, { FC, useEffect } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import BaseStore, { BaseStoreContext } from '@/models/BaseStore';
import ResultPage from '@/components/ResultPage';

const AuthenticationGuard: FC<any> = observer((props) => {
    const { children } = props;

    const store = useLocalObservable(() => new BaseStore());
    const { initAuthentication, authenticated } = store;

    useEffect(() => {
        initAuthentication();
    }, []);

    return (
        <BaseStoreContext.Provider value={store}>
            {!authenticated ? <ResultPage status="authFetching" /> : children}
        </BaseStoreContext.Provider>
    );
});

export default AuthenticationGuard;
