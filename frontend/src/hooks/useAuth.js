import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { getCurrentUser } from "../services/auth.service";
import { loginSuccess } from "../redux/slices/authSlice";

function useAuth() {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                dispatch(loginSuccess(response.data.data));
            } catch (err) {
                // User not logged in
            }
        };

        fetchUser();
    }, [dispatch]);
}

export default useAuth;