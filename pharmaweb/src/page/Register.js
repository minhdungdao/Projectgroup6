import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import authService from '../services/authService';

const RightElement = styled.div`
    background: #0dcaf047;
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

const Register = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [errorApi, setErrorApi] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Nếu cần xử lý mật khẩu không khớp:
        if (data.Password !== data.ConfirmPassword) {
            setPasswordError('Mật khẩu không khớp.');
            return;
        }

        setPasswordError('');

        try {
            const response = await authService.register(data);

            if (response.data) {
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            setErrorApi(err?.response?.data ?? '');
        }

        // Gửi data nếu cần
        // fetch('/api/register', {
        //   method: 'POST',
        //   body: formData, // vẫn dùng formData nếu có file
        // })
    };

    return (
        <div
            className="d-flex h-full align-items-center justify-content-center"
            style={{
                backgroundImage:
                    'url(https://img.freepik.com/premium-photo/medicine-pill-capsules-fallling-with-blue-background-healthcare-medical-3d-illustration-background_518421-472.jpg)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 100%',
            }}
        >
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-xl-10 py-10">
                        <div className="card rounded-xl border-0 shadow-lg overflow-hidden">
                            <div className="flex flex-row g-0">
                                <div className="col-lg-6 px-5 py-3 bg-white overflow-y-auto">
                                    <div className="d-flex flex-column justify-content-center">
                                        <div className="text-center mb-2">
                                            <h1 className="text-3xl m-0">
                                                <span style={{ color: '#4d65f9' }}>Vita</span>
                                                <span style={{ color: '#ff4880' }}>Pharma</span>
                                            </h1>
                                            <p className="text-sm fs-5 m-0 opacity-80 mt-1">
                                                Create a new account to get started
                                            </p>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    UserName
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500 shadow-none"
                                                    placeholder="Enter username"
                                                    name="FullName"
                                                    required
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Email
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500 shadow-none"
                                                    placeholder="Enter email"
                                                    required
                                                    name="Email"
                                                    autoComplete="email"
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Phone Number
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="tel"
                                                    className="form-control border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500 shadow-none"
                                                    placeholder="Enter phone number"
                                                    required
                                                    name="Phone"
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Password
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500 shadow-none"
                                                    placeholder="Enter Password"
                                                    required
                                                    name="Password"
                                                    autoComplete="new-password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Confirm password
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <input
                                                    type="password"
                                                    className="form-control border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500 shadow-none"
                                                    placeholder="Enter confirm password"
                                                    required
                                                    value={confirmPassword}
                                                    name="ConfirmPassword"
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        height: '44px',
                                                    }}
                                                />
                                                {passwordError && (
                                                    <p className="text-danger text-xs mt-1.5 text-left">
                                                        {passwordError}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Avatar
                                                </label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="Avatar"
                                                    accept="image/*"
                                                    style={{
                                                        fontSize: '0.9rem',
                                                        background: '#f6f8fa',
                                                        height: '44px',
                                                    }}
                                                />
                                            </div>

                                            {/* <div className="mb-3">
                                                <label
                                                    className="form-label text-sm flex items-center gap-2"
                                                    style={{ textAlign: 'left', width: '100%' }}
                                                >
                                                    Role
                                                    <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                                                </label>
                                                <select
                                                    defaultValue="0"
                                                    name="role"
                                                    required
                                                    className="form-control border-[1.5px] border-solid border-[#d7d7d7] focus:border-blue-500 shadow-none"
                                                    style={{
                                                        borderRadius: '6px',
                                                        fontSize: '14px',
                                                        height: '44px',
                                                        padding: '0.375rem 0.75rem',
                                                        backgroundColor: '#fff',
                                                    }}
                                                >
                                                    <option value="0">User</option>
                                                    <option value="1">Admin</option>
                                                </select>
                                            </div> */}
                                            <div className="text-left">
                                                {errorApi && <p className="text-red-500 text-sm">{errorApi}</p>}
                                            </div>

                                            <div className="text-center">
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary px-4 py-2 rounded-pill fw-bold shadow template-btn mt-2"
                                                    style={{
                                                        fontSize: '14px',
                                                        letterSpacing: 1,
                                                    }}
                                                >
                                                    Register
                                                </button>
                                                <div className="text-center mt-1.5" style={{ fontSize: '0.95rem' }}>
                                                    <span className="text-muted text-sm">
                                                        Already have an account?{' '}
                                                    </span>
                                                    <Link
                                                        to="/login"
                                                        className="text-decoration-none text-sm text-primary fw-semibold"
                                                    >
                                                        Login
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <RightElement className="col-lg-6 d-flex align-items-center justify-content-center rounded-end">
                                    <div
                                        className="text-white px-4 py-5 w-100 h-100 d-flex flex-column justify-content-center align-items-center"
                                        style={{ minHeight: 400 }}
                                    >
                                        <h2
                                            className="mb-4 fw-bold text-center text-white opacity-90"
                                            style={{ textShadow: '0 2px 16px #2e3d9577' }}
                                        >
                                            Come join us <span style={{ color: '#4d65f9' }}>Vita</span>
                                            <span style={{ color: '#ff4880' }}>Pharma</span>
                                        </h2>
                                        <p className="mb-4 fs-5 text-base text-center" style={{ maxWidth: 400 }}>
                                            Discover the future of pharmaceutical manufacturing! Sign up today to
                                            explore our advanced medicine production solutions and join us in building a
                                            modern pharmaceutical industry!
                                        </p>
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

export default Register;
