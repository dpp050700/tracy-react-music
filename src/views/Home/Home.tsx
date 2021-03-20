import React from 'react';
import { renderRoutes } from 'react-router-config';
import Navbar from './components/Navbar/Navbar';
import Tabs from './components/Tabs/Tabs';
import style from './Home.module.scss';

const { wrapper, content } = style;

function Home(props: any) {
  const { route } = props;
  return (
    <div className={wrapper}>
      <Navbar />
      <Tabs />
      <div className={content}>{renderRoutes(route.routes)}</div>
    </div>
  );
}

export default Home;
