import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyB0UpeWhVI1NQfxSODl2aNG38xsgOpG8Os",
    authDomain: "user-list-840fc.firebaseapp.com",
    databaseURL: "https://user-list-840fc-default-rtdb.firebaseio.com",
    projectId: "user-list-840fc",
    storageBucket: "user-list-840fc.firebasestorage.app",
    messagingSenderId: "426211581386",
    appId: "1:426211581386:web:687697e3cd9600a04ac333",
    measurementId: "G-ZBQR5RR7FP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get, child };
