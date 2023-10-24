import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../hooks/useAuth';

interface SignUpFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
export interface User {
    id: number;
    email: string;
    name: string | null;
    role: Role;
    isEmailVerified: boolean;

}

export interface TokenResponse {
    token: string;
    expires: Date;
}

export interface AuthTokensResponse {
    access: TokenResponse;
    refresh?: TokenResponse;
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}
export interface RegisterResponse {
    user: User,
    tokens: AuthTokensResponse
}

export const SignUpForm = function () {
    const [showPassword, setShowPassword] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm<SignUpFormData>();
    const { login } = useAuth();
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSignUp = async (data: SignUpFormData) => {
        try {
            const response = await fetch('http://localhost:3000/v1/auth/register', {
                body: JSON.stringify(data),
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
            })
            if (!response.ok) {
                throw new Error('Sign-up failed. Please try again.');
            }
            const userAndToken: RegisterResponse = await response.json();
            login(userAndToken.tokens.access.token, userAndToken.tokens.refresh?.token ?? "", userAndToken.user);
            navigate(
                '/jobs'
            );
            return;
            // Simulate a sign-up error
        } catch (error) {
            toast.error((error as any).message, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleSignUp)} className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
            <div className="w-full flex flex-row justify-between">
                <h2 className="text-2xl font-semibold mb-4">
                    Sign Up
                </h2>
                <Link to="/jobs" className="text-blue-500 hover:underline align-baseline">
                    &lt;
                </Link>
            </div>

            <div className="mb-4 flex">
                <div className="w-1/2 mr-2">
                    <label htmlFor="firstName" className="block text-gray-700">First Name</label>
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'First name is required' }}
                        render={({ field }) => <input {...field} className="form-input border rounded-md py-2 px-3 w-full placeholder-gray-400" />}
                    />
                    {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                </div>

                <div className="w-1/2 ml-2">
                    <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
                    <Controller
                        name="lastName"
                        control={control}
                        defaultValue=""
                        rules={{ required: 'Last name is required' }}
                        render={({ field }) => <input {...field} className="form-input border rounded-md py-2 px-3 w-full placeholder-gray-400" />}
                    />
                    {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Email is required',
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: 'Invalid email address',
                        },
                    }}
                    render={({ field }) => <input {...field} className="form-input border rounded-md py-2 px-3 w-full placeholder-gray-400" />}
                />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="text-gray-700 flex items-center justify-between">
                    Password
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="text-blue-500 hover:underline focus:outline-none"
                    >
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </label>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: 'Password is required',
                        minLength: {
                            value: 6,
                            message: 'Password must be at least 6 characters',
                        },
                    }}
                    render={({ field }) => (
                        <input
                            type={showPassword ? 'text' : 'password'}
                            {...field}
                            className="form-input border rounded-md py-2 px-3 w-full placeholder-gray-400"
                        />
                    )}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
                Sign Up
            </button>
            <p className="mt-2 text-gray-600">
                Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
            </p>
        </form>
    );
};

