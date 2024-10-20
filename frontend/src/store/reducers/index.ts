import { combineReducers } from '@reduxjs/toolkit';
import messageReducer from './message-slice';
import authReducer from './auth-slice';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/lib/persistReducer';

/**
 * Combine all reducers into a single reducer
 * blacklist message reducer from persisting in local storage
 */
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['message']
};

const rootReducer = combineReducers({
  message: messageReducer,
  auth: authReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default persistReducer(persistConfig, rootReducer);
// export default rootReducer;
