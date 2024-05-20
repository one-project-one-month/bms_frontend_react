import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

type Counter = {
  count: number;
};

// login user initial state
const initialUserState: Counter = {
  count: 0,
};

// user slice
export const counterSlice = createSlice({
  name: 'counter',
  initialState: initialUserState,
  reducers: {
    // increase count
    increaseCount: (state) => {
      state.count += 1;
    },
    // decrease count
    decreaseCount: (state) => {
      state.count -= 1;
    },
    // reset count
    resetCount: (state) => {
      state.count = 0;
    },
  },
});

// group of action creators
export const { increaseCount, decreaseCount, resetCount } =
  counterSlice.actions;

// user selectors
export const selectCounter = (state: RootState) => state.counter;
