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
  const [income, setIncome] = useState();
  const [incomeTotal, setIncomeTotal] = useState('')

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



  // Expenses Total
  const array = data.map(item => (
    item.expense
  ));
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }

  // Home Total
  let homeFilter = data.filter(item => item.category === 'home');

  const home = homeFilter.map(item => (
    item.expense
  ));

  let homeTotal = 0;

  for (let i = 0; i < home.length; i++) {
    homeTotal += home[i];
  }

  // Food Total
  let foodFilter = data.filter(item => item.category === 'food');

  const food = foodFilter.map(item => (
    item.expense
  ));

  let foodTotal = 0;

  for (let i = 0; i < food.length; i++) {
    foodTotal += food[i];
  };

  // Shopping Total
  let shoppingFilter = data.filter(item => item.category === 'shopping');

  const shopping = shoppingFilter.map(item => (
    item.expense
  ));

  let shoppingTotal = 0;

  for (let i = 0; i < shopping.length; i++) {
    shoppingTotal += shopping[i];
  };

  // Utilities Total
  let utilitiesFilter = data.filter(item => item.category === 'utilities');

  const utilities = utilitiesFilter.map(item => (
    item.expense
  ));

  let utilitiesTotal = 0;

  for (let i = 0; i < utilities.length; i++) {
    utilitiesTotal += utilities[i];
  };

  // Household Total
  let householdFilter = data.filter(item => item.category === 'household');

  const household = householdFilter.map(item => (
    item.expense
  ));

  let householdTotal = 0;

  for (let i = 0; i < household.length; i++) {
    householdTotal += household[i];
  };

  // Transportation Total
  let transportationFilter = data.filter(item => item.category === 'transportation');

  const transportation = transportationFilter.map(item => (
    item.expense
  ));

  let transportationTotal = 0;

  for (let i = 0; i < transportation.length; i++) {
    transportationTotal += transportation[i];
  };

  if (submit === '') {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={
              <Budget total={total} homeTotal={homeTotal} foodTotal={foodTotal} shoppingTotal={shoppingTotal} utilitiesTotal={utilitiesTotal} householdTotal={householdTotal} transportationTotal={transportationTotal}
                setExpense={setExpense} setSubmit={setSubmit} setIncome={setIncome} setIncomeTotal={setIncomeTotal} income={income} expense={expense}
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
