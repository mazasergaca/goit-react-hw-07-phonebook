import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import contactsActions from 'components/redux/contacts/contacts-actions';
import s from './ContactList.module.css';

const ContactList = ({ contacts, deleteContact }) => {
  const message = 'No contacts';
  return contacts.length > 0 ? (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => (
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
  contacts: PropTypes.arrayOf(PropTypes.shape).isRequired,
  deleteContact: PropTypes.func.isRequired,
};

const getVisibleContacts = (allContacts, filter) => {
  const normalizedFilter = filter.toLowerCase();
  return allContacts.filter(({ name }) =>
    name.toLowerCase().includes(normalizedFilter)
  );
};

const mapStateToProps = ({ contacts: { items, filter } }) => {
  return { contacts: getVisibleContacts(items, filter) };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteContact: id => dispatch(contactsActions.deleteContact(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
