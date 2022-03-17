import PropTypes from 'prop-types';
import React from 'react';
import s from './ContactList.module.css';

const ContactList = ({ visibleContacts, deleteContact }) => {
  const message = 'No contacts';
  return visibleContacts.length > 0 ? (
    <ul className={s.list}>
      {visibleContacts.map(({ name, number, id }) => (
        <li className={s.item} key={id}>
          <span className={s.contact}>
            {name}: {number}
          </span>
          <button className={s.button} onClick={() => deleteContact(id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  ) : (
    <span className={s.message}>{message}&#128531;</span>
  );
};

ContactList.propTypes = {
  visibleContacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default ContactList;
