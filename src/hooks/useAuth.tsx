import { AuthContext } from "../context/userAuthContext";
import { useContext } from "react";


/**
 * @function useAuth - Hook that uses the existent instance of AuthContext.
 * @const authContext - Hook initialization.
 */

// It's primordial here to use a context to manage the user
// Within the global state. Otherwise, you'll get infinite renders and
// Bugs with the Navigate function from react-router-dom 
// Note: you should use the AuthContext instead of the onAuthStateChanged callback.

// Hook that uses Authcontext to handle the user section
export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error(
      "AuthContext is undefined. Make sure you are rendering the Login component within AuthContext.Provider."
    );
  }

  // Return the AuthContext object, this allows other components to access the current user's authentication
  return authContext;
};
