import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { loginUser } from "../../services/auth.service";

import {
    loginStart,
    loginSuccess,
    loginFailure,
} from "../../redux/slices/authSlice";

function LoginForm() {

    const dispatch = useDispatch();

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {

        dispatch(loginStart());

        try {

            const response = await loginUser(data);

            dispatch(loginSuccess(response.data.data.user));

            alert("Login Successful");

        } catch (error) {

            dispatch(
                loginFailure(
                    error.response?.data?.message || "Login Failed"
                )
            );

        }

    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
        >

            <h1 className="text-3xl text-white font-bold">
                Login
            </h1>

            <input
                {...register("email")}
                placeholder="Email"
                className="w-full p-3 rounded bg-zinc-800 text-white"
            />

            <input
                type="password"
                {...register("password")}
                placeholder="Password"
                className="w-full p-3 rounded bg-zinc-800 text-white"
            />

            <button
                className="w-full bg-red-600 p-3 rounded text-white"
            >
                Login
            </button>

        </form>
    );
}

export default LoginForm;