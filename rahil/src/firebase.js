import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBhCxMCsxJCRfLluc7nWfKLV8Zt6QlFSjQ",
    authDomain: "netflix-clone-38b7e.firebaseapp.com",
    projectId: "netflix-clone-38b7e",
    storageBucket: "netflix-clone-38b7e.appspot.com",
    messagingSenderId: "241930754177",
    appId: "1:241930754177:web:35926ea38ffb51e40ad580"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

