import React from 'react';
import MicroAppLoader from '../components/MicroAppLoader';

const routes = [
    {
        path: '/app/micro1',
        component: ()=><MicroAppLoader entry={__MICRO_APP__.micro1} />,
    },
];

export default routes;
