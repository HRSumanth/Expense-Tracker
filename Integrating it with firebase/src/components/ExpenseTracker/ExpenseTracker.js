import React, { useState , useContext, useEffect} from 'react';

import './ExpenseTracker.css'
import ExpenseList from './ExpenseList';
import ExpenseContext from '../../Store/ExpenseContext';

const ExpenseTracker = () => {
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  const expenseContext = useContext(ExpenseContext)
  useEffect(()=>{
    expenseContext.fetchExpense()
  },[]) 
  

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      moneySpent,
      description,
      category,
    };
    expenseContext.addExpense(newExpense)
    setExpenses([...expenses, newExpense]);

    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="expense-tracker">
          <h2 className="header">Expense Tracker</h2>
          <form className="expense-form" onSubmit={handleExpenseSubmit}>
            <label className="form-label">
              Money Spent:
              <input
                className="form-input"
                type="text"
                value={moneySpent}
                onChange={(e) => setMoneySpent(e.target.value)}
                required
              />
            </label>
            <br />
            <label className="form-label">
              Description:
              <input
                className="form-input"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>
            <br />
            <label className="form-label">
              Category:
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Petrol">Petrol</option>
                <option value="Salary">Salary</option>
              </select>
            </label>
            <br />
            <button className="form-button" type="submit">
              Add Expense
            </button>
          </form>

          <ExpenseList expenses={expenseContext.expenses}></ExpenseList>
    </div>
  );
};

export default ExpenseTracker;
