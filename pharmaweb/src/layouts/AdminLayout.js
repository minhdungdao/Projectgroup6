import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Outlet } from 'react-router-dom';
const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    const sidebarWidth = collapsed ? 64 : 240; // Sidebar rộng 240 khi mở, 64 khi thu

    return (
        <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
            <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div
                style={{
                    marginLeft: sidebarWidth,
                    transition: 'margin-left 0.3s ease',
                }}
            >
                <Topbar />
                <div
                    style={{
                        padding: '1rem',
                        transition: 'margin-left 0.3s ease',
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;
