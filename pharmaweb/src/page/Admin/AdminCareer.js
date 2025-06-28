import React, { useEffect, useState } from 'react';
import '../../assets/Admin/css/feedback.css';
import { Link } from 'react-router-dom';
import httpClient from '../../auth/httpClient';

const AdminCareer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [careers, setCareers] = useState([]);
    const [toast, setToast] = useState({ message: '', type: '' });
    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    useEffect(() => {
        fetchCareers();
    }, []);

    const fetchCareers = async () => {
        try {
            const response = await httpClient.get('/api/Job/getall');
            setCareers(response.data);
        } catch (error) {
            console.error('Error fetching job positions:', error);
            showToast('❌ Unable to load job positions list.', 'error');
        }
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: '' }), 3000);
    };

    const handleToggleStatus = async (id) => {
        try {
            const response = await httpClient.put(`/api/Job/status/${id}`);
            showToast(response.data, 'success');
            await fetchCareers();
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('❌ Failed to update status.', 'error');
        }
    };

    const confirmDeleteProduct = async () => {
        const id = confirmDelete.id;
        if (!id) return;
        try {
            await httpClient.delete(`/api/Job/${id}`);
            setCareers((prev) => prev.filter((item) => item.id !== id));
            showToast('✅ Job position deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting job position:', error);
            showToast('❌ Unable to delete job position.', 'error');
        }
        setConfirmDelete({ show: false, id: null });
    };

    const cancelDelete = () => setConfirmDelete({ show: false, id: null });

    const filteredCareers = careers.filter((c) =>
        (c.nameJob + c.description + c.createdAt).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const totalPages = Math.ceil(filteredCareers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCareers = filteredCareers.slice(startIndex, startIndex + itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div className="feedback-container">
            <h2>📋 Job Positions List</h2>

            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <Link
                    to="/addcareer"
                    className="btn-add-job"
                    style={{
                        background: 'linear-gradient(135deg, #3b82f6, #60a5fa)',
                        color: '#ffffff',
                        padding: '12px 20px',
                        borderRadius: '10px',
                        fontWeight: '600',
                        fontSize: '16px',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        boxShadow: '0 6px 14px rgba(59, 130, 246, 0.3)',
                        border: 'none',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #2563eb, #3b82f6)';
                        e.target.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.4)';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'linear-gradient(135deg, #3b82f6, #60a5fa)';
                        e.target.style.boxShadow = '0 6px 14px rgba(59, 130, 246, 0.3)';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    <i className="fas fa-briefcase" style={{ marginRight: '8px', fontSize: '18px' }}></i>
                    Add Job Position
                </Link>
            </div>

            <div className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Search job position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
            </div>

            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Position</th>
                        <th>Created At</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCareers.map((c) => (
                        <tr key={c.id}>
                            <td>{c.nameJob}</td>
                            <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                            <td>
                                {c.description.length > 100 ? `${c.description.substring(0, 100)}...` : c.description}
                            </td>
                            <td>
                                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <Link
                                        to={`/careerapplicants/${c.id}`}
                                        title="View Applicants"
                                        style={{
                                            backgroundColor: '#3b82f6',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <i className="fas fa-eye"></i>
                                    </Link>
                                    <Link
                                        to={`/editcareer/${c.id}`}
                                        title="Edit"
                                        style={{
                                            backgroundColor: '#facc15',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <Link
                                        to={`/cvapprover/${c.id}`}
                                        title="CV Approver"
                                        style={{
                                            backgroundColor: '#22c55e',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                        }}
                                    >
                                        <i className="fas fa-user"></i>
                                    </Link>
                                    <button
                                        onClick={() => handleToggleStatus(c.id)}
                                        style={{
                                            backgroundColor: '#ef4444',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {c.isDeleted ? (
                                            <i className="bi bi-clipboard2" title="Show"></i>
                                        ) : (
                                            <i className="bi bi-clipboard2-check" title="Hide"></i>
                                        )}
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredCareers.length === 0 && (
                        <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '1rem' }}>
                                No matching job positions found.
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

            {confirmDelete.show && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.18)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '10px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                            minWidth: '280px',
                            maxWidth: '90vw',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>
                            Confirm job position deletion?
                        </div>
                        <div style={{ color: '#475569', marginBottom: '1.2rem' }}>
                            Are you sure you want to delete this job position?
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                onClick={confirmDeleteProduct}
                                style={{
                                    background: '#b91c1c',
                                    color: '#fff',
                                    padding: '8px 18px',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                style={{
                                    background: '#f1f5f9',
                                    color: '#0369a1',
                                    padding: '8px 18px',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {toast.message && (
                <div
                    style={{
                        position: 'fixed',
                        top: '20px',
                        right: '20px',
                        padding: '14px 20px',
                        borderRadius: '8px',
                        backgroundColor:
                            toast.type === 'success' ? '#dcfce7' : toast.type === 'error' ? '#fee2e2' : '#e0f2fe',
                        color: toast.type === 'success' ? '#166534' : toast.type === 'error' ? '#b91c1c' : '#0369a1',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        fontWeight: 600,
                        zIndex: 9999,
                    }}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default AdminCareer;
