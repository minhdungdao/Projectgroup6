import { useState } from 'react';
import httpClient from '../auth/httpClient';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/Loading';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !code || !newPassword) {
            setError('Please fill in all the required information.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Invalid email address.');
            return;
        }

        if (newPassword.length < 6) {
            setError('The new password must be at least 6 characters long.');
            return;
        }

        setError('');

        try {
            setIsLoading(true);
            const response = await httpClient.post('/api/Candidates/reset-password', {
                email,
                code,
                newPassword,
            });

            setIsLoading(false);

            if (response.data) {
                navigate('/login');
            }
        } catch (err) {
            setIsLoading(false);
            toast.error(err?.response?.data?.message || 'Có lỗi, vui lòng thử lại!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-indigo-100 px-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Reset password</h2>

                <form onSubmit={handleSubmit} noValidate>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 text-left">
                            Email <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                        </label>
                        <input
                            type="email"
                            className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition"
                            placeholder="example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2 text-left">
                            Verification code <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition"
                            placeholder="Enter the 6-digit code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2 text-left">
                            New password <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                        </label>
                        <input
                            type="password"
                            className="w-full px-3 py-2.5 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-transparent transition"
                            placeholder="Enter new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4 text-left">{error}</p>}

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
                            className="w-full outline-none bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2.5 rounded transition duration-200"
                        >
                            Update Password
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
