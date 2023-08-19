import { Auth } from "firebase/auth";
import { axios } from "../../axios";

const QUERY_KEY = "user";

// Función para crear un nuevo usuario
export function createNewUser(auth: Auth, bearerToken: string) {
  return axios.post(`${QUERY_KEY}/register`, {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearerToken: bearerToken,
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
    emailVerified: auth.currentUser?.emailVerified,
    createdAt: auth.currentUser?.metadata.creationTime,
  });
}

// Función para crear un nuevo usuario con Google
export function createNewUserWithGoogle(auth: Auth, bearerToken: string) {

  return axios.post(`${QUERY_KEY}/register`, {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearerToken: bearerToken,
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
    emailVerified: auth.currentUser?.emailVerified,
    createdAt: auth.currentUser?.metadata.creationTime,
  });
}


