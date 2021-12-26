import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Budget from './components/Budget';
import ExpensesList from './components/ExpensesList';
import Login from './components/Login';
import firebase from 'firebase/compat/app';
import Profile from './components/Profile';
import { getAuth } from "firebase/auth";
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import { getDatabase, ref, onValue, set } from "firebase/database";
import { onAuthStateChanged, signOut } from "firebase/auth";

var firebaseui = require('firebaseui');


const App = function () {

  const firebaseConfig = {
    apiKey: "AIzaSyDv15hsf9FfUwHJsGbOhTncNKSq0kBBCcA",
    authDomain: "budget-36a35.firebaseapp.com",
    projectId: "budget-36a35",
    storageBucket: "budget-36a35.appspot.com",
    messagingSenderId: "669361891874",
    appId: "1:669361891874:web:fb21613f657a5890b1387b"
  };
  firebase.initializeApp(firebaseConfig);

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

  /*
    const [data, setData] = useState([
      { expense: 13, category: 'home' },
      { expense: 56, category: 'home' },
      { expense: 87, category: 'shopping' }
    ]);
    */

  const auth = getAuth();
  const user = auth.currentUser;


  const [pp, setPp] = useState();

  const [data, setData] = useState();
  const [test2, setTest2] = useState();
  const [userId, setUserId] = useState();
  const [length, setLength] = useState();

  const handleCategory = (e) => {
    setCategory(e.value)
  };

  const submitCategory = (e) => {
    e.preventDefault()
    setData([
      ...data,
      { expense: parseInt(expense), category: category }
    ]);
    setSubmit('');
  }

  useEffect(() => {
    if (user) {
      setUserId(user.uid)
    }
  }, [user]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data[id])
      }
      setData(list)
      setLength(list.length - 1 + 1)
    });
  }, [userId]);

  console.log(data)

  // Expenses Total
  const array = data ? data.map(item => (
    item.expense
  )) : '';
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }

  // Categories total
  function filter(category) {

    let filteredCategory = data ? data.filter(item => item.category === category) : '';
    const result = filteredCategory ? filteredCategory.map(item => (
      item.expense
    )) : '';

    return result
  }

  function categoryTotal(category) {
    let total = 0;

    for (let i = 0; i < filter(category).length; i++) {
      total += filter(category)[i];
    };

    return total;
  }

  const handleCallback = (childData) => {
    setPp(childData)
  }


  const [test, setTest] = useState();




  useEffect(() => {
    if (user) {
      setTest(user.email)
    }
  }, [user]);

  if (submit === '') {
    return (
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={
              <Budget total={total}
                setExpense={setExpense} setSubmit={setSubmit} expense={expense}
                categoryTotal={categoryTotal} parentCallback={handleCallback}
                pp={pp}
              />
            } />
            <Route exact path="/expenses" element={
              <ExpensesList data={data} />
            } />
            <Route exact path="/login" element={
              <Login />
            } />
            <Route exact path="/profile" element={
              <Profile pp={pp} />
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
