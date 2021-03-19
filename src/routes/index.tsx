import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../views/Home/Home';
import Singer from '../views/Singer/Singer';
import Recommend from '../views/Recommend/Recommend';
import Hot from '../views/Hot/Hot';

export default [
  {
    path: '/',
    component: Home,
    routes: [
      {
        path: '/',
        exact: true,
        render: () => <Redirect to="/recommend" />,
      },
      {
        path: '/singer',
        component: Singer,
      },
      {
        path: '/hot',
        component: Hot,
      },
      {
        path: '/recommend',
        component: Recommend,
      },
    ],
  },
];
