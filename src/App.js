import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Budget from './components/Budget';
import './App.css';

const App = function () {

  const [expense, setExpense] = useState('')
  const [submit, setSubmit] = useState('');
  const [category, setCategory] = useState('')

  const options = [
    { value: 'home', label: 'Home' },
    { value: 'food', label: 'Food' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'utillities', label: 'Utillities' },
    { value: 'household', label: 'Household' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' }
  ]

  const [data, setData] = useState([
    { expense: 13, category: 'home' },
    { expense: 56, category: 'home' },
    { expense: 87, category: 'shopping' }
  ]);


  const handleChange = (e) => {
    setExpense(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit('next');
  };

  const handleCategory = (e) => {
    setCategory(e.value)
  };

  const submitCategory = (e) => {
    e.preventDefault()
    setData([
      ...data,
      { expense: parseInt(expense), category: category }
    ]);
    setSubmit('')
  }

  // Total
  const array = data.map(item => (
    item.expense
  ));
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  if (submit === '') {
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>Add New Expense</label>
          <input name="expense" id="expense" value={expense} onChange={handleChange} />
          <button type="submit">Next</button>
        </form>
        <form >
          <label>Add an income</label>
          <input name="income" id="income" />
          <button type="submit">Next</button>
        </form>
        <Budget />
        {data.map(item => (
          <li>
            {item.category} | {item.expense}
          </li>
        ))}
        <div className="total">
          <h3>Total:</h3>
          {sum}
        </div>
      </div>
    );
  }

  if (submit === 'next') {
    return (
      <div>
        <form onSubmit={submitCategory} className="App">
          <CreatableSelect
            options={options}
            isClearable
            onChange={handleCategory}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

export default App;
