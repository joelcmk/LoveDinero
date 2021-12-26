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

  const updateStarCount = (data) => {
    console.log(data.joel)
  }

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

  const handleChange = (e) => {
    setTest(e.target.value)
  }

  const handleClick = () => {
    console.log(length)
    const db = getDatabase();
    var integer = parseInt(test, 10);
    set(ref(db, 'users/' + userId + `/${length}`), {
      category: 'home',
      expense: integer,
    });
  }

  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, 'users/' + userId);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      for (let id in data) {
        list.push(data[id])
      }
      setD(list)
      setLength(list.length - 1 + 1)
    });
  }, [userId]);



  return (
    <div>
      <h3>Expenses list</h3>
      <Link className="" to="/"><button>Home</button></Link>
      {props.data.map(item => (
        <li>
          {item.category} | {item.expense}
        </li>
      ))}
      {
        d ? d.map((todo) => <h1>{todo.category} | {todo.expense}</h1>) : ''
      }
      <div>
        <form>
          <input onChange={handleChange} value={test} type="number" />
          <button onClick={handleClick}>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default ExpensesList;