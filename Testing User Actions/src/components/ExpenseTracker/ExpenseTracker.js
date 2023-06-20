import React, { useState, useEffect, useRef } from 'react';
import { setDarkTheme } from '../../Store/ActivatePremium';
import './ExpenseTracker.css';
import ExpenseList from './ExpenseList';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';


const ExpenseTracker = () => {
  const dispatch = useDispatch();
  const [editExpense, setEditExpense] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(false);
  const expenseContext = useSelector((state) => state.expense);
  const isDarkTheme = useSelector((state) => state.activatePremium.isDarkTheme);
  const isActivePremium = useSelector((state) => state.activatePremium.activatePremium);


  const moneySpentRef = useRef('');
  const descriptionRef = useRef('');
  const categoryRef = useRef('');

  console.log(isActivePremium)

  useEffect(() => {
    dispatch({ type: 'FETCH_DATA' });
  }, []);

  const onEditExpense = (expense) => {
    setEditExpense(true);
    setEditExpenseId(expense.id);
    moneySpentRef.current.value = expense.moneySpent;
    descriptionRef.current.value = expense.description;
    categoryRef.current.value = expense.category;
  };

  const editExpensesHandler = (e) => {
    e.preventDefault();

    const editExpense = {
      moneySpent: moneySpentRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      id: editExpenseId,
    };

    dispatch({ type: 'UPDATE_EXPENSE', payload: editExpense });

    setEditExpense(false);
    setEditExpenseId(false);
    moneySpentRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      moneySpent: moneySpentRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
    };

    dispatch({ type: 'ADD_EXPENSE', payload: newExpense });

    moneySpentRef.current.value = '';
    descriptionRef.current.value = '';
    categoryRef.current.value = '';
  };

  const darkThemeHandler = ()=>{
      dispatch(setDarkTheme())
  }

  const convertToCSV = (expenses) => {
    
    const fields = ['moneySpent', 'description', 'category'];
    const csvData = Papa.unparse(expenses, { fields });
    const csvBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const csvUrl = URL.createObjectURL(csvBlob);
    const link = document.createElement('a');
    link.href = csvUrl;
    link.setAttribute('download', 'expenses.csv');
    link.click();
  };
  

  return (
    <div className={`expense ${isDarkTheme ? 'dark' : ''}`}>
     { isActivePremium &&  <div className="themaBtn">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round" onClick={darkThemeHandler}></span>
          </label>
        </div>}
      <div className={`expense-tracker ${isDarkTheme ? 'dark' : ''}`}>
        <h2 className="header">Expense Tracker</h2>
        <form className="expense-form">
          <label className="form-label">
            Money Spent:
            <input
              className="form-input"
              type="text"
              ref={moneySpentRef}
              required
            />
          </label>
          <br />
          <label className="form-label">
            Description:
            <input
              className="form-input"
              type="text"
              ref={descriptionRef}
              required
            />
          </label>
          <br />
          <label className="form-label">
            Category:
            <select
              className="form-select"
              ref={categoryRef}
              required
            >
              <option value="">Select a category</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </label>
          <br />
          <div className="add-download_btns">
            <button
              className="form-button"
              type="button"
              onClick={editExpense ? editExpensesHandler : handleExpenseSubmit}
            >
              {editExpense ? 'Edit Expense' : 'Add Expense'}
            </button>
            { isActivePremium && <button className="form-button_down" type="button" onClick={()=>{convertToCSV(expenseContext.items)}}>
              Download
            </button>}
          </div>
        </form>
        <ExpenseList expenses={expenseContext.items} onEditExpense={onEditExpense} isDarkTheme={isDarkTheme}/>
      </div>
    </div>
  );
};

export default ExpenseTracker;
