import { useDeleteContactMutation } from 'redux/contacts/contacts-api';
import PropTypes from 'prop-types';
import { Oval } from 'react-loader-spinner';
import s from './ContactItem.module.css';

export default function ContactItem({ name, phone, id }) {
  const [deleteContact, result] = useDeleteContactMutation();
  return (
    <li className={s.item}>
      <span className={s.contact}>
        {name}: {phone}
      </span>
      <button
        className={s.button}
        disabled={result.isLoading}
        onClick={() => deleteContact(id)}
      >
        {result.isLoading ? (
          <Oval
            color="rgb(255, 152, 152)"
            secondaryColor="#ccc"
            width="20"
            height="20"
          />
        ) : (
          'Delete'
        )}
      </button>
    </li>
  );
}

ContactItem.propTypes = {
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
