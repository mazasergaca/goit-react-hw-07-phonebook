import React from 'react';
import { useGetContactsQuery } from 'redux/contacts/contacts-api';
import { Oval } from 'react-loader-spinner';
import { getFilter } from 'redux/contacts/contacts-selectors';
import { useSelector } from 'react-redux';
import s from './ContactList.module.css';
import ContactItem from 'components/ContactItem';

export default function ContactList() {
  const filter = useSelector(getFilter);
  const { data: contacts, isLoading } = useGetContactsQuery();

  const getVisibleContacts = () => {
    const normalizedFilter = filter?.toLowerCase();
    return contacts?.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter)
    );
  };
  return (
    <>
      {contacts && !isLoading && getVisibleContacts()?.length > 0 && (
        <ul className={s.list}>
          {getVisibleContacts().map(({ name, phone, id }) => (
            <ContactItem key={id} name={name} phone={phone} id={id} />
          ))}
        </ul>
      )}
      {isLoading && <Oval color="#fff" secondaryColor="#ccc" />}
      {getVisibleContacts()?.length === 0 && (
        <span className={s.message}>No contacts&#128531;</span>
      )}
    </>
  );
}
