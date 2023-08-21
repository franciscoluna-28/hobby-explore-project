import React, { createContext, useState, useEffect } from "react";
import { User, getIdToken } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(
    sessionStorage.getItem("accessToken") || null
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (!token && currentUser) {
        try {
          const userToken = await getIdToken(currentUser);
          sessionStorage.setItem("accessToken", userToken);
          setToken(userToken);
        } catch (error) {
          console.error("Error fetching user token:", error);
        }
      }
    };

    fetchToken();
  }, [currentUser, token]); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

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
