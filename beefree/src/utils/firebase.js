import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1lh4yRUEodF2aFq-ftV34HTQ62IcA6jQ",
  authDomain: "beefree-6ba5d.firebaseapp.com",
  projectId: "beefree-6ba5d",
  storageBucket: "beefree-6ba5d.appspot.com",
  messagingSenderId: "929826205216",
  appId: "1:929826205216:web:4b25612952fc8de2ea5645",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
