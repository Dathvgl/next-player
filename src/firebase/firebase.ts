import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  DataSnapshot,
  get,
  getDatabase,
  onValue,
  ref,
  set,
  update,
} from "firebase/database";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(config);

export const auth = getAuth(app);
const database = getDatabase(app);

export const onceRealtime = (path: string) => {
  const record = ref(database, path);
  return get(record);
};

export const listenRealtime = (
  path: string,
  callback: (snapshot: DataSnapshot) => void
) => {
  const record = ref(database, path);
  return onValue(record, callback);
};

export const writeRealTime = async (path: string, value: any) => {
  const record = ref(database, path);
  await set(record, value);
};

export const updateRealTime = async (path: string, value: any) => {
  const record = ref(database, path);
  await update(record, value);
};
