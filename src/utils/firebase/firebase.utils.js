import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	signOut,
} from 'firebase/auth';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	getFirestore,
	query,
	setDoc,
	writeBatch,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyArBZlxBkF80J_epGXZhArZGowoElxAFoc",
  authDomain: "crwn-clothing-app-68ce2.firebaseapp.com",
  projectId: "crwn-clothing-app-68ce2",
  storageBucket: "crwn-clothing-app-68ce2.appspot.com",
  messagingSenderId: "570654646835",
  appId: "1:570654646835:web:742e15ac59bb25670c7946"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account"
});

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey);
	const batch = writeBatch(db);

	objectsToAdd.forEach(objectToAdd => {
		const docRef = doc(collectionRef, objectToAdd.title.toLowerCase());
		batch.set(docRef, objectToAdd);
	});

	await batch.commit();
	console.log('done');
}

export const auth = getAuth();

export const db = getFirestore();

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);
	const userSnapshot = await getDoc(userDocRef);

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (e) {
			console.log(e.message);
		}
	}

	return userDocRef;
};

export const getCategoriesAndDocuments = async() => {
	const collectionRef = collection(db, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	const categoryMap = querySnapshot.docs.reduce(
		(acc, docSnapshot) => {
			const { title, items } = docSnapshot.data();
			acc[title.toLowerCase()] = items;
			return acc;
		}, {});

	return categoryMap;
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await signInWithEmailAndPassword(auth, email, password);
};
export const signInWithGooglePopup = async () => signInWithPopup(auth, provider);

export const signOutAuthUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);