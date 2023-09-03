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
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      // El error 401 indica un token no válido o expirado
      return { error: "TokenExpired" }; // Devuelve un valor específico para manejar en el componente de interfaz de usuario
    } else {
      throw error;
    }
  }
}