import React, { createContext, useState, useEffect } from "react";
import { User, getIdToken } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useGlobalAxiosInstance } from "../features/axios";

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
  const [token, setToken] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(() => {
    const fetchToken = () => {
      if (!token && currentUser && currentUser.uid) {
        console.log("Fetching user token...");
        getIdToken(currentUser)
          .then((userToken) => {
            console.log("User token obtained:", userToken);
            setToken(userToken);
            sessionStorage.setItem("accessToken", userToken);
          })
          .catch((error) => {
            console.error("Error fetching user token:", error);
          });
      }
    };

    fetchToken();
  }, [currentUser]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  useGlobalAxiosInstance(sessionStorage.getItem("accessToken")!);

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

