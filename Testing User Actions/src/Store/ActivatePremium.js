import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activatePremium :false,
  isDarkTheme: false
};

const ActPreSlice = createSlice({
  name: 'activatePremium',
  initialState,
  reducers: {
    setActivatePremium(state) { 
      state.activatePremium=true;
      state.isDarkTheme=true;
    },

    offActivatePremium(state) { 
      state.activatePremium=false
    },

    setDarkTheme (state){
        state.isDarkTheme = !state.isDarkTheme;
    }
  },
});

export const { setActivatePremium, setDarkTheme, offActivatePremium  } = ActPreSlice.actions;
export default ActPreSlice.reducer;
