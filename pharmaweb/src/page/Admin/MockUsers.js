import React, { useState, useEffect } from 'react';
import httpClient from '../../auth/httpClient';
import '../../assets/Admin/css/mock-users.css';

const baseURL = 'https://localhost:5194';

const MockUsers = () => {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await httpClient.get('/api/Candidates');
            const formattedUsers = res.data.map((user) => ({
                id: user.id,
                avatar: user.avatar ? `${baseURL}/avatars/${user.avatar}` : '/img/hinh-nen-laptop-7.jpg',
                name: user.fullName,
                email: user.email,
                phone: user.phone || '---',
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const filteredUsers = users.filter((user) =>
        (user.name + user.email + user.phone).toLowerCase().includes(searchText.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="users-container">
            <div className="search-wrapper">
                <span className="search-icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    className="search-bar"
                    placeholder="Search users..."
                    value={searchText}
                    onChange={(e) => {
                        setSearchText(e.target.value);
                        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                    }}
                />
            </div>

            <table className="user-table" id="usersTable">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user) => (
                            <tr key={user.id}>
                                <td>
                                    <img
                                        src={user.avatar}
                                        alt="avatar"
                                        style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlRM2-AldpZgaraCXCnO5loktGi0wGiNPydQ&s';
                                        }}
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="no-users">
                                No users found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem', gap: '10px' }}>
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            backgroundColor: '#e5e7eb',
                            opacity: currentPage === 1 ? 0.5 : 1,
                        }}
                    >
                        Prev
                    </button>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            backgroundColor: '#e5e7eb',
                            opacity: currentPage === totalPages ? 0.5 : 1,
                        }}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default MockUsers;
