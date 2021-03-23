import React, { useState } from 'react';
import { renderRoutes } from 'react-router-config';
import Navbar from './components/Navbar/Navbar';
import Tabs from './components/Tabs/Tabs';
import style from './Home.module.scss';
import PersonDrawer from '../PersonDrawer/PersonDrawer';

const { wrapper, content } = style;

function Home(props: any) {
  const { route } = props;
  const [drawerStatus, setDrawerStatus] = useState(false);
  return (
    <div className={wrapper}>
      <PersonDrawer show={drawerStatus} />
      <Navbar
        leftClick={() => {
          setDrawerStatus(!drawerStatus);
        }}
      />
      <Tabs />
      <div className={content}>{renderRoutes(route.routes)}</div>
    </div>
  );
}

export default Home;
