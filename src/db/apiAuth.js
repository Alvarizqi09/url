import { auth, storage, db } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Save user data to Firestore if new user
    const userRef = doc(db, "users", result.user.uid);
    await setDoc(
      userRef,
      {
        name: result.user.displayName,
        email: result.user.email,
        profile_pic: result.user.photoURL,
        created_at: new Date().toISOString(),
      },
      { merge: true }
    );

    return result.user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
}

export async function signup({ name, email, password, profile_pic }) {
  try {
    // Create user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Upload profile picture
    const fileName = `profile_pic/${user.uid}-${Date.now()}`;
    const storageRef = ref(storage, fileName);
    await uploadBytes(storageRef, profile_pic);
    const photoURL = await getDownloadURL(storageRef);

    // Update user profile
    await updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });

    // Save user data to Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      name,
      email,
      profile_pic: photoURL,
      created_at: new Date().toISOString(),
    });

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error(error.message);
  }
}
