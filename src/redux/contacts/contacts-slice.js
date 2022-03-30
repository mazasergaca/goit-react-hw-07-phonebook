import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = { items: [], filter: '' };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact(state, action) {
      state.items.push({
        id: nanoid(),
        name: action.payload.name,
        number: action.payload.number,
      });
    },
    deleteContact(state, action) {
      state.items = state.items.filter(({ id }) => id !== action.payload);
    },
    changeFilter(state, action) {
      state.filter = action.payload;
    },
  },
});


export const { addContact, deleteContact, changeFilter } =
  contactsSlice.actions;

export default contactsSlice.reducer;
