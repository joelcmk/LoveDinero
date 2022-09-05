import { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = getAuth();

  const navigate = useNavigate();

  const test = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/');
        const user = user.currentUser;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/budget-calculator',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
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
        <div>
          <p>Welcome back</p>
          <h2>Login to your account</h2>
        </div>
        <div className="email-login">
          <form onSubmit={test}>
            <input
              placeholder="you@email.com"
              value={email}
              type="email"
              onChange={handleEmail}
            />
            <input
              placeholder="password"
              value={password}
              type="password"
              onChange={handlePassword}
            />
            <button>Submit</button>
          </form>
        </div>
        <a href="" className="google">
          Or sign-in with google
        </a>
        <a href="" className="demo">
          Or try a demo
        </a>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      </div>
    </div>
  );
};

export default Login;
