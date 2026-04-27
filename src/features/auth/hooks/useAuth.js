import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { googleRegister, logout } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading, setError } =
    useContext(AuthContext);

  const handleGoogleRegister = async ({ username, email, picture }) => {
    setLoading(true);
    try {
      const data = await googleRegister({ username, email, picture });
      setUser(data.user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(data.user);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogout, handleGoogleRegister };
};
