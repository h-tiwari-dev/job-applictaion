import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { RegisterResponse } from '../SignUp/SignUp';

interface LoginFormData {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const { handleSubmit, control, formState: { errors } } = useForm<LoginFormData>();
    const { login } = useAuth();

    const handleLogin = async (data: LoginFormData) => {
        try {
            const response = await fetch('http://localhost:3000/v1/auth/login', {
                body: JSON.stringify(data),
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error('Login failed. Please check your credentials and try again.');
            }

            const userAndToken: RegisterResponse = await response.json();
            login(userAndToken.tokens.access.token, userAndToken.tokens.refresh?.token ?? "", userAndToken.user);

            // Redirect to a different page after successful login (e.g., dashboard).
            navigate('/jobs');
        } catch (error) {
            toast.error((error as any).message, {
                position: 'top-right',
                autoClose: 5000,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto p-4 bg-white rounded shadow-lg">
            <div className='w-full flex flex-row justify-between'>
                <h2 className="text-2xl font-semibold mb-4">
                    Login
                </h2>
                <Link to="/jobs" className="text-blue-500 hover:underline align-baseline">
                    &lt;
                </Link>
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
                <label htmlFor="password" className="block text-gray-700">Password</label>
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
                    render={({ field }) => <input type="password" {...field} className="form-input border rounded-md py-2 px-3 w-full placeholder-gray-400" />}
                />
                {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            </div>

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">Login</button>
            <p className="mt-2 text-gray-600">
                Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
            </p>

        </form>
    );
};
