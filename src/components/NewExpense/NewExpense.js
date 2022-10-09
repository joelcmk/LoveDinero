import React, { useState } from 'react';
import chroma from 'chroma-js';
import './NewExpense.css';
import CreatableSelect from 'react-select/creatable';
import Select, { StylesConfig } from 'react-select';

function NewExpense(props) {
  const [category, setCategory] = useState('');

  const handleChange = (e) => {
    props.setExpense(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setSubmit('next');
  };

  const handleCategory = (e) => {
    setCategory(e.value);
  };

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      padding: 20,
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width,
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
  };

  const options = [
    { value: 'home', label: 'Home', color: '#00B8D9' },
    { value: 'food', label: 'Food', color: '#0052CC' },
    { value: 'shopping', label: 'Shopping', color: '#5243AA' },
    { value: 'utilities', label: 'Utilities', color: '#FF5630' },
    { value: 'household', label: 'Household', color: '#FF8B00' },
    { value: 'transportation', label: 'Transportation', color: '#FFC400' },
    { value: 'other', label: 'Other', color: '#36B37E' },
  ];

  const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: (styles) => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.color);
      console.log(data.color);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.color
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? '#ccc'
          : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.color
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc') }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  };

  return (
    <div className="NewExpense">
      <h2>Add a new expense</h2>
      <span>Select a category</span>
      <CreatableSelect
        className="category-list"
        styles={colourStyles}
        options={options}
      />
      <span>Add amount</span>
      <form className="input" onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="$"
          name="expense"
          id="expense"
          value={props.expense}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewExpense;
