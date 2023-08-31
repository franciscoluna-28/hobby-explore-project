import axios from "axios";

export async function registerUserToken(uid: string, token: string) {
  try {
    const response = await axios.post(
      `https://hobby-explore-backend.onrender.com/api/user/register-user-token/${uid}`,
      {
        bearedToken: token,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error("Error registering user token");
  }
}
