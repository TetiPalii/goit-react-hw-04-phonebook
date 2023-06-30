import Notiflix from 'notiflix';
import { ContactForm } from '../contactsForm/ContactForm';
import { SearchContact } from '../searchContact/SearchContact';
import { ContactList } from '../contactList/ContactList';
import { Notification } from '../notification/Notification';
import { Section } from '../section/Section';
import { useEffect, useState } from 'react';
import css from './App.module.css';

export const App = () => {
  const storage = () =>
    JSON.parse(window.localStorage.getItem('storageContacts'));

  const [contacts, setContacts] = useState(storage() ?? []);
  const [filter, setFilter] = useState('');

  const handleSubmit = contactItem => {
    console.log(contactItem);
    const { name } = contactItem;
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      Notiflix.Report.warning('Warning', `${name} is already in contacts.`);
    } else {
      setContacts(prevState => [contactItem, ...prevState]);
    }
  };

  const deleteContact = idToDelete => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== idToDelete)
    );
  };

  const onChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilterContact = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    window.localStorage.setItem('storageContacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContacts = getFilterContact();
  return (
    <div className={css.container}>
      <Section title={'Phonebook'}>
        <ContactForm handleSubmit={handleSubmit} />
      </Section>
      <Section title={'Contacts'}>
        <SearchContact onChangeFilter={onChangeFilter} />
        {contacts.length ? (
          <ContactList
            visibleContacts={visibleContacts}
            onDeleteBtn={deleteContact}
          />
        ) : (
          <Notification message={'the phonebook is empty!'} />
        )}
      </Section>
    </div>
  );
};

// };

// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidUpdate(_, prevState) {
//     console.log('ComponentDidupdate');
//     // console.log(prevProps);
//     // console.log(prevState);
//     if (prevState.contacts !== this.state.contacts) {
//       // console.log('ghjk');
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }

//   componentDidMount() {
//     const parsedContatcs = JSON.parse(localStorage.getItem('contacts'));

//     if (parsedContatcs) {
//       this.setState({ contacts: parsedContatcs });
//     }
//   }

//   handleSubmit = contactItem => {
//     const { name } = contactItem;
//     if (
//       this.state.contacts.some(
//         contact => contact.name.toLowerCase() === name.toLowerCase()
//       )
//     ) {
//       Notiflix.Report.warning('Warning', `${name} is already in contacts.`);
//     } else {
//       this.setState(({ contacts }) => ({
//         contacts: [contactItem, ...contacts],
//       }));
//     }
//   };

//   getVisibleContacts = idToDelete => {
//     this.setState(({ contacts }) => ({
//       contacts: contacts.filter(({ id }) => id !== idToDelete),
//     }));
//   };

//   onChangeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getFilterContact = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   render() {
//     const filteredContacts = this.getFilterContact();
//     // console.log(filteredContacts);
//     return (
//       <div className={css.container}>
//         <Section title={'Phonebook'}>
//           <ContactForm handleSubmit={this.handleSubmit} />
//         </Section>
//         <Section title={'Contacts'}>
//           <SearchContact onChangeFilter={this.onChangeFilter} />
//           {this.state.contacts.length ? (
//             <ContactList
//               VisibleContacts={filteredContacts}
//               onDeleteBtn={this.getVisibleContacts}
//             />
//           ) : (
//             <Notification message={'the phonebook is empty!'} />
//           )}
//         </Section>
//       </div>
//     );
//   }
// }
