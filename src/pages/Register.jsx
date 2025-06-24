import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, Image, UserPlus, ArrowRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const { createUser, updateUserProfile } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Watch the password field to use for confirm password validation
    const password = watch("password", "");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await createUser(data.email, data.password);
            await updateUserProfile(data.name, data.photoURL);
            toast.success("Registration successful!");
            navigate('/');
        } catch (error) {
            toast.error(error.message || "An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 flex items-center justify-center p-4">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-sky-600/20 to-fuchsia-600/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Main card */}
                <div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
                    {/* Header with gradient */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4">
                            <UserPlus className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Create an Account</h1>
                        <p className="text-indigo-200 text-sm">Join our community and start your journey</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                        {/* Name field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <User className="w-4 h-4" />
                                Full Name
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="Enter your full name"
                                    className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                                        errors.name ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Photo URL field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Image className="w-4 h-4" />
                                Photo URL
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    {...register("photoURL", { required: "Photo URL is required" })}
                                    placeholder="https://example.com/photo.jpg"
                                    className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                                        errors.photoURL ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                />
                                {errors.photoURL && (
                                    <p className="text-red-400 text-xs mt-1">{errors.photoURL.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Email field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Mail className="w-4 h-4" />
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address"
                                        }
                                    })}
                                    placeholder="Enter your email"
                                    className={`w-full px-4 py-3 bg-gray-700 text-white border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                                        errors.email ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                                )}
                            </div>
                        </div>

                        {/* Password field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 8,
                                            message: "Password must be at least 8 characters long"
                                        },
                                        pattern: {
                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                            message: "Password must include uppercase, lowercase, number, and special character"
                                        }
                                    })}
                                    placeholder="Create a strong password"
                                    className={`w-full px-4 py-3 pr-12 bg-gray-700 text-white border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                                        errors.password ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Confirm Password field */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value =>
                                            value === password || "The passwords do not match"
                                    })}
                                    placeholder="Confirm your password"
                                    className={`w-full px-4 py-3 pr-12 bg-gray-700 text-white border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                                        errors.confirmPassword ? 'border-red-500 bg-red-900/20' : 'border-gray-600 hover:border-gray-500'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                             {errors.confirmPassword && (
                                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-6"
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </>
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>

                        {/* Login link */}
                        <div className="text-center pt-4 border-t border-gray-700">
                            <p className="text-gray-400 text-sm">
                                Already have an account?{' '}
                                <Link
                                    to="/login"
                                    className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline transition-colors"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>

                {/* Bottom decorative text */}
                <div className="text-center mt-6">
                    <p className="text-gray-500 text-xs">
                        By creating an account, you agree to our Terms & Conditions
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;