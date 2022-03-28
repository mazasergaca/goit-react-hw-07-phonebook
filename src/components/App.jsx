import Section from './Section';
import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

export function App() {
  return (
    <>
      <Section title={'Phonebook'}>
        <ContactForm />
      </Section>
      <Section title={'Contacts'}>
        <Filter />
        <ContactList />
      </Section>
    </>
  );
}
