import { useState } from 'react';
import { connect } from 'react-redux';
import contactsActions from 'components/redux/contacts/contacts-actions';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleFormSubmit(event) {
    event.preventDefault();
    let containName = false;
    contacts.forEach(item => {
      if (item.name === name) {
        containName = true;
      }
    });
    if (containName) {
      return alert(`${name} is already in contacts.`);
    }
    onSubmit(name, number);
    reset();
  }

  function reset() {
    setName('');
    setNumber('');
  }

  function handleChange(event) {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  }

  return (
    <form className={s.form} onSubmit={handleFormSubmit}>
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={s.button} type="submit">
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ contacts: { items } }) => {
  return { contacts: items };
};

const mapDispatchToProps = dispatch => ({
  onSubmit: (name, number) =>
    dispatch(contactsActions.addContact(name, number)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
