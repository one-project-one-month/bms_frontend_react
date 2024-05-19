import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../lib/types';
import { RootState } from '..';

// login user initial state
const initialUserState: User = {
  id: null,
  fullName: '',
  status: '',
  roles: '',
};

// user slice
export const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    // login user
    loginUser: (state, action) => {
      const { id, fullName, status, roles } = action.payload;
      state.id = id;
      state.fullName = fullName;
      state.status = status;
      state.roles = roles;
    },
    // logout user
    logoutUser: (state) => {
      state.id = null;
      state.fullName = '';
      state.status = '';
      state.roles = '';
    },
  },
});

// group of action creators
export const { loginUser, logoutUser } = userSlice.actions;

// user selectors
export const selectUser = (state: RootState) => state.user;
