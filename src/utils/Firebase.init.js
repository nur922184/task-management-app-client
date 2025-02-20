// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDOdxh5z5TRxfgF1SsR8mmJsqemMlKngJg",
  authDomain: "task-management-applicat-a011a.firebaseapp.com",
  projectId: "task-management-applicat-a011a",
  storageBucket: "task-management-applicat-a011a.firebasestorage.app",
  messagingSenderId: "401913700592",
  appId: "1:401913700592:web:761e404ec87b74ca8e2235"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;