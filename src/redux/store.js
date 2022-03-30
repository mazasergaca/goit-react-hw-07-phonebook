import { configureStore } from '@reduxjs/toolkit';
import { contactsApi } from './contacts/contacts-api';
import contactsSlice from './contacts/contacts-slice';

const store = configureStore({
  reducer: {
    [contactsApi.reducerPath]: contactsApi.reducer,
    filter: contactsSlice,
  },
  devTools: process.env.NODE_ENV === 'development',
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

export default store;
