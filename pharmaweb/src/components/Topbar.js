import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Topbar = () => {
  return (
    <>
      <style>
        {`
          .topbar {
            background-color: #fff;
            border-bottom: 1px solid #e5e5e5;
            padding: 0.55rem 1.5rem;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            font-family: 'Inter', sans-serif;
            width: 100%;
            box-sizing: border-box;
            transition: all 0.3s ease;
          }

          .topbar-right {
            display: flex;
            align-items: center;
            gap: 1.2rem;
          }

          .topbar-icon {
            font-size: 1.2rem;
            color: #555;
            cursor: pointer;
            transition: color 0.2s;
          }

          .topbar-icon:hover {
            color: #000;
          }

          .topbar-avatar {
            width: 39px;
            height: 39px;
            border-radius: 50%;
            object-fit: cover;
            cursor: pointer;
            border: 2px solid #eee;
          }
        `}
      </style>

      <nav className="topbar">
        <div className="topbar-right">
          <FontAwesomeIcon icon={faBell} className="topbar-icon" />
          <img
            src="https://i.pravatar.cc/300"
            alt="User Avatar"
            className="topbar-avatar"
          />
        </div>
      </nav>
    </>
  );
};

export default Topbar;
