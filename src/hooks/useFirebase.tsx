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
import { signInWithPopup } from "firebase/auth";
import {
  createNewUser,
  createNewUserWithGoogle,
} from "../features/user-actions/api/use-register-user";
import { queryClient } from "../lib/query-client-instance";
import { Navigate } from "react-router-dom";
import { registerUserToken } from "../features/user-actions/api/use-send-user-token";
import { useAuth } from "./useAuth";
import { deleteTokenFromSessionStorage } from "../lib/delete-token-from-session-storage";


export function useFirebase() {
  const { token, setToken } = useAuth();
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
      setIsLoading(false); // Move this outside the catch block to ensure it's always executed
    }
  }

  async function signUpWithEmailAndPassword(email: string, password: string) {
    await handleAuthAction(async () => {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res.user) {
        createNewUser(auth, token!);// Always set the token here to keep it up-to-date
        await registerUserToken(res.user.uid, token!);

      }
    }, "Account created successfully!");
  }

  async function loginWithEmailAndPassword(email: string, password: string) {
    await handleAuthAction(async () => {
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        await registerUserToken(res.user.uid, token!);
      }
    }, "Logged In Successfully!");
  }

  // ... other functions ...

  async function continueWithGoogle() {
    await handleAuthAction(async () => {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);
      if (res.user) {
        await registerUserToken(res.user.uid, token!);
        createNewUserWithGoogle(auth, token!); // Removed unnecessary checks

      
      }
    }, "Google Sign-In Successful!");
  }

  async function resetPassword(email: string) {
    await handleAuthAction(async () => {
      await sendPasswordResetEmail(auth, email);
      setSuccess("Steps have been sent to your email!");
    }, "Password Reset Successful!");
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      setToken(null);
      deleteTokenFromSessionStorage();
      queryClient.removeQueries();
      <Navigate to={"/"} />;
      return true;
    } catch {
      setError("Error!");
    }
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
    setError,
  };
}