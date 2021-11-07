import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyCgWQeJG2qERqB-ppguTDseXYzvFF7Y-Sg',

    authDomain: 'mothercode-ebe53.firebaseapp.com',

    projectId: 'mothercode-ebe53',

    storageBucket: 'mothercode-ebe53.appspot.com',

    messagingSenderId: '519542060375',

    appId: '1:519542060375:web:62ce450816877992703a12',
};

firebase.initializeApp(config);

export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;