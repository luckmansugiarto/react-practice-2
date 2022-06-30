import { initializeApp } from "firebase/app";
import {
	createUserWithEmailAndPassword,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	signInWithRedirect,
} from 'firebase/auth';
import {
	doc,
	getDoc,
	getFirestore,
	setDoc,
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

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

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