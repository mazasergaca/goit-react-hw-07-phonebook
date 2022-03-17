import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Section from './Section';
import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  formSubmitHandler = data => {
    let containName = false;
    this.state.contacts.forEach(item => {
      if (item.name === data.name) {
        containName = true;
      }
    });
    if (containName) {
      return alert(`${data.name} is already in contacts.`);
    }
    this.addContact(data);
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  visibleContacts = () => {
    const normalizedFilter = this.state.filter.toLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  addContact = ({ name, number }) => {
    const newContact = { name, number, id: nanoid() };
    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    return (
      <>
        <Section title={'Phonebook'}>
          <ContactForm onSubmit={this.formSubmitHandler} />
        </Section>
        <Section title={'Contacts'}>
          <Filter value={this.state.filter} onChange={this.changeFilter} />
          <ContactList
            visibleContacts={this.visibleContacts()}
            deleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
