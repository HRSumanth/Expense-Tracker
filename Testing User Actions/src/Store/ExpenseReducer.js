// reducers/expenseReducer.js
import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: {
    items: [],
  },
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
    removeExpense: (state, action) => {
      state.items = state.items.filter((expense) => expense.id !== action.payload);
    },
    updateExpense: (state, action) => {
      const index = state.items.findIndex((expense) => expense.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setItems: (state, action) => {
      if (action.payload){
        state.items = action.payload 
      }
      
    },
    emptyCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addExpense,
  removeExpense,
  updateExpense,
  setItems,
  emptyCart,
} = expenseSlice.actions;

export default expenseSlice.reducer;
