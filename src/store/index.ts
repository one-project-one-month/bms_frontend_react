import { configureStore } from '@reduxjs/toolkit';
import { counterSlice, userSlice,usernamesSlice } from './slices';
// create a store with no reducers
export const store = configureStore({
  reducer: {
    // reducer list
    [userSlice.name]: userSlice.reducer,
    [counterSlice.name]: counterSlice.reducer,
    [usernamesSlice.name] : usernamesSlice.reducer
  },
});

// create a type for RootState to use in useSelector
export type RootState = ReturnType<typeof store.getState>;

// create a type of Application Dispatcher
export type AppDispatch = typeof store.dispatch;

// export all the slices from slice/index.ts
export * from './slices';
