import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import store from './reduxx/redux-store';
import { Provider } from 'react-redux';





let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <HashRouter>
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    </HashRouter>,
    document.getElementById('root')
  );

}

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);
