
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UsernamesState {
  senderUsername: string;
  recipientUsername: string;
}

const initialState: UsernamesState = {
  senderUsername: '',
  recipientUsername: '',
};

export const usernamesSlice = createSlice({
  name: 'usernames',
  initialState,
  reducers: {
    setSenderUsername(state, action: PayloadAction<string>) {
      state.senderUsername = action.payload;
    },
    setRecipientUsername(state, action: PayloadAction<string>) {
      state.recipientUsername = action.payload;
    },
  },
});

export const { setSenderUsername, setRecipientUsername } = usernamesSlice.actions;

export const selectUsernames = (state: RootState) => state.usernames;
