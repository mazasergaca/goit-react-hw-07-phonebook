import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import actions from './contacts-actions';

const items = createReducer([], builder => {
  builder
    .addCase(actions.addContact, (state, { payload }) => [...state, payload])
    .addCase(actions.deleteContact, (state, { payload }) =>
      state.filter(({ id }) => id !== payload)
    );
});

const filter = createReducer('', builder => {
  builder.addCase(actions.changeFilter, (_, { payload }) => payload);
});

export default combineReducers({
  items,
  filter,
});
