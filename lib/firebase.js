// lib/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD23mbQZiVa4Q542tn-nL1_KCtMoxwo9OE",
  authDomain: "movieverse-7d7da.firebaseapp.com",
  projectId: "movieverse-7d7da",
  storageBucket: "movieverse-7d7da.firebasestorage.app",
  messagingSenderId: "21111992752",
  appId: "1:21111992752:web:9aaf134c9ff103a61e2675"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
