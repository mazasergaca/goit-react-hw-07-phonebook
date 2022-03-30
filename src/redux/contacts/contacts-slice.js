import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeFilter(state, action) {
      return action.payload;
    },
  },
});

export const { changeFilter } = contactsSlice.actions;

export default contactsSlice.reducer;
