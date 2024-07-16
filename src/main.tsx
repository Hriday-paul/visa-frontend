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
import 'flatpickr/dist/flatpickr.min.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <Provider store={Store}>
      <RouterProvider router={Rout} />
    </Provider>
  </React.StrictMode>
)
