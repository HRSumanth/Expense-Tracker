import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth-store'


const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;