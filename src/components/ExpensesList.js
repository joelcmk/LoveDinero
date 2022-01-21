import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import { getDatabase, ref, set, update } from "firebase/database";
import '../App.css'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function ExpensesList(props) {

  const [userId, setUserId] = useState()

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid)
      } else {
        navigate('/login')

      }
    });
  }, [user]);

  const db = getDatabase();

  function updateTest() {
    const db = getDatabase();
    update(ref(db, 'users/' + userId + '/1'), {
      expense: 50
    })
    console.log(db)
  }

  return (
    <div>
      <Navbar />
      <div className="expenses_list_card">
        <h3>Expenses list</h3>
        <table className="expenses_list_table">
          {props.data.map(item => (
            <tr>
              <td className="expenses_list_category">{item.category}</td>
              <td className="expenses_list_expense">{item.expense}</td>
              <td><button onClick={() => updateTest()} >Update</button><button>Delete</button></td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  )
}

export default ExpensesList;