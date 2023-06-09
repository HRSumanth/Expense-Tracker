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
        items: state.items.filter((val) => val.id !== action.value.id),
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

  const [cartState, dispatchItems] = useReducer(reducer, initialState);

  let userEmail
  const api="https://expense-tracker-dbef8-default-rtdb.firebaseio.com/"

    const fetchData = async () => {
      userEmail = localStorage.getItem('email');
      if (userEmail) {
        userEmail = userEmail.replace(/[^a-zA-Z]/g, "");
      }
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
          const expensesList = Object.keys(data).map((expenseId) => {
            const expense = data[expenseId];
            return {
              id: expenseId,
              category: expense.category,
              description: expense.description,
              moneySpent: expense.moneySpent,
            };
          });
          console.log(expensesList)
          dispatchItems({ type: 'SET_ITEMS', value: expensesList });
        } catch (error) {
          console.error(error);
          
        }
      }
    };


  const emptyCart =()=>{
    dispatchItems({ type: 'EMPTY_CART', value: [] });
  }
    
      
  const addItemsHandler = (item) => {

    userEmail = localStorage.getItem('email')
    if (userEmail){
      userEmail=userEmail.replace(/[^a-zA-Z]/g, "");
     }

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
          dispatchItems({ type: 'ADD', value: {...item,id:data.name} });
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    
  };
  

  // const removeItemsHandler = (item) => {
  //   dispatchItems({ type: 'REMOVE', value: item });
  //   const itemDelete = cartState.items.find((val) => val.id === item.id);
     
  //   console.log(itemDelete)

  //   userEmail = localStorage.getItem('email')
  //   if (userEmail){
  //     userEmail=userEmail.replace(/[^a-zA-Z]/g, "");
  //    }
  //    console.log(userEmail)

  //   if (userEmail){
  //   fetch(`${api}/cart${userEmail}/${itemDelete._id}`, {
  //     method: 'DELETE',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(response => {
  //       if (response.ok)
  //          console.log ("item deleted") 
  //       else {
  //         console.error("error while deleting item")
  //       }     
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  //   }
  // };

 

  const cartContext = {
    expenses: cartState.items,
    fetchExpense:fetchData, 
    addExpense: addItemsHandler,
    //removeExpense: removeItemsHandler,
  };

  return (                   
    <ExpenseContext.Provider value={cartContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider;
