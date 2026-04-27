import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND,
  withCredentials: true, // withCredentials: true is used for accessing cookies
});
export async function googleRegister({ username, email, picture }) {
  try {
    const response = await api.post("/api/auth/google-login", {
      username,
      email,
      picture,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}


export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me", {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
