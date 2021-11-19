import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Budget from './components/Budget';
import data from './data.json';
import './App.css';

const App = function () {

  const [item, setItem] = useState('');
  const [items, setItems] = useState('')
  const [submit, setSubmit] = useState('');
  const [test, setTest] = useState('')
  const [test2, setTest2] = useState('');

  const options = [
    { value: 'home', label: 'Home' },
    { value: 'food', label: 'Food' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'utillities', label: 'Utillities' },
    { value: 'household', label: 'Household' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' }
  ]

  const handleChange = (e) => {
    setItem(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit('next')
  }

  const test1 = (e) => {
    setTest(e.value)
  };

  const hello = (e) => {
    e.preventDefault()
    setTest2({ expense: item, category: test })
    setSubmit('')
  }

  console.log(data[0].expense)

  if (submit === '') {
    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <label>Add New Expense</label>
          <input name="expense" id="expense" value={item} onChange={handleChange} />
          <button type="submit">Next</button>
        </form>
        <Budget newExpense={test2} />
        {data.map(item => (
          <li>
            {item.category} | {item.expense}
          </li>
        ))}
      </div>
    );
  }

  if (submit === 'next') {
    return (
      <div>
        <form onSubmit={hello} className="App">
          <CreatableSelect
            options={options}
            isClearable
            onChange={test1}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
};

export default App;
