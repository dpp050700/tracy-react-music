import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../views/Home/Home';
import Singer from '../views/Singer/Singer';
import Recommend from '../views/Recommend/Recommend';
import Rank from '../views/Rank/Rank';

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
        path: '/rank',
        component: Rank,
      },
      {
        path: '/recommend',
        component: Recommend,
      },
    ],
  },
];
