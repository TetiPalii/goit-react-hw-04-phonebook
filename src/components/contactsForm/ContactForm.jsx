import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';
import { useState } from 'react';

export const ContactForm = ({ handleSubmit }) => {
  const [inputName, setName] = useState('');
  const [number, setNumber] = useState('');

  const onFormSubmit = e => {
    e.preventDefault();
    const { name, number } = e.currentTarget.elements;

    const contactItem = {
      id: nanoid(),
      name: name.value,
      number: number.value,
    };

    reset();
    handleSubmit(contactItem);
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        console.log(name, value);
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={onFormSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я\s]+$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={inputName}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?[0-9\s\-\(\)]+"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </label>
      <button type="submit">Add contact</button>
    </form>
  );
};

// export class ContactForm extends Component {
//   state = {
//     name: '',
//     number: '',
//   };

//   onFormSubmit = e => {
//     e.preventDefault();
//     const { name, number } = e.currentTarget.elements;

//     const contactItem = {
//       id: nanoid(),
//       name: name.value,
//       number: number.value,
//     };

//     this.reset();
//     this.props.handleSubmit(contactItem);
//   };

//   handleChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({ [name]: value });
//   };

//   reset = () => {
//     this.setState({ id: '', name: '', number: '' });
//   };

//   render() {
//     return (
//       <form onSubmit={this.onFormSubmit} className={css.form}>
//         <label className={css.label}>
//           Name
//           <input
//             onChange={this.handleChange}
//             type="text"
//             name="name"
//             pattern="^[a-zA-Zа-яА-Я\s]+$"
//             title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
//             required
//             value={this.state.name}
//           />
//         </label>
//         <label className={css.label}>
//           Number
//           <input
//             onChange={this.handleChange}
//             type="tel"
//             name="number"
//             pattern="\+?[0-9\s\-\(\)]+"
//             title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
//             required
//             value={this.state.number}
//           />
//         </label>
//         <button type="submit">Add contact</button>
//       </form>
//     );
//   }
// }

ContactForm.propTypes = {
  handleSubmit: PropTypes.func,
};
