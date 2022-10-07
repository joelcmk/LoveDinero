import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Budget from './components/Budget/Budget';
import ExpensesList from './components/ExpensesList';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import firebase from 'firebase/compat/app';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { getAuth } from 'firebase/auth';
import './App.css';

import { Routes, Route, HashRouter, BrowserRouter } from 'react-router-dom';

import { getDatabase, ref, onValue, set, get, child } from 'firebase/database';

const App = function () {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'budget-d9651.firebaseapp.com',
    databaseURL: 'https://budget-d9651-default-rtdb.firebaseio.com',
    projectId: 'budget-d9651',
    storageBucket: 'budget-d9651.appspot.com',
    messagingSenderId: process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
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
    { value: 'other', label: 'Other' },
  ];

  const auth = getAuth();
  const user = auth.currentUser;

  const [pp, setPp] = useState();

  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  const [length, setLength] = useState();

  const handleCategory = (e) => {
    setCategory(e.value);
  };

  const submitCategory = () => {
    const db = getDatabase();
    var integer = parseInt(expense, 10);
    set(ref(db, 'users/' + userId + `/${length}`), {
      id: length,
      category: category,
      expense: integer,
    });
    setSubmit('');
  };

  useEffect(() => {
    if (user) {
      setUserId(user.uid);
    }
  }, [user]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data[id]);
      }
      setData(list);
      setLength(list.length + 1);
    });
  }, [userId]);

  // Expenses Total
  const array = data ? data.map((item) => item.expense) : '';
  let total = 0;

  for (let i = 0; i < array.length; i++) {
    total += array[i];
  }

  // Categories total
  function filter(category) {
    let filteredCategory = data
      ? data.filter((item) => item.category === category)
      : '';
    const result = filteredCategory
      ? filteredCategory.map((item) => item.expense)
      : '';

    return result;
  }

  function categoryTotal(category) {
    let total = 0;

    for (let i = 0; i < filter(category).length; i++) {
      total += filter(category)[i];
    }

    return total;
  }

  const handleCallback = (childData) => {
    setPp(childData);
  };

  if (submit === '') {
    return (
      <HashRouter>
        <div className="App">
          <Navbar />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Budget
                  total={total}
                  setExpense={setExpense}
                  setSubmit={setSubmit}
                  expense={expense}
                  categoryTotal={categoryTotal}
                  parentCallback={handleCallback}
                  pp={pp}
                  data={data}
                />
              }
            />
            <Route
              exact
              path="/expenses"
              element={<ExpensesList data={data} userId={userId} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile pp={pp} />} />
          </Routes>
        </div>
      </HashRouter>
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
