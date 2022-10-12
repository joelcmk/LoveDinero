import React, { useState } from 'react';
import chroma from 'chroma-js';
import './NewExpense.css';
import CreatableSelect from 'react-select/creatable';

import { getDatabase, ref, set } from 'firebase/database';

function NewExpense(props) {
  const [category, setCategory] = useState('');
  const [expense, setExpense] = useState('');

  const handleChange = (e) => {
    setExpense(e.target.value);
  };

  const handleCategory = (e) => {
    setCategory(e.value);
  };

  const submitCategory = (e) => {
    e.preventDefault();
    const db = getDatabase();
    var integer = parseInt(expense, 10);
    set(ref(db, 'users/' + props.userId + `/${props.length}`), {
      id: props.length,
      category: category,
      expense: integer,
    });
    setCategory('');
    setExpense('');
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
        onChange={handleCategory}
      />
      <form className="input" onSubmit={submitCategory}>
        <div className="amount">
          <span>Add amount</span>
          <input
            type="number"
            placeholder="$"
            name="expense"
            id="expense"
            value={expense}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewExpense;
