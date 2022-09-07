import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Signup.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Signup = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const createAccount = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/');
        const user = user.currentUser;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  console.log(email);

  return (
    <div className="Login">
      <div className="login-image"></div>
      <div className="login-auth">
        <div className="love-dinero">
          <span>Love</span>
          <span>Dinero</span>
        </div>

        <div className="email-login">
          <p>Hey there,</p>
          <h2>Create a free account</h2>

          <form onSubmit={createAccount}>
            <p>Email</p>
            <input
              placeholder="you@email.com"
              value={email}
              type="email"
              onChange={handleEmail}
            />
            <p>Password</p>
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={handlePassword}
            />
            <button>Create</button>
          </form>
        </div>
        <p>
          Already have an account? <a href="login">Log in here</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
