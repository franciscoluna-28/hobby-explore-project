import { useEffect } from "react";
import { registerUserToken } from "../features/user-actions/api/use-send-user-token";

export function useTokenExpirationCheck(
  uid: string,
  token: string,
  handleLogout: () => void
) {
  useEffect(() => {
    async function checkTokenExpiration() {
      if (uid && token) {
        try {
          const response = await registerUserToken(uid, token);

          if (response.error === "TokenExpired") {
            // Token has expired, log out the user
            await handleLogout();
          }
        } catch (error) {
          console.error("Error checking token expiration:", error);
        }
      }
    }

    // Call the token expiration check when the user is authenticated and has a token
    checkTokenExpiration();
  }, [uid, token, handleLogout]);
}
