import { auth } from "../firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  sendPasswordResetEmail,
} from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { deleteTokenFromSessionStorage } from "../lib/delete-token-from-session-storage";
import { signInWithPopup } from "firebase/auth";
import {
  createNewUser,
  createNewUserWithGoogle,
} from "../features/user-actions/api/use-register-user";
import { queryClient } from "../lib/query-client-instance";
import { Navigate } from "react-router-dom";
import { registerUserToken } from "../features/user-actions/api/use-send-user-token";

export function useFirebase() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  async function handleAuthAction(
    action: () => Promise<void>,
    successMessage: string
  ) {
    try {
      setIsLoading(true);
      setError("");
      await action();
      setIsLoading(false);
      queryClient.removeQueries();
      setSuccess(successMessage);
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function signUpWithEmailAndPassword(email: string, password: string) {
    await handleAuthAction(async () => {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        const userToken = await auth.currentUser?.getIdToken();

        if (userToken) {
          await registerUserToken(res.user.uid, userToken);
          await createNewUser(auth, userToken);
        }
      }
    }, "Account created successfully!");
  }

  async function loginWithEmailAndPassword(email: string, password: string) {
    await handleAuthAction(async () => {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        const userToken = await auth.currentUser?.getIdToken();
        await registerUserToken(res.user.uid, userToken!);
      }
    }, "Logged In Successfully!");
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      deleteTokenFromSessionStorage();
      queryClient.removeQueries();
      <Navigate to={"/"} />;
      return true;
    } catch {
      setError("Error!");
    }
  }

  async function continueWithGoogle() {
    await handleAuthAction(async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        const userToken = await auth.currentUser?.getIdToken();
        await registerUserToken(res.user.uid, userToken!);
        if (userToken) {
          createNewUserWithGoogle(auth, userToken);
        }
      }
    }, "Google Sign-In Successful!");
  }

  async function resetPassword(email: string) {
    await handleAuthAction(async () => {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Steps have been sent to your email!");
    }, "Password Reset Successful!");
  }

  return {
    isLoading,
    error,
    success,
    signUpWithEmailAndPassword,
    loginWithEmailAndPassword,
    handleLogout,
    continueWithGoogle,
    resetPassword,
  };
}
