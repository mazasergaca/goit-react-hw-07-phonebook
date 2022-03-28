import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import contactsAction from '../redux/contacts/contacts-actions';
import s from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={s.label}>
      Find contacts by name
      <input
        className={s.input}
        type="text"
        value={value}
        onChange={onChange}
      ></input>
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    value: state.contacts.filter,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChange: e => {
      dispatch(contactsAction.changeFilter(e.currentTarget.value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
