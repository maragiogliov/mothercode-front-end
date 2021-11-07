import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCgWQeJG2qERqB-ppguTDseXYzvFF7Y-Sg',

  authDomain: 'mothercode-ebe53.firebaseapp.com',

  projectId: 'mothercode-ebe53',

  storageBucket: 'mothercode-ebe53.appspot.com',

  messagingSenderId: '519542060375',

  appId: '1:519542060375:web:62ce450816877992703a12',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
