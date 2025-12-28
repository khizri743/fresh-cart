import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter();

    // 1. Fetch User Data (SWR handles caching and revalidation)
    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios.get('/api/user').then(res => res.data)
        .catch(error => {
            if (error.response.status !== 409) throw error;
            router.push('/verify-email');
        })
    );

    // 2. CSRF Token (Required by Laravel Sanctum)
    const csrf = () => axios.get('/sanctum/csrf-cookie');

    // 3. Register Action
    const register = async ({ setErrors, ...props }) => {
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

    // 4. Login Action
    const login = async ({ setErrors, setStatus, ...props }) => {
        await csrf();
        setErrors([]);
        setStatus(null);

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

    // 5. Logout Action
    const logout = async () => {
        if (!error) {
            await axios.post('/logout');
            mutate(null); // Clear user data
        }
        window.location.pathname = '/login';
    };

    // 6. Handle Redirects based on Auth State
    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user)
            router.push(redirectIfAuthenticated);
        if (window.location.pathname === '/verify-email' && user?.email_verified_at)
            router.push(redirectIfAuthenticated || '/');
        if (middleware === 'auth' && error) logout();
    }, [user, error]);

    return {
        user,
        register,
        login,
        logout,
    };
};