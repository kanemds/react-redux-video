
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.React_App_API_KEY,
  authDomain:  process.env.React_App_AUTHDOMAIN,
  projectId:  process.env.React_App_PROJECT_ID,
  storageBucket:  process.env.React_App_STORAGE_BUCKET,
  messagingSenderId: process.env.React_App_MESSAGING_SENDER_ID,
  appId:  process.env.React_App_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app