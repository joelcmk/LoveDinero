import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
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
        const uid = user.uid;
        setEmail(user.email)
        setPp(user.photoURL);
        setName(user.displayName)
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