import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css'
import 'firebase/compat/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const Login = function () {


  const firebaseConfig = {
    apiKey: "AIzaSyDv15hsf9FfUwHJsGbOhTncNKSq0kBBCcA",
    authDomain: "budget-36a35.firebaseapp.com",
    projectId: "budget-36a35",
    storageBucket: "budget-36a35.appspot.com",
    messagingSenderId: "669361891874",
    appId: "1:669361891874:web:fb21613f657a5890b1387b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };

  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}


export default Login;