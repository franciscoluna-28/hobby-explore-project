import { axios } from "../../axios";



export function registerUserToken(uid: string, token: string) {
  console.log(uid, token);
  return axios.post(
    `/user/register-user-token/${uid}`,
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
