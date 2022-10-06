import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import './Budget.css';
import Navbar from '../Navbar';

import {
  getDatabase,
  ref,
  onValue,
  update,
  set,
  child,
} from 'firebase/database';

function Budget(props) {
  const [homeEdit, setHomeEdit] = useState(true);
  const [foodEdit, setFoodEdit] = useState(true);
  const [shoppingEdit, setShoppingEdit] = useState(true);
  const [utilitiesEdit, setUtilitiesEdit] = useState(true);
  const [householdEdit, setHouseholdEdit] = useState(true);
  const [transportationEdit, setTransportationEdit] = useState(true);
  const [otherEdit, setOtherEdit] = useState(true);

  const [userId, setUserId] = useState();

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId + '/target');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data == null) {
        setTarget({ home: 0 });
      } else {
        setTarget(data);
        setHome(data.home);
        setFood(data.food);
        setShopping(data.shopping);
        setUtilities(data.utilities);
        setHousehold(data.household);
        setTransportation(data.transportation);
        setOther(data.other);
      }
    });
  }, [userId]);

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId + '/target');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data);
      }
      //setTarget(data)
    });
  }, []);
  const [target, setTarget] = useState('');

  const [home, setHome] = useState('0');
  const [food, setFood] = useState('0');
  const [shopping, setShopping] = useState('0');
  const [utilities, setUtilities] = useState('0');
  const [household, setHousehold] = useState('0');
  const [transportation, setTransportation] = useState('0');
  const [other, setOther] = useState('0');

  const [data, setData] = useState('');

  const [updateTarget, setUpdateTarget] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  const navigate = useNavigate();

  console.log(transportation);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
      } else {
        navigate('/login');
      }
    });
  });

  function submitHome() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      home: home,
    });
    setUpdateTarget(!updateTarget);
  }

  function allCategoriesTarget() {
    setUpdateTarget(!updateTarget);
    const db = getDatabase();
    if (updateTarget) {
      update(ref(db, 'users/' + userId + '/target'), {
        home: home,
      });
    }
  }

  function submitFood() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      food: food,
    });
    setFoodEdit(true);
  }

  function submitShopping() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      shopping: shopping,
    });
    setShoppingEdit(true);
  }

  function submitUtilities() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      utilities: utilities,
    });
    setUtilitiesEdit(true);
  }

  function submitHousehold() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      household: household,
    });
    setHouseholdEdit(true);
  }

  function submitTransportation() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      transportation: transportation,
    });
    setTransportationEdit(true);
  }

  function submitOther() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/target'), {
      other: other,
    });
    setOtherEdit(true);
  }

  const allData = [
    {
      categoryName: 'Home',
      category: home,
      expenses: props.categoryTotal('home'),
      target: home,
      updateTarget: setHome,
    },
    {
      categoryName: 'food',
      category: food,
      expenses: props.categoryTotal('food'),
      target: target.food,
      updateTarget: setFood,
    },
    {
      categoryName: 'Shopping',
      category: shopping,
      expenses: props.categoryTotal('shopping'),
      target: target.shopping,
      updateTarget: setShopping,
    },
    {
      categoryName: 'Utilities',
      category: utilities,
      expenses: props.categoryTotal('utilities'),
      target: target.utilities,
    },
    {
      categoryName: 'Household',
      category: household,
      expenses: props.categoryTotal('household'),
      target: target.household,
    },
    {
      categoryName: 'Transportation',
      category: transportation,
      expenses: props.categoryTotal('transportation'),
      target: target.transportation,
    },
    {
      categoryName: 'Other',
      category: other,
      expenses: props.categoryTotal('other'),
      target: target.other,
      updateTarget: setOther,
    },
  ];

  if (target) {
    return (
      <div>
        <Navbar />
        <Input
          setExpense={props.setExpense}
          setSubmit={props.setSubmit}
          income={props.income}
          expense={props.expense}
        />

        <div className="budget">
          <div className="test">
            <table className="expenses">
              <tr>
                <th>Category</th>
                <th>Expenses</th>
                <th>Target</th>
              </tr>
              {allData.map((item) => (
                <>
                  <tr>
                    <td>{item.categoryName}</td>
                    <td>
                      <span>$</span>
                      {item.expenses}
                    </td>
                    <td>
                      {!updateTarget ? (
                        <div className="edit">
                          <p className="test1">
                            <span>$</span>
                            {item.target == undefined ? '0' : item.target}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="number"
                            onChange={(e) => item.updateTarget(e.target.value)}
                            value={item.category ? item.category : '0'}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                </>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td>
                  <button
                    className="update_button"
                    onClick={() => allCategoriesTarget()}
                  >
                    {!updateTarget ? 'update' : 'done'}
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <Link className="expenses_list" to="/expenses">
          <button>Expenses List</button>
        </Link>
      </div>
    );
  } else {
    return <p>loading</p>;
  }
}

export default Budget;
