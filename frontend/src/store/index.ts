import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { api } from './services/api';
import { persistStore } from 'redux-persist';

export const createStore = (options?: ConfigureStoreOptions['preloadedState'] | undefined) =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      rootReducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
    ...options
  });

const store = createStore();

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default store;
