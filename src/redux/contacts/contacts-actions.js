import { createAction, nanoid } from '@reduxjs/toolkit';

const addContact = createAction('ADD', (name, number) => ({
  payload: {
    id: nanoid(),
    name,
    number,
  },
}));

const deleteContact = createAction('DELETE');

const changeFilter = createAction('FILTER');

const actions = { addContact, deleteContact, changeFilter };

export default actions;
