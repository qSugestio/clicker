import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { config } from './config'

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  databaseURL: config.databaseURL,
}

const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
