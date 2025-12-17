// ===== FIREBASE BACKEND BRIDGE =====

// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAnalytics } from "firebase/analytics";

// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyDVF2KOQdf5rCtZSfA0W9cT4NVf8CcV6K0",
  authDomain: "alphabet-wall-e907e.firebaseapp.com",
  databaseURL: "https://alphabet-wall-e907e-default-rtdb.firebaseio.com",
  projectId: "alphabet-wall-e907e",
  storageBucket: "alphabet-wall-e907e.firebasestorage.app",
  messagingSenderId: "286958139470",
  appId: "1:286958139470:web:c110e230366f6e93ecab1f",
  measurementId: "G-K05XFB026L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// ===== SEQUENCE CONTROL =====
let sequence = 0;         // tracks letters sent
let lastSeenSequence = 0; // tracks letters received

// ===== SEND LETTER FUNCTION =====
// Upside Down teammate calls this to send a letter
export function sendLetter(letter) {
  sequence++;
  set(ref(db, "shared"), {
    letter: letter,
    sequence: sequence,
    time: Date.now()
  });
}

// ===== LISTEN FOR LETTERS FUNCTION =====
// Real World teammate calls this to receive letters
export function listenForLetters(callback) {
  onValue(ref(db, "shared"), (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    // Ensure each letter is received only once and in order
    if (data.sequence > lastSeenSequence) {
      lastSeenSequence = data.sequence;
      callback(data.letter);
    }
  });
}
