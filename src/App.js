import React, { useState, useEffect } from 'react';
import Budget from './components/Budget/Budget';
import ExpensesList from './components/ExpensesList';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import firebase from 'firebase/compat/app';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Footer from './components/Footer/Footer';
import { getAuth } from 'firebase/auth';
import './App.css';

import { Routes, Route, HashRouter } from 'react-router-dom';

import { getDatabase, ref, onValue } from 'firebase/database';

WebSocket.onclose = (event) => {
  console.log(event.code);
};
console.log(typeof window === 'undefined');

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

  const auth = getAuth();
  const user = auth.currentUser;

  const [pp, setPp] = useState();

  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  const [length, setLength] = useState();

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

  console.log(user);

  return (
    <HashRouter>
      <div className="App">
        {user && <Navbar />}
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Budget
                total={total}
                setExpense={setExpense}
                expense={expense}
                categoryTotal={categoryTotal}
                parentCallback={handleCallback}
                pp={pp}
                data={data}
                userId={userId}
                length={length}
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
          <Route path="/profile" element={<Profile pp={pp} total={total} />} />
        </Routes>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
