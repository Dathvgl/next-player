import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  DataSnapshot,
  QueryConstraint,
  get,
  getDatabase,
  onValue,
  push,
  query,
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

const configRef = (path: string, queryConstraint?: QueryConstraint[]) => {
  if (!queryConstraint) return ref(database, path);
  if (queryConstraint.length == 0) return ref(database, path);
  return query(ref(database, path), ...queryConstraint);
};

export const onceRealtime = (
  path: string,
  queryConstraint?: QueryConstraint[]
) => {
  const record = configRef(path, queryConstraint);
  return get(record);
};

export const listenRealtime = (
  path: string,
  callback: (snapshot: DataSnapshot) => void,
  queryConstraint?: QueryConstraint[]
) => {
  const record = configRef(path, queryConstraint);
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

export const pushRealTime = async (path: string, value: any) => {
  const record = ref(database, path);
  return await push(record, value);
};
