import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import { useAuthData } from '../stores';
import { useState } from 'react';

const RightElement = styled.div`
    background: linear-gradient(to right, #0dcaf04a, #4d65f9a8, #4d65f9, #2e3d95);
    @media (min-width: 768px) {
        .gradient-form {
            height: 100vh !important;
        }
    }
    @media (min-width: 769px) {
        .gradient-custom-2 {
            border-top-right-radius: 0.3rem;
            border-bottom-right-radius: 0.3rem;
        }
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const { setAuthData } = useAuthData();
    const [errorApi, setErrorApi] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await authService.login({ email, password });

            if (response.data) {
                localStorage.setItem('authData', JSON.stringify(response.data));
                setAuthData({
                    isAuthenticated: true,
                    data: response.data,
                });

                if (response.data && response.data?.role === 'Admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.log(err);
            setErrorApi(err?.response?.data ?? '');
        }
    };

    return (
        <div
            className="h-full w-full d-flex align-items-center justify-content-center"
            style={{
                backgroundImage:
                    'url(https://img.freepik.com/premium-photo/medicine-pill-capsules-fallling-with-blue-background-healthcare-medical-3d-illustration-background_518421-472.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
        >
            <div className="rounded-xl">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-10">
                        <div
                            className="card rounded-lg border-0  overflow-hidden"
                            style={{
                                boxShadow: '0 2px 16px #d7d7d7',
                            }}
                        >
                            <div className="row g-0">
                                {/* Phần form bên trái */}
                                <div className="col-lg-6 bg-white">
                                    <div className="card-body p-5 d-flex flex-column justify-content-center h-100">
                                        <div className="text-center mb-5">
                                            <h1
                                                className="display-5 text-4xl fw-bold mb-2"
                                                style={{ letterSpacing: 1 }}
                                            >
                                                <span style={{ color: '#4d65f9' }}>Vita</span>
                                                <span style={{ color: '#ff4880' }}>Pharma</span>
                                            </h1>
                                            <p className="text-gray-500 text-sm fs-5">
                                                Log in to explore career opportunities or send us your requests and
                                                feedback.
                                            </p>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label
                                                    className="form-label font-medium flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Email
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control shadow-none border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500"
                                                    id="emailInput"
                                                    placeholder="Enter your email address"
                                                    autoComplete="username"
                                                    required
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        padding: '0.375rem 0.75rem',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    className="form-label font-medium flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Password
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control shadow-none border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500"
                                                    id="passwordInput"
                                                    placeholder="Enter your account password"
                                                    autoComplete="current-password"
                                                    required
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        padding: '0.375rem 0.75rem',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            <div className="flex justify-content-between items-center mb-2">
                                                <div
                                                    className="flex items-center gap-1.5"
                                                    style={{ fontSize: '0.95rem' }}
                                                >
                                                    <input
                                                        className="m-0 p-0 border border-[#d7d7d7]"
                                                        type="checkbox"
                                                        id="rememberMe"
                                                        style={{ width: 16, height: 16 }}
                                                    />
                                                    <label
                                                        className="m-0 select-none cursor-pointer"
                                                        htmlFor="rememberMe"
                                                    >
                                                        Remember me
                                                    </label>
                                                </div>
                                                <Link
                                                    to="/forgot-password"
                                                    className="m-0 cursor-pointer text-decoration-none text-primary text-sm"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>

                                            <div className="text-left">
                                                {errorApi && <p className="text-red-500 text-sm">{errorApi}</p>}
                                            </div>

                                            <div className="text-center mb-3">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary px-8 py-2 rounded-pill fw-bold shadow template-btn mt-3"
                                                    style={{ fontSize: '14px', letterSpacing: 1 }}
                                                >
                                                    Login
                                                </button>
                                            </div>

                                            <div className="text-center mt-1.5" style={{ fontSize: '0.95rem' }}>
                                                <span className="text-muted">Don't have an account? </span>
                                                <Link
                                                    to="/register"
                                                    className="text-decoration-none text-sm text-primary fw-semibold"
                                                >
                                                    Sign up
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Phần giới thiệu bên phải */}
                                <RightElement className="col-lg-6 d-flex align-items-center justify-content-center rounded-end">
                                    <div
                                        className="text-white px-4 py-5 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                                        style={{ minHeight: 400 }}
                                    >
                                        <h2
                                            className="mb-6 fw-bold text-center text-white opacity-90"
                                            style={{ textShadow: '0 2px 16px #2e3d9577' }}
                                        >
                                            Welcome to <span style={{ color: '#4d65f9' }}>Vita</span>
                                            <span style={{ color: '#ff4880' }}>Pharma</span>
                                        </h2>
                                        <p
                                            className="mb-6 mt-2 fs-5 text-base leading-[24px] text-center"
                                            style={{ maxWidth: 400 }}
                                        >
                                            We are a leading company in the pharmaceutical manufacturing industry,
                                            utilizing modern processes such as Capsule/Encapsulation, Liquid Filling,
                                            and Blending. Join our professional team or contact us to learn more!
                                        </p>
                                        <div className="d-flex gap-4 justify-content-center mb-6 mt-2">
                                            <div className="text-center">
                                                <h4
                                                    className="fw-bold mb-1 text-xl font-semibold"
                                                    style={{ color: '#fff' }}
                                                >
                                                    3000+
                                                </h4>
                                                <p className="text-xs mb-0 text-white">Nationwide customers</p>
                                            </div>
                                            <div className="text-center">
                                                <h4
                                                    className="fw-bold mb-1 text-xl font-semibold"
                                                    style={{ color: '#fff' }}
                                                >
                                                    150+
                                                </h4>
                                                <p className="text-xs mb-0 text-white">Qualified staff</p>
                                            </div>
                                            <div className="text-center">
                                                <h4
                                                    className="fw-bold mb-1 text-xl font-semibold"
                                                    style={{ color: '#fff' }}
                                                >
                                                    10+
                                                </h4>
                                                <p className="text-xs mb-0 text-white">Technical process</p>
                                            </div>
                                        </div>
                                    </div>
                                </RightElement>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
