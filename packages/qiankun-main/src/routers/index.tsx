import React from 'react';
import { Redirect } from 'react-router-dom';
import Login from '@/pages/user/Login';
import ResultPage from '@/components/ResultPage';
import Main from '@/pages/main';

const routes = [
    {
        path: '/',
        exact: true,
        component: () => <Redirect to="/app" />,
    },
    {
        path: '/app',
        component: Main,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/404',
        component: () => <ResultPage status={404} />,
    },
    {
        path: '*',
        component: () => <Redirect to="/404" />,
    },
];

export default routes;
