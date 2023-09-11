import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList';
import Filter from '../Filter';
import { MainTitle, Contacts } from './App.styled';

const getInitialContacts = () => {
  const contacts = localStorage.getItem('contacts');
  if (contacts) {
    return JSON.parse(contacts);
  }
  return [];
};

export const App = () => {
  const [contacts, setContacts] = useState(getInitialContacts);
  const [filters, setFilters] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = ({ name, number }) => {
    const isExist = contacts.find(contact => contact.name === name);

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = evt => {
    setFilters(evt.currentTarget.value);
  };

  const visibleContacts = contacts.filter(contact => {
    const normalizedFilter = filters.toLowerCase();
    return contact.name.toLowerCase().includes(normalizedFilter);
  });

  return (
    <div>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm onSubmit={addNewContact} />

      <Contacts>Contacts</Contacts>
      <Filter value={filters} onChange={changeFilter} />
      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};
