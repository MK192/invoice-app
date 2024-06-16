import { configureStore } from '@reduxjs/toolkit';

import invoiceReducer from './invoiceSlice';

export default configureStore({
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    reducer: {
        invoice: invoiceReducer,
    },
});
