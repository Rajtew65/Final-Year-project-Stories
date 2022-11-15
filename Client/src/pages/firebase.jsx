import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPzcAeURrwnbPni9kqVBRoVl2PJmPkqmw",
  authDomain: "social-clone-e38b4.firebaseapp.com",
  projectId: "social-clone-e38b4",
  storageBucket: "social-clone-e38b4.appspot.com",
  messagingSenderId: "424614768298",
  appId: "1:424614768298:web:62b0bedcf27459ce822ad3",
  measurementId: "G-9QFTD0L5FJ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
