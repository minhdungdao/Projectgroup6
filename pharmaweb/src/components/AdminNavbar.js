import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const AdminNavbar = ({ title }) => {
    const [isProductOpen, setIsProductOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState('');
    const location = useLocation();

    // Cập nhật activeMenu mỗi khi URL thay đổi
    useEffect(() => {
        // Lấy path hiện tại
        setActiveMenu(location.pathname);
    }, [location]);

    const toggleProductMenu = () => {
        setIsProductOpen(!isProductOpen);
    };

    return (
        <>
            <style>{`
        body {
          margin: 0;
          font-family: 'Inter', sans-serif;
          background-color: #f9fafb;
          color: #111827;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 240px;
          background: #ffffff;
          border-right: 1px solid #e5e7eb;
          padding-top: 20px;
          transition: width 0.3s ease;
          box-shadow: 2px 0 8px rgba(0,0,0,0.05);
          z-index: 1000;
        }
        .sidebar .logo {
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          padding: 20px 0;
          user-select: none;
        }
        .sidebar ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .sidebar ul li {
          margin-bottom: 8px;
        }
        .sidebar ul li a {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          color: #374151;
          text-decoration: none;
          font-size: 16px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
        }
        .sidebar ul li a:hover,
        .sidebar ul li a.active {
          background: #bae6fd;
          color: #0369a1;
          box-shadow: 0 4px 8px rgba(3, 105, 161, 0.2);
        }
        .sidebar ul li a i {
          margin-right: 14px;
          font-size: 18px;
          min-width: 24px;
          text-align: center;
          color: inherit;
          transition: color 0.3s ease;
        }
        .mainContent {
          margin-left: 240px;
          padding: 24px 32px;
          transition: margin-left 0.3s ease;
          min-height: 100vh;
          background-color: #f9fafb;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        .header .left {
          display: flex;
          align-items: center;
        }
        .toggle-btn {
          font-size: 22px;
          margin-right: 20px;
          color: #6b7280;
          cursor: pointer;
        }
        .header .title {
          font-size: 24px;
          font-weight: 700;
        }
        .header .actions {
          display: flex;
          align-items: center;
        }
        .header .actions i {
          font-size: 20px;
          margin-left: 24px;
          color: #6b7280;
          cursor: pointer;
        }
        .header .actions .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          margin-left: 24px;
          cursor: pointer;
          object-fit: cover;
        }
        .submenu {
          padding-left: 40px;
          padding-top: 5px;
        }
        .submenu a {
          display: block;
          padding: 6px 0;
          font-size: 14px;
          text-decoration: none;
          color: #374151;
        }
        .submenu a:hover {
          color: #0284c7;
        }
      `}</style>

            <div className="sidebar">
                <div className="logo">Admin</div>
                <ul>
                    <li>
                        <Link to="/dashboard" className={activeMenu === '/dashboard' ? 'active' : ''}>
                            <i className="fas fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/mockusers" className={activeMenu === '/mockusers' ? 'active' : ''}>
                            <i className="fas fa-users"></i>
                            <span>Users</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/quote" className={activeMenu === '/quote' ? 'active' : ''}>
                            <i className="fas fa-file-alt"></i>
                            <span>Quote</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/feedback" className={activeMenu === '/feedback' ? 'active' : ''}>
                            <i className="fas fa-comments"></i>
                            <span>Feedback</span>
                        </Link>
                    </li>

                    {/* Product with Submenu */}
                    <li>
                        <a href="#!" onClick={toggleProductMenu}>
                            <i className="fas fa-box"></i>
                            <span>Product</span>
                            <i
                                className={`fas fa-chevron-${isProductOpen ? 'down' : 'right'}`}
                                style={{ marginLeft: 'auto' }}
                            ></i>
                        </a>
                        {isProductOpen && (
                            <div className="submenu">
                                <Link to="/adminproduct" className={activeMenu === '/adminproduct' ? 'active' : ''}>
                                    Capsule/Encapsulation
                                </Link>
                                <Link to="/admintablet" className={activeMenu === '/admintablet' ? 'active' : ''}>
                                    Tablet
                                </Link>
                                <Link
                                    to="/adminliquidfilling"
                                    className={activeMenu === '/adminliquidfilling' ? 'active' : ''}
                                >
                                    Liquid Filling
                                </Link>
                            </div>
                        )}
                    </li>

                    <li>
                        <Link to="/admincareer" className={activeMenu === '/admincareer' ? 'active' : ''}>
                            <i className="fas fa-flag"></i>
                            <span>Career</span>
                        </Link>
                    </li>

                    <li>
                        <Link to="/admin/settings" className={activeMenu === '/admin/settings' ? 'active' : ''}>
                            <i className="fas fa-cogs"></i>
                            <span>Settings</span>
                        </Link>
                    </li>
                    <li>
                        <a href="/account/logout">
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="mainContent">
                <div className="header">
                    <div className="left">
                        <i className="fas fa-bars toggle-btn"></i>
                        <span className="title">{title}</span>
                    </div>
                    <div className="actions">
                        <i className="fas fa-bell"></i>
                        <img src="/img/hinh-nen-laptop-7.jpg" alt="User Avatar" className="avatar" />
                        <i className="fas fa-chevron-down dropdown"></i>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminNavbar;
