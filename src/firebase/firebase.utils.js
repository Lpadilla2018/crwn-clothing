import firebase from 'firebase/compat/app';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD2pYhidy70SMa3K9qC8hPoIZ-bOgOyhgg',
  authDomain: 'crwn-db-340116.firebaseapp.com',
  projectId: 'crwn-db-340116',
  storageBucket: 'crwn-db-340116.appspot.com',
  messagingSenderId: '484044345469',
  appId: '1:484044345469:web:63f390961aed76a1ae2114',
  measurementId: 'G-7M965BM9R6',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

// async call to firebase
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      // Set takes in object and properties of what you need to update
      await userRef.set({
        displayName, email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
  // query in firestore document to see if it exists
}

export default firebase;
