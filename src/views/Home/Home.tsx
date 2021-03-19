import React from 'react';
import { renderRoutes } from 'react-router-config';
import style from './Home.module.scss';

const { wrapper, content, tabBarContainer } = style;

function Home(props: any) {
  const { route } = props;
  return (
    <div className={wrapper}>
      Home111
      <div className={content}>{renderRoutes(route.routes)}</div>
      <div className={tabBarContainer} />
    </div>
  );
}

export default Home;
