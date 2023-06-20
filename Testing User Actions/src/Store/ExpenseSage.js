// sagas/expenseSaga.js
import { call, put, takeLatest,takeEvery } from 'redux-saga/effects';
import { setItems, addExpense, removeExpense, updateExpense } from './ExpenseReducer';
import axios from 'axios'

const api = 'https://expense-tracker-dbef8-default-rtdb.firebaseio.com/';

function* fetchData() {
    const userEmail = localStorage.getItem('email')?.replace(/[^a-zA-Z]/g, '');
    console.log("calll", userEmail);
    if (userEmail) {
      const url = `${api}/expenses${userEmail}.json`;
  
      try {
        const response = yield call(axios.get, url);
        console.log(response);
        if (response.status !== 200) {
          throw new Error('Failed to fetch cart data');
        }
        const data = response.data;
        console.log(data);
        if (data) {
          const expensesList = Object.keys(data).map((expenseId) => {
            const expense = data[expenseId];
            return {
              id: expenseId,
              category: expense.category,
              description: expense.description,
              moneySpent: expense.moneySpent,
            };
          });
          console.log(expensesList);
          yield put(setItems(expensesList));
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

function* addExpenseHandler(action) {
  const userEmail = localStorage.getItem('email')?.replace(/[^a-zA-Z]/g, '');

  if (userEmail) {
    const url = `${api}/expenses${userEmail}.json`;
    try {
      const response = yield call(fetch, url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });

      if (response.ok) {
        const data = yield call([response, 'json']);
        yield put(addExpense({ ...action.payload, id: data.name }));
      } else {
        console.error('Error adding/updating item');
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function* removeExpenseHandler(action) {
  const userEmail = localStorage.getItem('email')?.replace(/[^a-zA-Z]/g, '');

  if (userEmail) {
    const url = `${api}/expenses${userEmail}/${action.payload}.json`;
    try {
      const response = yield call(fetch, url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        yield put(removeExpense(action.payload));
        console.log('Expense deleted');
      } else {
        console.error('Error deleting item');
      }
    } catch (error) {
      console.error(error);
    }
  }
}

function* updateExpenseHandler(action) {
  const userEmail = localStorage.getItem('email')?.replace(/[^a-zA-Z]/g, '');

  if (userEmail) {
    const url = `${api}/expenses${userEmail}/${action.payload.id}.json`;
    try {
      const response = yield call(fetch, url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(action.payload),
      });

      if (response.ok) {
        yield put(updateExpense(action.payload));
        console.log('Expense updated');
      } else {
        console.error('Error updating item');
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export function* expenseSaga() {
    yield takeEvery('FETCH_DATA', fetchData);
    yield takeLatest('REMOVE_EXPENSE', removeExpenseHandler);
    yield takeLatest('UPDATE_EXPENSE', updateExpenseHandler);
    yield takeEvery('ADD_EXPENSE', addExpenseHandler);
  }