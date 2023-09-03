import { useCallback } from "react";
import { signOut } from "firebase/auth";
import { useMutation } from "@tanstack/react-query";
import { deleteTokenFromSessionStorage } from "../lib/delete-token-from-session-storage";
import { Navigate } from "react-router-dom"; // Import the necessary components
import { auth } from "../firebase";
import { queryClient } from "../lib/query-client-instance";
const useAuthLogout = () => {



  const logoutMutation = useMutation(async () => {
    console.log("logged out")
    await signOut(auth);
    deleteTokenFromSessionStorage();
    queryClient.removeQueries();
  });

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation.mutateAsync();
      // You can navigate to the "/" route after successful logout
      return <Navigate to={"/"} />;
    } catch (error) {
      // Handle any errors here
      console.error("Error logging out:", error);
      return false;
    }
  }, [logoutMutation, queryClient]);

  return { handleLogout, logoutMutation };
};

export default useAuthLogout;
