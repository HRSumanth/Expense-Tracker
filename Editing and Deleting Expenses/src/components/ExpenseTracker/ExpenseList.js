import ExpenseContext from '../../Store/ExpenseContext';
import './ExpenseList.css'

import React, { useContext } from 'react';

const ExpenseList = ({ expenses,onEditExpense }) => {
  const expenseContext = useContext(ExpenseContext)

  const handleDeleteExpense = (expenseId) => {
        expenseContext.removeExpense(expenseId)
  };

  const handleEditExpense = (expense) => {
    // Call the onEditExpense function with the expenseId to enable editing
    onEditExpense(expense);
  };

  return (
    <div>
      <h3 className='expenses-header'>Expenses:</h3>
      {expenses.length === 0 ? (
        <p className='no-expenses'>No expenses added yet.</p>
      ) : (
        <ul className='expenses-list'>
          {expenses.map((expense, index) => (
            <li key={index} className='expense-item'>
              <div>
              Money Spent: {expense.moneySpent} <br />
              Description: {expense.description} <br />
              Category: {expense.category}
              </div>
             <div className='btn'>
             <button onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
              <button onClick={() => handleEditExpense(expense)}>Edit</button>
             </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExpenseList;
