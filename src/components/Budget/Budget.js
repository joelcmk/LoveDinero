import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Chart from '../Chart/Chart';
import NewExpense from '../NewExpense/NewExpense';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import './Budget.css';

import { getDatabase, ref, onValue, update } from 'firebase/database';

function Budget(props) {
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

  const [target, setTarget] = useState('');
  const [home, setHome] = useState('0');
  const [food, setFood] = useState('0');
  const [shopping, setShopping] = useState('0');
  const [utilities, setUtilities] = useState('0');
  const [household, setHousehold] = useState('0');
  const [transportation, setTransportation] = useState('0');
  const [other, setOther] = useState('0');

  const [updateTarget, setUpdateTarget] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();

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

  function allCategoriesTarget() {
    setUpdateTarget(!updateTarget);
    const db = getDatabase();
    if (updateTarget) {
      update(ref(db, 'users/' + userId + '/target'), {
        home: home,
        food: food,
        shopping: shopping,
        utilities: utilities,
        household: household,
        transportation: transportation,
        other: other,
      });
    }
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
      categoryName: 'Food',
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
      updateTarget: setUtilities,
    },
    {
      categoryName: 'Household',
      category: household,
      expenses: props.categoryTotal('household'),
      target: target.household,
      updateTarget: setHousehold,
    },
    {
      categoryName: 'Transportation',
      category: transportation,
      expenses: props.categoryTotal('transportation'),
      target: target.transportation,
      updateTarget: setTransportation,
    },
    {
      categoryName: 'Other',
      category: other,
      expenses: props.categoryTotal('other'),
      target: target.other,
      updateTarget: setOther,
    },
  ];

  console.log(userId);

  if (target) {
    return (
      <>
        <div className="budget">
          <Chart />
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
                            value={
                              item.category
                                ? item.category
                                : item.updateTarget('0')
                            }
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
          <NewExpense
            setExpense={props.setExpense}
            setSubmit={props.setSubmit}
            income={props.income}
            expense={props.expense}
            userId={userId}
            length={props.length}
          />
        </div>
      </>
    );
  } else {
    return <p>loading</p>;
  }
}

export default Budget;
