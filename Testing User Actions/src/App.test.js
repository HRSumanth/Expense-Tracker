import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from 'redux-mock-store'; // Import redux-mock-store

import ExpenseTracker from './components/ExpenseTracker/ExpenseTracker';


const mockStore = configureStore([]);
const store = mockStore({
  expense: {
    items: [],
  },
  activatePremium: {
    isDarkTheme: false,
    activatePremium: true,
  },
});

test('renders Expense Tracker header', () => {
  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );
  const headerElement = screen.getByText(/Expense Tracker/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders add expense form', () => {
  render(
    <Provider store={store}>
      <ExpenseTracker />
    </Provider>
  );
  const moneySpentLabel = screen.getByText('Money Spent:');
  const descriptionLabel = screen.getByText('Description:');
  const categoryLabel = screen.getByText('Category:');
  const addButton = screen.getByText('Add Expense');
  expect(moneySpentLabel).toBeInTheDocument();
  expect(descriptionLabel).toBeInTheDocument();
  expect(categoryLabel).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});
