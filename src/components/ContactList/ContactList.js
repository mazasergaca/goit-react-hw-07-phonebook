import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVisibleContacts } from 'redux/contacts/contacts-selectors';
import { deleteContact } from 'redux/contacts/contacts-slice';
import s from './ContactList.module.css';

export default function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  return contacts.length > 0 ? (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => (
        <li className={s.item} key={id}>
          <span className={s.contact}>
            {name}: {number}
          </span>
          <button
            className={s.button}
            onClick={() => dispatch(deleteContact(id))}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <span className={s.message}>No contacts&#128531;</span>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape),
  deleteContact: PropTypes.func,
};
