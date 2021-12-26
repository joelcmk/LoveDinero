import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

function ExpensesList(props) {



  const auth = getAuth();
  const user = auth.currentUser;

  const [d, setD] = useState();
  const [test, setTest] = useState();
  const [userId, setUserId] = useState();
  const [length, setLength] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //setUsername(user.displayName)
        //setPp(user.photoURL)
        //setEmail(user.email);
        setUserId(uid);
      } else {

      }
    });
  }, [user]);


  return (
    <div>
      <h3>Expenses list</h3>
      <Link className="" to="/"><button>Home</button></Link>
      {props.data.map(item => (
        <li>
          {item.category} | {item.expense}
        </li>
      ))}
    </div>
  )
}

export default ExpensesList;