import react, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import './nav.css';

const Profile = function (props) {

  const [email, setEmail] = useState();
  const [pp, setPp] = useState();
  const [name, setName] = useState();

  const logout = () => {
    auth.signOut().then(() => {

    })
    localStorage.clear();
  }

  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        //setUsername(user.displayName)
        //setPp(user.photoURL)
        //setEmail(user.email);
        setEmail(user.email)
        setPp(user.photoURL);
        setName(user.displayName)
        console.log(user)
      } else {
        navigate('/login')

      }
    });
  }, [user]);



  return (
    <div className="profile">
      <Navbar />
      <div className="profile_card">
        <div>
          <img className="" src={pp} />
          <h2>Hello {name}</h2>
          <h2>Email: {email}</h2>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;