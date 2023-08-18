import { Auth } from "firebase/auth";
import { axios } from "../../axios";

const QUERY_KEY = "user";

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

export function createNewUserWithGoogle(auth: Auth) {
  return axios.post(`${QUERY_KEY}/register`, {
    email: auth.currentUser?.email,
    uid: auth.currentUser?.uid,
    bearerToken: sessionStorage.getItem("accessToken"),
    displayName: auth.currentUser?.displayName,
    photoUrl: auth.currentUser?.photoURL,
    emailVerified: auth.currentUser?.emailVerified,
    createdAt: auth.currentUser?.metadata.creationTime,
  });
}

/* export function registerUserToken(uid: string) {
  const accessToken = sessionStorage.getItem("accessToken");

  return axios.post(
    `http://localhost:3000/api/user/register-user-token/${uid}`,
    {
      bearedToken: accessToken,
    }
  );
} */
