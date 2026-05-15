import React from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../services/index.service";
import { useNavigate } from "react-router-dom"
const Signup=()=>{
    const {register,handleSubmit,formState:{errors}}=useForm()

    const navigate=useNavigate()
    const onSubmit=async(data)=>{
        try {
            
            const res=await registerUser(data)
            localStorage.setItem("accessToken",res.data.accessToken)
            localStorage.setItem("refreshToken",res.data.refreshToken)
            console.log("Signup successfull!",res)
            navigate("/")
        } catch (error) {
            console.log("Something went wrong!",error)
        }
    }

    return(
        <div className="w-full max-w-md mx-auto p-8 space-y-6">
            <div className="flex flex-col items-center space-y-2">
                <h1 className="text-3xl font-bold">Welcome</h1>
                <p className="text-gray-600">Signup to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Username</label>
                    <input type="text" placeholder="Enter your username" {...register("username",{required:true})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    {errors.username && <span className="text-red-500 text-sm">Username is required</span>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Full Name</label>
                    <input type="text" placeholder="Enter your full name" {...register("fullName",{required:true})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    {errors.fullName && <span className="text-red-500 text-sm">Full Name is required</span>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" placeholder="Enter your email" {...register("email",{required:true})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Avatar</label>
                    <input type="file" placeholder="Enter your avatar" {...register("avatar",{required:true})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    {errors.avatar && <span className="text-red-500 text-sm">Avatar is required</span>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Cover Image</label>
                    <input type="file" placeholder="Enter your cover image" {...register("coverImage",{required:true})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    {errors.coverImage && <span className="text-red-500 text-sm">Cover Image is required</span>}
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium">Password</label>
                    <input type="password" placeholder="Enter your password" {...register("password",{required:true})} className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
                    {errors.password && <span className="text-red-500 text-sm">Password is required</span>}
                </div>

                <button type="submit" className="w-full p-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Login</button>
            </form>
        </div>
    )
}

export default Signup