import { Auth } from "firebase/auth";
import { axios } from "../../axios";

const QUERY_KEY = "user";

// Función para crear un nuevo usuario
export function createNewUser(auth: Auth, bearerToken: string) {
  const requestData = {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearerToken: bearerToken,
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
    emailVerified: auth.currentUser?.emailVerified,
    createdAt: auth.currentUser?.metadata.creationTime,
  };

  axios.post(`${QUERY_KEY}/register`, requestData)
    .then(response => {
      console.log(requestData)
      console.log("User registration successful:", response.data);
    })
    .catch(error => {
      console.log(requestData)
      console.error("User registration failed:", error);
    });
}

// Función para crear un nuevo usuario con Google
export function createNewUserWithGoogle(auth: Auth, bearerToken: string) {
  const requestData = {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearerToken: bearerToken,
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
    emailVerified: auth.currentUser?.emailVerified,
    createdAt: auth.currentUser?.metadata.creationTime,
  };

  axios.post(`${QUERY_KEY}/register`, requestData)
    .then(response => {
      console.log("User registration with Google successful:", response.data);
    })
    .catch(error => {
      console.error("User registration with Google failed:", error);
    });
}


