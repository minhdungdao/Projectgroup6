import React, { useState } from 'react';
import httpClient from '../auth/httpClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setError('Email cannot be empty.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email.');
            return;
        }
        setError('');

        try {
            setIsLoading(true);
            const response = await httpClient.post('/api/Candidates/forgot-password', {
                email,
            });

            setIsLoading(false);

            if (response.data) {
                navigate('/reset-password');
            }
        } catch (err) {
            setIsLoading(false);
            toast.error(err?.response?.data?.message || 'Có lỗi, vui lòng thử lại!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Forgot Password</h2>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="block text-left text-gray-700 font-semibold mb-2">
                            Email <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent transition"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {error && <p className="text-red-500 text-sm text-left mt-2">{error}</p>}
                    </div>
                    {isLoading ? (
                        <button
                            type="text"
                            className="w-full flex items-center justify-center bg-blue-500 outline-none hover:bg-blue-600 text-white font-semibold py-2.5 rounded transition duration-200"
                        >
                            <Loading />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full bg-blue-500 outline-none hover:bg-blue-600 text-white font-semibold py-3 rounded transition duration-200"
                        >
                            Submit Request
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
