import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Result, Spin } from 'antd';
import styles from './index.less';

interface ErrorPageProps {
    status: 403 | 404 | 500 | 'authFetching' | 'loading';
}

const ResultPage: FC<ErrorPageProps> = (props) => {
    const { status } = props;
    const history = useHistory();

    const backHome = () => {
        history.push('/app');
    };

    const errorBackHome = () => {
        history.push('/app');
        // 解决报错完要手动刷新问题
        window.location.reload();
    };

    if (status === 403) {
        return (
            <div className={styles.container}>
                <Result
                    status={status}
                    title={status}
                    subTitle="无权访问该页面"
                    extra={
                        <Button type="primary" onClick={backHome}>
                            回到主页
                        </Button>
                    }
                />
            </div>
        );
    }

    if (status === 404) {
        return (
            <div className={styles.container}>
                <Result
                    status={status}
                    title={status}
                    subTitle="页面不存在"
                    extra={
                        <Button type="primary" onClick={backHome}>
                            回到主页
                        </Button>
                    }
                />
            </div>
        );
    }

    if (status === 500) {
        return (
            <div className={styles.container}>
                <Result
                    status={status}
                    title={status}
                    subTitle="页面出错了"
                    extra={
                        <Button type="primary" onClick={errorBackHome}>
                            回到主页
                        </Button>
                    }
                />
            </div>
        );
    }
    if (status === 'authFetching') {
        return (
            <div className={styles.container}>
                <Spin spinning={true} tip="权限获取中" />
            </div>
        );
    }
    if (status === 'loading') {
        return (
            <div className={styles.container}>
                <Spin spinning={true} tip="页面加载中..." />
            </div>
        );
    }
    return null;
};

export default ResultPage;
