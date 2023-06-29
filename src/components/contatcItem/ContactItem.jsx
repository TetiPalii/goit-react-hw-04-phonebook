import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';
export const ContactItem = ({
  id,
  deleteContact,
  name,
  number,
  onDeleteBtn,
}) => {
  const [stateId] = useState(id);

  onDeleteBtn = () => {
    deleteContact(stateId);
  };

  return (
    <li key={stateId} className={css.item__contact}>
      <p>
        {name}: <span>{number}</span>
      </p>
      <button className={css.contact__btn} type="button" onClick={onDeleteBtn}>
        Delete
      </button>
    </li>
  );
};

ContactItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  deleteContact: PropTypes.func,
};
