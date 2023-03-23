import { getDatabase, ref, onValue } from 'firebase/database';

import firebase from 'firebase/compat/app';
import { firebaseConfig } from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

firebase.initializeApp(firebaseConfig);

//const db = getDatabase();
const auth = getAuth();
const userId = function (auth) {
  if (auth) {
    console.log(auth);
    if (auth.currentUser) {
      console.log('dkkd');
    } else {
      return 'dsfd';
    }
  } else {
    console.log('I am sorry');
  }
};

var usd = '';

const webapp = auth;
console.log(userId(auth));
console.log(userId(auth));

export { webapp };
