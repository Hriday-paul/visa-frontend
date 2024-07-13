import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './css/satoshi.css';
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import Rout from './routs/Rout.tsx';
import Store from './Redux/Store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={Rout} />
    </Provider>
  </React.StrictMode>
)
