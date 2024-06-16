import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Store

import store from './redux/store';

// CSS
import './index.css';

// Component
import App from './App.tsx';
import { InvoiceSingle } from './components/InvoiceSingle';
import { loader as invoiceLoader } from './components/Main/InvoicesTable';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },

    {
        path: 'invoice/:invoiceId',
        element: <InvoiceSingle />,
        loader: invoiceLoader,
    },
]);

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </QueryClientProvider>,
);
