import { useState } from 'react';
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

  const emailSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setWrongEmail(true);
        return errorCode + errorMessage;
      });
  };

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {})
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorCode + errorMessage;
    });

  const googleLogin = (e) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        return errorCode + errorMessage + email + credential;
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

  const demoLogin = (e) => {
    setEmail('demo@demo.com');
    setPassword(process.env.REACT_APP_DEMO_PASSWORD);
  };

  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;

  return (
    <div className="Login">
      <div className="login-image"></div>
      <div className="login-auth">
        <div className="love-dinero">
          <span>Love</span>
          <span>Dinero</span>
        </div>

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

          <form onSubmit={emailSubmit}>
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
            <button className="login-btn">Submit</button>
            <button onClick={googleLogin} className="google">
              Or sign-in with google
            </button>
            <button onClick={demoLogin} className="demo">
              Or try a demo
            </button>
          </form>
        </div>

        <p>
          Don't have an account? <Link to="/signup">Join free today</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
