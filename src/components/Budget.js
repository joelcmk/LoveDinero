import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import '../App.css';
import Navbar from './Navbar';

import { getDatabase, ref, onValue, set, update } from "firebase/database";


function Budget(props) {

  const [home, setHome] = useState('300');
  const [food, setFood] = useState('300');
  const [shopping, setShopping] = useState('300');
  const [utilities, setUtilities] = useState('300');
  const [household, setHousehold] = useState('300');
  const [transportation, setTransportation] = useState('300');
  const [other, setOther] = useState('300');

  const [homeEdit, setHomeEdit] = useState(true);
  const [foodEdit, setFoodEdit] = useState(true);
  const [shoppingEdit, setShoppingEdit] = useState(true);
  const [utilitiesEdit, setUtilitiesEdit] = useState(true);
  const [householdEdit, setHouseholdEdit] = useState(true);
  const [transportationEdit, setTransportationEdit] = useState(true);
  const [otherEdit, setOtherEdit] = useState(true);

  const [userId, setUserId] = useState();


  const firebaseConfig = {
    apiKey: "AIzaSyDv15hsf9FfUwHJsGbOhTncNKSq0kBBCcA",
    authDomain: "budget-36a35.firebaseapp.com",
    projectId: "budget-36a35",
    storageBucket: "budget-36a35.appspot.com",
    messagingSenderId: "669361891874",
    appId: "1:669361891874:web:fb21613f657a5890b1387b"
  };

  const [data, setData] = useState('')

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const navigate = useNavigate();
  const auth = getAuth();

  const user = auth.currentUser;
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //setUsername(user.displayName)
        //setPp(user.photoURL)
        //setEmail(user.email);
        setData(user.photoURL)
        props.parentCallback(user.photoURL)
        console.log(user.photoURL)
        setUserId(uid)
      } else {
        navigate('/login')

      }
    });
  }, [user]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId + '/target');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data)
      }
      setData(data)
    });
  }, [userId]);

  function submitHome() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      home: home
    });
    setHomeEdit(true);
  }

  function submitFood() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      food: food
    });
    setFoodEdit(true);
  }

  function submitShopping() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      shopping: shopping
    });
    setShoppingEdit(true);
  }

  function submitUtilities() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      utilities: utilities
    });
    setUtilitiesEdit(true);
  }

  function submitHousehold() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      household: household
    });
    setHouseholdEdit(true);
  }

  function submitTransportation() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      transportation: transportation
    });
    setTransportationEdit(true);
  }

  function submitOther() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      other: other
    });
    setOtherEdit(true);
  }

  if (user) {
    return (
      <div>
        <Navbar />
        <Input setExpense={props.setExpense} setSubmit={props.setSubmit} income={props.income} expense={props.expense} />

        <div className="budget">
          <div className="test">
            <table className="expenses">
              <tr>
                <th>Category</th>
                <th>Expenses</th>
                <th>Target</th>
              </tr>
              <tr>
                <td>Home</td>
                <td><span>$</span>{props.categoryTotal('home')}</td>
                <td>{
                  homeEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.home : ''}</p>
                      <button onClick={() => setHomeEdit(false)} type="submit">edit</button>
                    </div>
                    : <div>
                      <input type="number" onChange={(e) => setHome(e.target.value)} />
                      <button onClick={() => submitHome()}>Submit</button>
                    </div>
                }</td>
              </tr>
              <tr>
                <td>Food</td>
                <td><span>$</span>{props.categoryTotal('food')}</td>
                <td className="test2">{
                  foodEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.food : ''}</p>
                      <button onClick={() => setFoodEdit(false)} type="submit">edit</button>
                    </div>
                    : <form>
                      <input type="number" onChange={(e) => setFood(e.target.value)} />
                      <button onClick={() => submitFood()}>Submit</button>
                    </form>
                }</td>
              </tr>
              <tr>
                <td>Shopping</td>
                <td><span>$</span>{props.categoryTotal('shopping')}</td>
                <td>{
                  shoppingEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.shopping : ''}</p>
                      <button onClick={() => setShoppingEdit(false)} type="submit">edit</button>
                    </div>
                    : <form>
                      <input type="number" onChange={(e) => setShopping(e.target.value)} />
                      <button onClick={() => submitShopping()}>Submit</button>
                    </form>
                }</td>
              </tr>
              <tr>
                <td>Utilities</td>
                <td><span>$</span>{props.categoryTotal('utilities')}</td>
                <td>{
                  utilitiesEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.utilities : ''}</p>
                      <button onClick={() => setUtilitiesEdit(false)} type="submit">edit</button>
                    </div>
                    : <form>
                      <input type="number" onChange={(e) => setUtilities(e.target.value)} />
                      <button onClick={() => submitUtilities()}>Submit</button>
                    </form>
                }</td>
              </tr>
              <tr>
                <td>Household</td>
                <td><span>$</span>{props.categoryTotal('household')}</td>
                <td>{
                  householdEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.household : ''}</p>
                      <button onClick={() => setHouseholdEdit(false)} type="submit">edit</button>
                    </div>
                    : <form>
                      <input type="number" onChange={(e) => setHousehold(e.target.value)} />
                      <button onClick={() => submitHousehold()}>Submit</button>
                    </form>
                }</td>
              </tr>
              <tr>
                <td>Transportation</td>
                <td><span>$</span>{props.categoryTotal('transportation')}</td>
                <td>{
                  transportationEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.transportation : ''}</p>
                      <button onClick={() => setTransportationEdit(false)} type="submit">edit</button>
                    </div>
                    : <form>
                      <input type="number" onChange={(e) => setTransportation(e.target.value)} />
                      <button onClick={() => submitTransportation()}>Submit</button>
                    </form>
                }</td>
              </tr>
              <tr>
                <td>Other</td>
                <td><span>$</span>{props.categoryTotal('other')}</td>
                <td>{
                  otherEdit ?
                    <div className="edit">
                      <p className="test1"><span>$</span>{data ? data.other : ''}</p>
                      <button onClick={() => setOtherEdit(false)} type="submit">edit</button>
                    </div>
                    : <form>
                      <input type="number" onChange={(e) => setOther(e.target.value)} />
                      <button onClick={() => submitOther()}>Submit</button>
                    </form>
                }</td>
              </tr>
            </table>
          </div>
        </div>
        <Link className="expenses_list" to="/expenses"><button>Expenses List</button></Link>
      </div >
    );
  } else {
    return (
      <p>loading</p>
    )
  }


}

export default Budget;