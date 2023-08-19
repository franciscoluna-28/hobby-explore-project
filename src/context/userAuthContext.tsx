import React, { createContext, useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

// Contract to handle the Auth Context props
interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
}

/**
 * @constant AuthContext - Auth context.
 * @function - Auth context provider.
 * @returns - Auth provider that accepts children.
 *
 */

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  /**
   * @function fetchToken - Handles the token of the user.
   * @returns - User's beared token.
   * @default null - The default of value is null before a new user registers.
   *
   */

  // Handle user JWT token according the user state
  // The main layer of security is within the backend so this is enough
  useEffect(() => {
    const fetchToken = async () => {
      if (sessionStorage.getItem("accessToken") === null || !token) {
        const userToken = await currentUser?.getIdToken();
        if (userToken) {
          sessionStorage.setItem("accessToken", userToken);
          setToken(userToken);
        }
      }
    };

    fetchToken();
  }, [currentUser, token]);

  // Handle user subscription state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, [currentUser]);

  const authContextValue: AuthContextType = {
    currentUser,
    token,
    setToken,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
