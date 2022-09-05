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
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const Login = function () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongEmail, setWrongEmail] = useState(false);

  const auth = getAuth();

  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

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
        setWrongEmail(true);
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

  const googleLogin = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        navigate('/');
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

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

  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;

  return (
    <div className="Login">
      <div className="login-image"></div>
      <div className="login-auth">
        <h1>
          <span>Love</span>
          <span>Dinero</span>
        </h1>

        <div className="email-login">
          <p>Welcome back,</p>
          <h2>Login to your account</h2>
          <div className="wrong-email">
            {wrongEmail ? (
              <span>Please re-enter you email and password.</span>
            ) : (
              ''
            )}
          </div>

          <form onSubmit={test}>
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
            <button>Submit</button>
          </form>
        </div>
        <a onClick={googleLogin} className="google">
          Or sign-in with google
        </a>
        <a href="#" className="demo">
          Or try a demo
        </a>
        <p>
          Don't have an account? <a href="signup">Join free today</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
