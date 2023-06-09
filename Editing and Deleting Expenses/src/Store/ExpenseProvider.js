import React, { useReducer } from "react";
import ExpenseContext from "./ExpenseContext";


let initialState = {
  items: [],
};



const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      console.log(action.value);
      return {
        ...state,
        items: [...state.items, action.value],
      };

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter((val) => val.id !== action.value),
      };

    case 'UPDATE':
      const updateExpense = state.items.findIndex((val) => val.id === action.value.id)
      state.items[updateExpense]=action.value
      return {
        ...state,
        items: state.items
    };

    case 'SET_ITEMS':
      return {
        ...state,
        items: action.value,
      };

    case 'EMPTY_CART':
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};


const ExpenseProvider = (props) => {

  const [cartState, dispatchExpenses] = useReducer(reducer, initialState);

  let userEmail = localStorage.getItem('email');
  if (userEmail) {
    userEmail = userEmail.replace(/[^a-zA-Z]/g, "");
  }

  const api="https://expense-tracker-dbef8-default-rtdb.firebaseio.com/"

    const fetchData = async () => {
      
      console.log("fetch data");

      if (userEmail) {
        const url = `${api}/expenses${userEmail}.json`;

        try {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Failed to fetch cart data');
          }
          const data = await response.json();
          console.log(data)
          if (data){
          const expensesList = Object.keys(data).map((expenseId) => {
            const expense = data[expenseId];
            return {
              id: expenseId,
              category: expense.category,
              description: expense.description,
              moneySpent: expense.moneySpent,
            };
          });
          dispatchExpenses({ type: 'SET_ITEMS', value: expensesList });
        }
      
        } catch (error) {
          console.error(error);
          
        }
      }
    };


  const emptyCart =()=>{
    dispatchExpenses({ type: 'EMPTY_CART', value: [] });
  }
    
      
  const addIExpenseHandler = (item) => {

     if (userEmail) {
      const url = `${api}/expenses${userEmail}.json`;
        fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
          })
        .then((response) => {
          if (response.ok) {
            alert(`Expense Added ${response.statusText}`)
            return response.json()
            
          } else {
            console.error('Error adding/updating item');
          }
        }).then((data)=>{
          console.log(data)
          dispatchExpenses({ type: 'ADD', value: {...item,id:data.name} });
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    
  };
  

  const removeExpenseHandler = (expenseid) => {

    if (userEmail){
    fetch(`${api}/expenses${userEmail}/${expenseid}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok){
          console.log ("Expense deleted") 
          dispatchExpenses({ type: 'REMOVE', value: expenseid });
        }
        else {
          console.error("error while deleting item")
        }     
      })
      .catch(error => {
        console.error(error);
      });
    }
  };

  const updateExpenseHandler = (expense) => {

    if (userEmail){
    fetch(`${api}/expenses${userEmail}/${expense.id}.json`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(expense)
    })
      .then(response => {
        if (response.ok){
          console.log ("Expense updated") 
          dispatchExpenses({ type: 'UPDATE', value: expense });
        }
        else {
          console.error("error while deleting item")
        }     
      })
      .catch(error => {
        console.error(error);
      });
    }
  };


  const cartContext = {
    expenses: cartState.items,
    fetchExpense:fetchData, 
    addExpense: addIExpenseHandler,
    removeExpense: removeExpenseHandler,
    updateExpense: updateExpenseHandler,
    emptyCart:emptyCart
  };

  return (                   
    <ExpenseContext.Provider value={cartContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
