import React, { useState, useEffect } from 'react';
import '../../assets/Admin/css/feedback.css';
import httpClient from '../../auth/httpClient';

const Feedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchFeedbacks = async () => {
            try {
                setLoading(true);
                const response = await httpClient.get('/api/Feedbacks');
                setFeedbacks(response.data);
            } catch (err) {
                setError('Error loading feedbacks');
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    const handleToggleVisibility = async (id) => {
        try {
            const response = await httpClient.put(`/api/Feedbacks/${id}/toggle-visibility`);
            const updatedFeedback = response.data;

            setFeedbacks((prev) =>
                prev.map((fb) => (fb.id === id ? { ...fb, isVisible: updatedFeedback.isVisible } : fb)),
            );

            const msg = updatedFeedback.isVisible
                ? 'Feedback status changed to: Visible ✅'
                : 'Feedback status changed to: Hidden ❌';

            alert(msg);
        } catch (err) {
            alert('Lỗi khi cập nhật trạng thái hiển thị.');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this feedback?');
        if (!confirmDelete) return;

        try {
            await httpClient.delete(`/api/Feedbacks/${id}`);
            setFeedbacks((prev) => prev.filter((fb) => fb.id !== id));
        } catch (err) {
            alert('Failed to delete feedback.');
            console.error(err);
        }
    };

    const filteredFeedbacks = feedbacks.filter((fb) =>
        (fb.name + (fb.phoneNumber ?? '') + (fb.comments ?? '') + new Date(fb.createdAt).toLocaleDateString())
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFeedbacks = filteredFeedbacks.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    if (loading) return <p>Loading feedbacks...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="feedback-container">
            <h2>📬 User Feedback List</h2>

            <div className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Search feedbacks..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                />
                <i className="fas fa-search"></i>
            </div>

            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Content</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedFeedbacks.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                                No matching feedbacks found.
                            </td>
                        </tr>
                    ) : (
                        paginatedFeedbacks.map((fb) => (
                            <tr key={fb.id}>
                                <td>{fb.name}</td>
                                <td>{fb.email}</td>
                                <td>{fb.phoneNumber}</td>
                                <td>{fb.comments}</td>
                                <td>{new Date(fb.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                        <a
                                            href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                                                fb.email,
                                            )}&su=${encodeURIComponent(
                                                'Phản Hồi Yêu Cầu Hỗ Trợ Báo Giá',
                                            )}&body=${encodeURIComponent(
                                                'Chào bạn, cảm ơn bạn đã quan tâm đến sản phẩm của công ty ABC dưới đây là báo giá chi tiết:',
                                            )}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Reply"
                                            style={{
                                                backgroundColor: '#3b82f6',
                                                color: 'white',
                                                padding: '8px 12px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                textDecoration: 'none',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <i className="fas fa-reply"></i>
                                        </a>

                                        <button
                                            onClick={() => handleToggleVisibility(fb.id)}
                                            title={fb.isVisible ? 'Đang hiển thị' : 'Đang bị ẩn'}
                                            style={{
                                                backgroundColor: fb.isVisible ? '#22c55e' : '#9ca3af',
                                                color: 'white',
                                                padding: '8px 12px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <i className={`fas ${fb.isVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                                        </button>

                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleDelete(fb.id);
                                            }}
                                            title="Delete"
                                            style={{
                                                backgroundColor: '#ef4444',
                                                color: 'white',
                                                padding: '8px 12px',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
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

export default Feedback;
