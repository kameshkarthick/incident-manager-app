import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import 'dotenv/config';

const firebaseConfig = {
  apiKey: process.env.TEST_FIREBASE_API_KEY,
  authDomain: process.env.TEST_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function getTokenFromCredentials(email: string, password: string): Promise<string> {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const token = await userCredential.user.getIdToken();
  return token;
}