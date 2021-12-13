import React, { useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import Budget from './components/Budget';
import ExpensesList from './components/ExpensesList';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

const App = function () {

  const [expense, setExpense] = useState('');
  const [submit, setSubmit] = useState('');
  const [category, setCategory] = useState('');

  const options = [
    { value: 'home', label: 'Home' },
    { value: 'food', label: 'Food' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'household', label: 'Household' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'other', label: 'Other' }
  ]

  const [data, setData] = useState([
    { expense: 13, category: 'home' },
    { expense: 56, category: 'home' },
    { expense: 87, category: 'shopping' }
  ]);

  const handleCategory = (e) => {
    setCategory(e.value)
    console.log(e.value)
  };

  const submitCategory = (e) => {
    e.preventDefault()
    setData([
      ...data,
      { expense: parseInt(expense), category: category }
    ]);
    setSubmit('');
  }

  // Expenses Total
  const array = data.map(item => (
    item.expense
  ));
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }

  // Categories total
  function filter(category) {

    let filteredCategory = data.filter(item => item.category === category);
    const result = filteredCategory.map(item => (
      item.expense
    ));

    return result
  }

  function categoryTotal(category) {
    let total = 0;

    for (let i = 0; i < filter(category).length; i++) {
      total += filter(category)[i];
    };

    return total;
  }

  if (submit === '') {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={
              <Budget total={total}
                setExpense={setExpense} setSubmit={setSubmit} expense={expense}
                categoryTotal={categoryTotal}
              />
            } />
            <Route exact path="/expenses" element={
              <ExpensesList data={data} />
            } />
          </Routes>
        </div>
      </Router >
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
