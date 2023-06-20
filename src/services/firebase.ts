import firebase from 'firebase/compat/app';
import { config } from './config';

// Initialize Firebase
export const firebaseApp = firebase.initializeApp(config);
