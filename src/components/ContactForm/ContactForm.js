import { useState } from 'react';
import {
  useCreateContactMutation,
  useGetContactsQuery,
} from 'redux/contacts/contacts-api';
import { Oval } from 'react-loader-spinner';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [createContact, result] = useCreateContactMutation();

  function handleFormSubmit(e) {
    e.preventDefault();

    let containName = false;
    contacts.forEach(item => {
      if (item.name === name) {
        containName = true;
      }
    });
    if (containName) {
      return alert(`${name} is already in contacts.`);
    }
    createContact({ name, phone });
    reset();
  }

  function reset() {
    setName('');
    setPhone('');
  }

  function handleChange(e) {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setPhone(value);
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
        Phone
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button className={s.button} disabled={result.isLoading} type="submit">
        {result.isLoading ? (
          <Oval
            color="rgb(152, 255, 152)"
            secondaryColor="#ccc"
            width="20"
            height="20"
          />
        ) : (
          'Add contact'
        )}
      </button>
    </form>
  );
}
