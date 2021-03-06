import * as React from 'react'
import * as ReactDOM from 'react-dom';
import Routers from '@/router/index';
import * as serviceWorker from './serviceWorker';
import '@/styles/index.less';
import '@/mock'
ReactDOM.render(
  <Routers login={true} />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
