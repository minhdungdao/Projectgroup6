import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../../auth/httpClient';
import img4 from '../../assets/images/feature4.png';
import '../../assets/Admin/css/feedback.css';

const Product = () => {
    const [machines, setMachines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });
    const [confirmDelete, setConfirmDelete] = useState({ show: false, id: null });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const response = await httpClient.get('/api/Capsule');
                setMachines(response.data);
            } catch (error) {
                console.error('Error fetching machine data:', error);
                showToast('❌ Unable to load product list.', 'error');
            }
        };
        fetchMachines();
        setCurrentPage(1); // reset về page đầu khi search
    }, [searchTerm]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast({ message: '', type: '' }), 3000);
    };

    const handleDelete = (id) => {
        setConfirmDelete({ show: true, id });
    };

    const confirmDeleteProduct = async () => {
        const id = confirmDelete.id;
        if (!id) return;
        try {
            await httpClient.delete(`/api/Capsule/${id}`);
            setMachines((prev) => prev.filter((item) => item.id !== id));
            showToast('✅ Product deleted successfully!', 'success');
        } catch (error) {
            console.error('Error deleting product:', error);
            showToast('❌ Unable to delete product.', 'error');
        }
        setConfirmDelete({ show: false, id: null });
    };

    const cancelDelete = () => {
        setConfirmDelete({ show: false, id: null });
    };

    const filteredMachines = machines.filter((machine) =>
        machine.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const totalPages = Math.ceil(filteredMachines.length / itemsPerPage);

    const currentData = filteredMachines.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="feedback-container">
            <h2>📦 Capsule Product List</h2>

            {/* Top right action bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                {/* Search Box */}
                <div style={{ position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            padding: '8px 36px 8px 12px',
                            borderRadius: '8px',
                            border: '1px solid #cbd5e1',
                            width: '250px',
                            fontSize: '1rem',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                        }}
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        style={{
                            width: '20px',
                            height: '20px',
                            position: 'absolute',
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            pointerEvents: 'none',
                            color: '#94a3b8',
                        }}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                        />
                    </svg>
                </div>

                {/* Add Product Button */}
                <Link
                    to="/addproduct"
                    className="btn-add-product"
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
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        style={{ width: '20px', height: '20px', marginRight: '8px' }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Product
                </Link>
            </div>

            {/* Table */}
            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Avt</th>
                        <th>Product</th>
                        <th>Performance</th>
                        <th>Capsule Size</th>
                        <th>Machine Size</th>
                        <th>Weight</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((machine) => (
                        <tr key={machine.id}>
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <img
                                        src={`https://localhost:5194${machine.avatar}`}
                                        alt="Capsule Machine"
                                        style={{ width: '64px', height: '64px', borderRadius: '8px' }}
                                    />
                                </div>
                            </td>
                            <td>{machine.name}</td>
                            <td>{machine.output} capsules/hour</td>
                            <td>{machine.capsuleSize} mm</td>
                            <td>{machine.machineDimension} mm</td>
                            <td>{machine.shippingWeight} kg</td>
                            <td>{machine.price} $</td>
                            <td>
                                <div className="action-buttons">
                                    <Link
                                        to={`/editproduct/${machine.id}`}
                                        title="Edit"
                                        style={{
                                            backgroundColor: '#facc15',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            marginRight: '6px',
                                            display: 'inline-block',
                                            fontSize: '14px',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </Link>
                                    <button
                                        title="Delete"
                                        onClick={() => handleDelete(machine.id)}
                                        style={{
                                            backgroundColor: '#ef4444',
                                            color: '#fff',
                                            padding: '8px 12px',
                                            borderRadius: '6px',
                                            display: 'inline-block',
                                            fontSize: '14px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '1rem',
                        gap: '6px',
                        flexWrap: 'wrap',
                    }}
                >
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            backgroundColor: '#e5e7eb',
                            opacity: currentPage === 1 ? 0.5 : 1,
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            border: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Prev
                    </button>

                    <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            padding: '6px 12px',
                            borderRadius: '4px',
                            backgroundColor: '#e5e7eb',
                            opacity: currentPage === totalPages ? 0.5 : 1,
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            border: 'none',
                            fontWeight: 600,
                        }}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {confirmDelete.show && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        background: 'rgba(0,0,0,0.18)',
                        zIndex: 10000,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            background: '#fff',
                            borderRadius: '10px',
                            padding: '1.5rem',
                            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                            minWidth: '280px',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '1rem' }}>
                            Confirm Delete Product?
                        </div>
                        <div style={{ color: '#475569', marginBottom: '1.2rem' }}>
                            Are you sure you want to delete this product?
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
                            <button
                                onClick={confirmDeleteProduct}
                                style={{
                                    background: '#b91c1c',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '8px 18px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                }}
                            >
                                Delete
                            </button>
                            <button
                                onClick={cancelDelete}
                                style={{
                                    background: '#f1f5f9',
                                    color: '#0369a1',
                                    border: 'none',
                                    borderRadius: '6px',
                                    padding: '8px 18px',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
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
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        fontWeight: 600,
                        zIndex: 9999,
                        transition: 'all 0.3s ease',
                    }}
                >
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default Product;
