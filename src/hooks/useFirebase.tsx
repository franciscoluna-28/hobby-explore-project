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
import { Navigate } from "react-router-dom";
import { deleteTokenFromSessionStorage } from "../lib/delete-token-from-session-storage";
import { signInWithPopup } from "firebase/auth";
import {
  createNewUser,
  createNewUserWithGoogle,
} from "../features/user-actions/api/use-register-user";
import { useAuth } from "./useAuth";

/**
 * @constant [isLoading, setIsloading] Loading state.
 * @constant [error, setIsError] Error displayed by Firebase.
 * @constant [success, setSuccess] Success message displayed after a successful action.
 * @function signUpWithEmailAndPassword() Function that registers the user with their email and password.
 * @function loginWithEmailAndPassword() Function that handles the logic to register a user with their email and password.
 * @function handleLogout() Function that logs out the user.
 */

// Custom hook to handle Firebase Auth Logic

export function useFirebase() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const { token } = useAuth();

  async function signUpWithEmailAndPassword(email: string, password: string) {
    try {
      setIsLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // In case a usar was created we continue the execution
      if (res.user) {
        setIsLoading(false);
        setSuccess("Account created successfully!");
        createNewUser(auth, token!);
      }
    } catch (error) {
      // Checking if the error is a valid instance of FirebaseError
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  // Custom hook to handle Firebase Login
  async function loginWithEmailAndPassword(email: string, password: string) {
    try {
      setIsLoading(true);
      setError("");
      const res = await signInWithEmailAndPassword(auth, email, password);
      if (res.user) {
        setIsLoading(false);
        setSuccess("Logged In Successfully!");
        createNewUser(auth, token! ?? sessionStorage.getItem("accessToken"));
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogout() {
    try {
      signOut(auth);
      deleteTokenFromSessionStorage();
      <Navigate to="/" replace={true} />;
    } catch {
      alert("Error!");
    }
  }

  async function continueWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await signInWithPopup(auth, provider);

      if (res.user) {
        createNewUserWithGoogle(auth, token! ?? sessionStorage.getItem("accessToken"));
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function resetPassword(email: string) {
    try {
      setIsLoading(true);
      console.log(email);
      await sendPasswordResetEmail(auth, email);
      setSuccess("Steps have been sent to your email!");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
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
  };
}
