import React from 'react';
import { Provider } from 'react-redux';
import { renderRoutes, RouteConfig } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import routes from './routes/index';
import store from './store/index';
import './styles/reset.css';
import './styles/common.css';
import './styles/fonts/iconfont.css';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>{renderRoutes(routes as RouteConfig[])}</HashRouter>
    </Provider>
  );
}

export default App;
