
// To avoid "magic" values and typos
const tokenToRemove = "accessToken"

// Remove Token from user session
export function deleteTokenFromSessionStorage() {
  sessionStorage.removeItem(tokenToRemove);
}
