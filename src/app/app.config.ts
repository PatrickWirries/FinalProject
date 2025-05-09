import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';


import { initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getAuth, provideAuth} from '@angular/fire/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwnSna2KL2b6VUDtrls4weRM6nn6rp1UQ",
  authDomain: "csci-313-final---inventory.firebaseapp.com",
  projectId: "csci-313-final---inventory",
  storageBucket: "csci-313-final---inventory.firebasestorage.app",
  messagingSenderId: "95794925273",
  appId: "1:95794925273:web:4e51d8d580e00c9183f8c8",
  measurementId: "G-SMEJSMTK76"
};

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes, withComponentInputBinding()),
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth())
  ]
};
