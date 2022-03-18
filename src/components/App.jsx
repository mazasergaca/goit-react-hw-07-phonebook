import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function formSubmitHandler(name, number) {
    let containName = false;
    contacts.forEach(item => {
      if (item.name === name) {
        containName = true;
      }
    });
    if (containName) {
      return alert(`${name} is already in contacts.`);
    }
    addContact(name, number);
  }

  function changeFilter(event) {
    setFilter(event.currentTarget.value);
  }

  function visibleContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  function addContact(name, number) {
    const newContact = { name, number, id: nanoid() };
    setContacts(prevState => [...prevState, newContact]);
  }

  function deleteContact(contactId) {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  }

  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm onSubmit={formSubmitHandler} />
      </Section>
      <Section title={'Contacts'}>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList
          visibleContacts={visibleContacts()}
          deleteContact={deleteContact}
        />
      </Section>
    </>
  );
}
