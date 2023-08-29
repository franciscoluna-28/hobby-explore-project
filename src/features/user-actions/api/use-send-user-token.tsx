import { axios } from "../../axios";

export function registerUserToken(uid: string, token: string) {
  return axios.post(
    `${process.env.BASE_API_URL}/api/user/register-user-token/${uid}`,
    {
      bearedToken: token,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
