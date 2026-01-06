import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1. Define the interface for the Hook's parameters
interface UseAuthProps {
    middleware?: 'guest' | 'auth';
    redirectIfAuthenticated?: string;
}

// 2. Define types for Login and Register arguments
interface AuthActionProps {
    setErrors: React.Dispatch<React.SetStateAction<any[]>>;
    setStatus?: React.Dispatch<React.SetStateAction<any>>;
    [key: string]: any; // Allows any other properties like email, password, etc.
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthProps = {}) => {
    const router = useRouter();

    // Fetch User Data
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios.get('/api/user').then(res => res.data.data || res.data)
        .catch(error => {
            if (error.response.status !== 409) throw error;
            router.push('/verify-email');
        })
    );

    // CSRF Token
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    // Register Action
    const register = async ({ setErrors, ...props }: AuthActionProps) => {
        await csrf();
        setErrors([]);

        try {
            await axios.post('/register', props);
            mutate(); // Refresh user data
        } catch (error: any) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                throw error;
            }
        }
    };

    // Login Action
    const login = async ({ setErrors, setStatus, ...props }: AuthActionProps) => {
        await csrf();
        setErrors([]);
        if (setStatus) setStatus(null);

        try {
            await axios.post('/login', props);
            mutate(); // Refresh user data
        } catch (error: any) {
            if (error.response.status === 422) {
                setErrors(error.response.data.errors);
            } else {
                throw error;
            }
        }
    };

    // Logout Action
    const logout = async () => {
        if (!error) {
            await axios.post('/logout');
            mutate(null); // Clear user data
        }
        window.location.pathname = '/login';
    };

    // Handle Redirects
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated);
        if (window.location.pathname === '/verify-email' && user?.email_verified_at)
            router.push(redirectIfAuthenticated || '/');
        if (middleware === 'auth' && error) logout();
    }, [user, error, middleware, redirectIfAuthenticated, router]);

    return {
        user,
        register,
        login,
        logout,
    };
};