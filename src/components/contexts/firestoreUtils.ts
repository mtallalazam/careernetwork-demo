import { collection, getDocs, addDoc } from 'firebase/firestore';
import { setupFirebase, useFirestore } from '~/lib/firebase';

export const fetchUsers = async () => {
  const db: any = await useFirestore();

  const allUsers: unknown[] = [];
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    allUsers.push(doc.data());
  });
  return allUsers;
};

export const addUser = async (user: unknown) => {
  const db: any = await useFirestore();

  try {
    const docRef = await addDoc(collection(db, 'users'), user);
    console.log('Document written with ID: ', docRef.id);
    return docRef;
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
