import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTachometerAlt,
    faUsers,
    faCog,
    faBars,
    faChevronDown,
    faChevronUp,
    faTools,
    faComments,
    faBriefcase,
    faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed, toggleSidebar }) => {
    const [machineMenuOpen, setMachineMenuOpen] = useState(false);
    const toggleMachineMenu = () => setMachineMenuOpen(!machineMenuOpen);

    return (
        <>
            <style>{`
        .sidebar {
          font-family: 'Inter', sans-serif;
          min-height: 100vh;
          background-color: #fff;
          color: #333;
          border-right: 1px solid #e5e5e5;
          padding-top: 1rem;
          overflow: hidden;
          box-sizing: border-box;
          flex-shrink: 0;
          transition: width 0.3s ease;
        }

        .sidebar.collapsed {
          width: 64px;
        }

        .sidebar .toggle-btn {
          font-size: 1.5rem;
          border: none;
          background: none;
          cursor: pointer;
          color: #333;
          outline: none;
          box-shadow: none;
        }

        .sidebar .nav-link {
          padding: 10px 20px;
          display: flex;
          align-items: center;
          color: #333;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: background 0.2s, color 0.2s;
          cursor: pointer;
        }

        .sidebar .nav-link:hover {
          background-color: #f2f2f2;
        }

        .sidebar .nav-link .icon {
          margin-right: 10px;
          min-width: 20px;
        }

        .sidebar .nav-link .text {
          flex-grow: 1;
        }

        .sidebar.collapsed .nav-link {
          justify-content: center;
        }

        .sidebar.collapsed .nav-link .text {
          display: none;
        }

        .sidebar-title {
          font-size: 1.2rem;
          font-weight: 600;
          padding: 0 1rem;
          margin-bottom: 1rem;
          white-space: nowrap;
        }

        .sidebar.collapsed .sidebar-title {
          display: none;
        }

        .submenu {
          list-style: none;
          padding-left: 1.5rem;
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .submenu.open {
          max-height: 300px;
        }

        .submenu .nav-link {
          font-size: 0.9rem;
          font-weight: 400;
        }
      `}</style>

            <div
                className={`sidebar ${collapsed ? 'collapsed' : ''}`}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    height: '100vh',
                    zIndex: 1000,
                    width: collapsed ? 64 : 240,
                }}
            >
                <div className="d-flex justify-content-between align-items-center px-3 mb-3">
                    {!collapsed && <span className="sidebar-title">Admin</span>}
                    <button className="toggle-btn" onClick={toggleSidebar}>
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>

                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">
                            <span className="icon">
                                <FontAwesomeIcon icon={faTachometerAlt} />
                            </span>
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/mockusers" className="nav-link">
                            <span className="icon">
                                <FontAwesomeIcon icon={faUsers} />
                            </span>
                            <span className="text">User List</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/feedback" className="nav-link">
                            <span className="icon">
                                <FontAwesomeIcon icon={faComments} />
                            </span>
                            <span className="text">Feedback</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <div className="nav-link" onClick={toggleMachineMenu}>
                            <span className="icon">
                                <FontAwesomeIcon icon={faTools} />
                            </span>
                            {!collapsed && <span className="text">Equipment Group</span>}
                            {!collapsed && (
                                <span>
                                    <FontAwesomeIcon icon={machineMenuOpen ? faChevronUp : faChevronDown} />
                                </span>
                            )}
                        </div>
                        <ul className={`submenu ${machineMenuOpen ? 'open' : ''}`}>
                            <li>
                                <Link to="/adminproduct" className="nav-link">
                                    <span className="text">Capsule Machine</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/admintablet" className="nav-link">
                                    <span className="text">Tablet Machine</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/adminliquidfilling" className="nav-link">
                                    <span className="text">Filling Machine</span>
                                </Link>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item">
                        <Link to="/admincareer" className="nav-link">
                            <span className="icon">
                                <FontAwesomeIcon icon={faBriefcase} />
                            </span>
                            <span className="text">Jobs</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/login" className="nav-link">
                            <span className="icon">
                                <FontAwesomeIcon icon={faRightFromBracket} />
                            </span>
                            <span className="text">Logout</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Sidebar;
