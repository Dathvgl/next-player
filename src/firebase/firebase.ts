import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  DataSnapshot,
  QueryConstraint,
  get,
  getDatabase,
  onValue,
  push,
  query as queryDatabase,
  ref,
  set,
  update,
} from "firebase/database";
import {
  DocumentData,
  DocumentSnapshot,
  FieldPath,
  QueryCompositeFilterConstraint,
  QueryFieldFilterConstraint,
  QuerySnapshot,
  SetOptions,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query as queryStore,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

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

const store = getFirestore(app);

export const addStore = async (name: string, value: any) => {
  await addDoc(collection(store, name), value);
};

export const getStore = (name: string, child: string) => {
  return getDoc(doc(store, name, child));
};

export const listStore = (name: string) => {
  return getDocs(collection(store, name));
};

export const listQueryStore = (
  name: string,
  queryConstraint?: QueryFieldFilterConstraint
) => {
  const query = queryConstraint
    ? queryStore(collection(store, name), queryConstraint)
    : queryStore(collection(store, name));

  return getDocs(query);
};

export const setStore = async (
  name: string,
  child: string,
  value: any,
  options?: SetOptions
) => {
  if (!options) await setDoc(doc(store, name, child), value);
  else await setDoc(doc(store, name, child), value, options);
};

export const updateStore = async (name: string, child: string, value: any) => {
  await updateDoc(doc(store, name, child), value);
};

export const deleteStore = async (name: string, child: string) => {
  await deleteDoc(doc(store, name, child));
};

export const listenStore = (
  name: string,
  child: string,
  callback: (doc: DocumentSnapshot<DocumentData, DocumentData>) => void
) => {
  return onSnapshot(doc(store, name, child), callback);
};

export const listenListStore = (
  name: string,
  callback: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void,
  queryConstraint?: QueryFieldFilterConstraint
) => {
  const query = queryConstraint
    ? queryStore(collection(store, name), queryConstraint)
    : queryStore(collection(store, name));

  return onSnapshot(query, callback);
};

const database = getDatabase(app);

const configRef = (path: string, queryConstraint?: QueryConstraint[]) => {
  if (!queryConstraint) return ref(database, path);
  if (queryConstraint.length == 0) return ref(database, path);
  return queryDatabase(ref(database, path), ...queryConstraint);
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
