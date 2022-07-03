import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import AuthenticationGuard from './components/AuthenticationGuard';
import BasicLayout from './components/BasicLayout';
import routes from './routers';
import history from '@/utils/history';
import ErrorBoundary from '@/components/ErrorBoundary';
import ResultPage from '@/components/ResultPage';

const Main: React.FC<any> = () => {
    console.log('__MICRO_APP__.micro1', __MICRO_APP__.micro1);
    return (
        <AuthenticationGuard>
            <BasicLayout>
                <Switch>
                    <Route path="/app" exact component={() => <Redirect to="/app/micro2" />} />
                    <Route path="/app/404" exact component={() => <ResultPage status={404} />} />
                    <Route path="/app/500" exact component={() => <ResultPage status={500} />} />
                    <ErrorBoundary>
                        {routes.map((route, index) => (
                            <Route key={index} {...route} path={route.path} />
                        ))}
                    </ErrorBoundary>
                </Switch>
            </BasicLayout>
        </AuthenticationGuard>
    );
};

export default Main;
