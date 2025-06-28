import Nav from '../components/nav';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import '../assets/css/animate-3.7.0.css';
import '../assets/css/bootstrap-4.1.3.min.css';
import '../assets/css/font-awesome-4.7.0.min.css';
import '../assets/css/jquery.datetimepicker.min.css';
import '../assets/css/linearicons.css';
import '../assets/css/nice-select.css';
import '../assets/css/style.css';
import '../assets/css/main.css';
import '../assets/css/login.css';
import { useEffect } from 'react';
import { useAuthData } from '../stores';

const UserLayout = () => {
    const { setAuthData } = useAuthData();

    useEffect(() => {
        const data = localStorage.getItem('authData');

        if (data) {
            const user = JSON.parse(data);

            setAuthData({
                isAuthenticated: true,
                data: user,
            });
        }
    }, []);

    return (
        <div className="flex flex-col h-screen overflow">
            <Nav />
            <main className="mt-[86px] flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
export default UserLayout;
