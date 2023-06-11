import React, { useState , useContext, useEffect} from 'react';

import './ExpenseTracker.css'
import ExpenseList from './ExpenseList';
import { useDispatch, useSelector } from 'react-redux';


const ExpenseTracker = () => {
  const dispatch=useDispatch()
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editExpense, setEditExpense] = useState(false);
  const [editExpenseId, setEditExpenseId] = useState(false);


  const expenseContext = useSelector(state=>state.expense)
  console.log(expenseContext)
  useEffect(()=>{
    dispatch({type:'FETCH_DATA'})
  },[]) 
  

  const onEditExpense=(expense)=>{
       setEditExpense(true)
       setMoneySpent(expense.moneySpent);
       setDescription(expense.description);
       setCategory(expense.category);
       setEditExpenseId(expense.id)

  }

  const editExpensesHandler = (e)=>{
    console.log("ok")
    e.preventDefault();

    const editExpense = {
      moneySpent,
      description,
      category,
    };
     
    editExpense.id=editExpenseId;
    dispatch({type:'UPDATE_EXPENSE', payload:editExpense})
    setMoneySpent('');
    setDescription('');
    setCategory('');
  }

  const handleExpenseSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      moneySpent,
      description,
      category,
    };
    dispatch({type:'ADD_EXPENSE', payload:newExpense})

    setMoneySpent('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="expense-tracker">
          <h2 className="header">Expense Tracker</h2>
          <form className="expense-form" >
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
            <button className="form-button" type="button" onClick={editExpense ? editExpensesHandler : handleExpenseSubmit}>
              Add Expense
            </button>
          </form>

          <ExpenseList expenses={expenseContext.items} onEditExpense={onEditExpense}></ExpenseList>
    </div>
  );
};

export default ExpenseTracker;
