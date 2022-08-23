import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Store from './store/store';
import CartStore from './store/CartStore';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const store = new Store();
const cartStore = new CartStore();

export const Context = createContext({
  store,
  cartStore
})

root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Context.Provider value={{
        store,
        cartStore
      }}>
        <App />
      </Context.Provider>
    </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
