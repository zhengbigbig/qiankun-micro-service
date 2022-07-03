import history from '@/utils/history';
import { ConfigProvider } from 'antd';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import './global.less';
import routers from './routers';

ConfigProvider.config({
    prefixCls: 'ant-main', // 处理message前缀
});

function App() {
    return (
        <ConfigProvider prefixCls="ant-main">
            <div className="app">
                <Router history={history}>
                    <Switch>
                        {routers.map((route, index) => (
                            <Route key={index} {...route} />
                        ))}
                    </Switch>
                </Router>
            </div>
        </ConfigProvider>
    );
}

export default App;
