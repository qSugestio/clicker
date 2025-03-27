import { getApp, getApps, initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// заменить firebaseConfig на свой
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
}

let app
if (!getApps().length) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApp()
}
export const database = getDatabase(app)
