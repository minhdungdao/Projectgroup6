import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthData } from '../stores';
import { Dropdown } from 'antd';
import { FaUser } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { VscFilePdf } from 'react-icons/vsc';

const Nav = () => {
    const location = useLocation();

    // Kiểm tra url hiện tại có bắt đầu bằng path truyền vào không
    const isActive = (path) => location.pathname === path;
    const { authData, setAuthData } = useAuthData();

    const handleClearData = () => {
        setAuthData({
            isAuthenticated: false,
            data: {},
        });

        localStorage.removeItem('authData');
    };

    const items = [
        {
            label: (
                <Link to="/profile" className="px-4 py-1.5 flex items-center gap-2 font-medium">
                    Profile
                    <span className="flex items-center justify-center text-base">
                        <FaUser />
                    </span>
                </Link>
            ),
            key: '0',
        },
        {
            label: (
                <Link to="/mycv" className="px-4 py-2 flex items-center gap-2 font-medium">
                    My CV
                    <span className="flex items-center justify-center text-base">
                        <VscFilePdf />
                    </span>
                </Link>
            ),
            key: '3',
        },
        {
            label: (
                <Link onClick={handleClearData} to="/login" className="px-4 py-2 flex items-center gap-2 font-medium">
                    Đăng xuất
                    <span className="flex items-center justify-center text-base">
                        <RiLogoutCircleLine />
                    </span>
                </Link>
            ),
            key: '1',
        },
    ];

    return (
        <>
            <header
                id="header"
                className="header sticky-top h-[86px] shrink-0"
                style={{ marginTop: '0', paddingTop: '0', borderBottom: '1px solid #d7d7d7' }}
            >
                <div className="branding flex items-center">
                    <div className="container-fluid px-6 position-relative d-flex align-items-center justify-content-between">
                        <Link to="/" className="logo flex-1 d-flex align-items-center me-auto">
                            <h1 className="display-4 fw-bold flex items-center" style={{ letterSpacing: 1 }}>
                                <span style={{ color: '#4d65f9', fontSize: '38px' }}>Vita</span>
                                <span style={{ color: '#ff4880', fontSize: '38px' }}>Pharma</span>
                            </h1>
                        </Link>
                        <nav id="navmenu" className="navmenu flex-1">
                            <ul>
                                <li className="font-semibold">
                                    <Link to="/" className={isActive('/') ? 'active' : ''}>
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/aboutus"
                                        className={`font-medium ${isActive('/aboutus') ? 'active' : ''}`}
                                    >
                                        About Us
                                    </Link>
                                </li>
                                <li className="dropdown">
                                    <Link to="/product">
                                        <span>Product</span> <i className="bi bi-chevron-down toggle-dropdown" />
                                    </Link>
                                    <ul>
                                        <li>
                                            <Link to="/product" className={isActive('/product') ? 'active' : ''}>
                                                Capsule
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/tablet" className={isActive('/tablet') ? 'active' : ''}>
                                                Tablet
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                to="/liquidfilling"
                                                className={isActive('/liquidfilling') ? 'active' : ''}
                                            >
                                                Liquid Filling
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/quoteus" className={isActive('/quoteus') ? 'active' : ''}>
                                        Quote Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/career" className={isActive('/career') ? 'active' : ''}>
                                        Career
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contactus" className={isActive('/contactus') ? 'active' : ''}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                            <i className="mobile-nav-toggle d-xl-none bi bi-list" />
                        </nav>
                        <div className="flex items-center flex-1 justify-end">
                            {authData?.data?.fullName ? (
                                <Dropdown menu={{ items }} trigger={['click']}>
                                    <div className="size-[56px] flex cursor-pointer">
                                        <img
                                            title={authData?.data?.fullName}
                                            className="size-full object-cover rounded-full"
                                            src="https://img.freepik.com/premium-vector/character-avatar-isolated_729149-194801.jpg?semt=ais_items_boosted&w=740"
                                        />
                                    </div>
                                </Dropdown>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="template-btn mx-2 font-medium flex items-center gap-2"
                                        style={{
                                            borderRadius: '50px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="template-btn mx-2 font-medium flex items-center gap-2"
                                        style={{
                                            borderRadius: '50px',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <i className="fas fa-user-plus"></i>
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* CSS gói chung cho Nav */}
            <style>{`
        .navmenu ul {
          list-style: none;
          padding-left: 0;
          margin: 0;
          display: flex;
          gap: 8px;
        }
        .navmenu ul li {
          position: relative;
        }
        .navmenu ul li a {
          text-decoration: none;
          color: #333;
          padding: 6px 8px !important;
          display: block;
          font-weight: 500;
          transition: color 0.3s ease, border-bottom 0.3s ease;
        }
        .navmenu ul li a:hover {
          color: #0d6efd;
          // border-bottom: 2px solid #0d6efd;
        }
        .navmenu ul li a.active {
          color: #0d6efd;
          font-weight: bold;
          // border-bottom: 2px solid #0d6efd;
        }
        /* Dropdown submenu */
        .dropdown > ul {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          box-shadow: 0 8px 16px rgba(0,0,0,0.15);
          min-width: 180px;
          padding: 10px 0;
          border-radius: 4px;
          z-index: 10;
        }
        .dropdown:hover > ul {
          display: block;
        }
        .dropdown ul li {
          padding: 0;
        }
        .dropdown ul li a {
          padding: 8px 20px;
          color: #333;
          white-space: nowrap;
        }
        .dropdown ul li a:hover,
        .dropdown ul li a.active {
          color: #0d6efd;
          background-color: #f0f8ff;
          font-weight: bold;
          border-bottom: none;
        }
        /* Style cho mobile-nav-toggle icon (giả) */
        .mobile-nav-toggle {
          cursor: pointer;
          font-size: 1.5rem;
          display: none;
        }
        @media (max-width: 991px) {
          .mobile-nav-toggle {
            display: block;
          }
          .navmenu ul {
            flex-direction: column;
            gap: 0;
          }
          .navmenu ul li {
            border-bottom: 1px solid #eee;
          }
          .dropdown > ul {
            position: static;
            box-shadow: none;
          }
        }
      `}</style>
        </>
    );
};

export default Nav;
