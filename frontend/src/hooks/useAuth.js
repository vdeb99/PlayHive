import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "../services/auth.service";
import { loginSuccess, authFinished } from "../redux/slices/authSlice";

function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getCurrentUser();

        dispatch(loginSuccess(response.data.data));
      } catch (err) {
        if (err.response?.status !== 401) {
          console.error(err);
        }
      } finally {
        dispatch(authFinished());
      }
    };

    checkAuth();
  }, [dispatch]);
}

export default useAuth;
