import React from 'react';
import { Redirect } from 'react-router-dom';
import Content from '../views/Content/Content';
import Home from '../views/Home/Home';
import Singer from '../views/Singer/Singer';
import Recommend from '../views/Recommend/Recommend';
import Rank from '../views/Rank/Rank';
import Login from '../views/Login/Login';
import Search from '../views/Search/Search';
import Album from '../views/Album/Album';

export default [
  {
    path: '/',
    component: Content,
    routes: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '',
        component: Home,
        routes: [
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
            routes: [
              {
                path: '/recommend/:id',
                component: Album,
              },
            ],
          },
          {
            path: '/search',
            component: Search,
          },
          {
            path: '/',
            exact: true,
            render: () => <Redirect to="/recommend" />,
          },
        ],
      },
    ],
  },
];
