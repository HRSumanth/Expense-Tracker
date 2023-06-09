import React  from "react"

const ExpenseContext =React.createContext({
    expenses : [],
    fetchExpense:()=>{},
    addExpense : (expense)=>{},
    removeExpense : (expense)=>{},
    updateExpense: (expense)=>{},
    emptyCart:()=>{}

})

export default ExpenseContext;