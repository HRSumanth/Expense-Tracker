import { useDispatch } from 'react-redux';
import { setActivatePremium, offActivatePremium } from '../../Store/ActivatePremium';
import './ExpenseList.css';

import React from 'react';

const ExpenseList = ({ expenses, onEditExpense, isDarkTheme }) => {
  const dispatch = useDispatch();

  const handleDeleteExpense = (expenseId) => {
    dispatch({ type: 'REMOVE_EXPENSE', payload: expenseId });
    dispatch(offActivatePremium())
  };

  const handleEditExpense = (expense) => {
    onEditExpense(expense);
  };

  const activatePremiumHandler = () => {

    dispatch(setActivatePremium());
  };

  return (
    <div className={`expense-list ${isDarkTheme ? 'dark' : 'light'}`}>
      <h3 className={`expenses-header ${isDarkTheme ? 'dark' : 'light'}`}>Expenses:</h3>
      {expenses.length === 0 ? (
        <p className={`no-expenses ${isDarkTheme ? 'dark' : 'light'}`}>No expenses added yet.</p>
      ) : (
        <ul className={`expenses-list ${isDarkTheme ? 'dark' : 'light'}`}>
          {expenses.map((expense, index) => (
            <li key={index} className={`expense-item ${isDarkTheme ? 'dark' : 'light'}`}>
              <div>
                Money Spent: {expense.moneySpent} <br />
                Description: {expense.description} <br />
                Category: {expense.category}
              </div>
              <div>
                <div className={`btn ${isDarkTheme ? 'dark' : 'light'}`}>
                  <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                  <button onClick={() => handleEditExpense(expense)}>Edit</button>
                </div>
                {parseInt(expense.moneySpent) > 10000 && (
                  <button
                    onClick={activatePremiumHandler}
                    className={`activate-premium-btn ${isDarkTheme ? 'dark' : 'light'}`}
                  >
                    Activate Premium
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
