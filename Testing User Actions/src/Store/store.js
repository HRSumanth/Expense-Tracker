import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import expenseReducer from './ExpenseReducer';
import authReducer from './AuthContext';
import ActivatePremium from './ActivatePremium';
import { expenseSaga } from './ExpenseSage';

function* rootSaga() {
  yield all([
    expenseSaga(),
    
  ]);
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    expense: expenseReducer,
    auth: authReducer,
    activatePremium:ActivatePremium
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
