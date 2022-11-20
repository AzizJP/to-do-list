import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-rLkjvsjlhmM9jVEQSA-oBczpWKUvxCQ',
  authDomain: 'to-do-list-e0c40.firebaseapp.com',
  projectId: 'to-do-list-e0c40',
  storageBucket: 'to-do-list-e0c40.appspot.com',
  messagingSenderId: '417921230544',
  appId: '1:417921230544:web:8bb498ef9c59b5ee3660d5',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
