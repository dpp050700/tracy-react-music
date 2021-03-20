import React from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
import './styles/reset.css';
import './styles/iconfont.css';

function App() {
  return <HashRouter>{renderRoutes(routes)}</HashRouter>;
}

export default App;
