import React from 'react'
import ReactDOM from 'react-dom/client'
import './css/index.css'
import './css/satoshi.css';
import {
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux'
import Rout from './routs/Rout.tsx';
import Store, { Persistor } from './Redux/Store.ts';
import 'flatpickr/dist/flatpickr.min.css';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Toaster
      position="top-center"
      reverseOrder={false}
    />
    <Provider store={Store}>
      <PersistGate loading={<h3 className='text-7xl'>Loading......</h3>} persistor={Persistor}>
        <MantineProvider defaultColorScheme="light">
          <RouterProvider router={Rout} />
        </MantineProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
