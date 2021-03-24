import React from 'react';
import { renderRoutes } from 'react-router-config';

const Content: React.FC = (props: any) => {
  const { route } = props;
  return <>{renderRoutes(route.routes)}</>;
};

export default Content;
