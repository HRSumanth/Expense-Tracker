import { useDispatch } from 'react-redux';
import ExpenseContext from '../../Store/ExpenseReducer';
import './ExpenseList.css'

import React, { useContext } from 'react';

const ExpenseList = ({ expenses,onEditExpense }) => {
  const dispatch=useDispatch()
  const expenseContext = useContext(ExpenseContext)
  console.log(expenses)

  const handleDeleteExpense = (expenseId) => {
       dispatch({type:'REMOVE_EXPENSE', payload:expenseId})
  };

  const handleEditExpense = (expense) => {
  
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
