import React, { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDVqc-vVJK8vQWxfw5OdRHzR0wWBfxHKZQ",
  authDomain: "garbage-collection-app.firebaseapp.com",
  projectId: "garbage-collection-app",
  storageBucket: "garbage-collection-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:12345678901234567890ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

interface FirebaseContextType {
  app: ReturnType<typeof initializeApp>;
  db: ReturnType<typeof getFirestore>;
  storage: ReturnType<typeof getStorage>;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

interface FirebaseProviderProps {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<FirebaseProviderProps> = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};