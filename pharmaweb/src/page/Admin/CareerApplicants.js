import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../../auth/httpClient';
import { Link } from 'react-router-dom';

const CareerApplicants = () => {
    const { jobId } = useParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [applicantsList, setApplicantsList] = useState([]);
    const [jobName, setJobName] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(0);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const [interviewDate, setInterviewDate] = useState('');

    const statusMap = {
        0: 'Pending',
        1: 'Approved',
        2: 'Rejected',
    };

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast({ message: '', type: '' });
        }, 3000);
    };

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await httpClient.get(`/api/CVSubmission/job/${jobId}`);
                setApplicantsList(response.data);
                if (response.data.length > 0) {
                    setJobName(response.data[0].jobName);
                }
            } catch (error) {
                console.error('Error fetching applicants list:', error);
                showToast('❌ Unable to load applicants list.', 'error');
            }
        };

        fetchApplicants();
    }, [jobId]);

    const updateStatus = async (id, newStatus) => {
        try {
            const response = await httpClient.put(`/api/CVSubmission/statusud/${id}`, {
                status: newStatus,
            });
            if (response.status === 200) {
                const updatedStatusString = statusMap[newStatus] || 'Unknown';
                setApplicantsList((prevList) =>
                    prevList.map((applicant) =>
                        applicant.id === id ? { ...applicant, status: updatedStatusString } : applicant,
                    ),
                );
                showToast('✅ Status updated successfully!', 'success');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            showToast('❌ Failed to update status.', 'error');
        }
    };

    const updateInterviewDate = async (id, date) => {
        try {
            const response = await httpClient.put(`/api/CVSubmission/${id}/interview-date`, {
                interviewDate: date,
            });
            showToast('📅 Đã lưu ngày giờ phỏng vấn.', 'success');
            return true;
        } catch (error) {
            console.error('Lỗi cập nhật ngày phỏng vấn:', error);
            showToast('❌ Lỗi cập nhật ngày giờ phỏng vấn.', 'error');
            return false;
        }
    };

    const filteredApplicants = applicantsList.filter((a) =>
        (a.name + a.email + a.cvFilePath).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div className="feedback-container">
            <h2>📄 Applicants List - {jobName || '...'}</h2>

            <button
                onClick={handleGoBack}
                className="btn-go-back"
                style={{
                    background: '#bae6fd',
                    color: '#0369a1',
                    border: '2px solid white',
                    boxShadow: '0 4px 8px rgba(3, 105, 161, 0.2)',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '2rem',
                    width: 'fit-content',
                    outline: 'none',
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = '#0369a1';
                    e.target.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = '#bae6fd';
                    e.target.style.color = '#0369a1';
                }}
            >
                <i className="fas fa-arrow-left"></i> Back
            </button>

            <div className="search-bar-wrapper">
                <input
                    type="text"
                    placeholder="Search applicants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
            </div>

            <table className="feedback-table">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>CV</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredApplicants.map((applicant) => (
                        <tr key={applicant.id}>
                            <td>{applicant.name}</td>
                            <td>{applicant.email}</td>
                            <td>{applicant.status}</td>
                            <td>
                                <Link to={`/cv/view/${applicant.id}`}>📄 View CV</Link>
                            </td>
                            <td>
                                <div
                                    className="action-buttons"
                                    style={{ display: 'flex', flexDirection: 'row', gap: '8px' }}
                                >
                                    {applicant.status === 'Pending' && (
                                        <>
                                            <button
                                                className="btn-action btn-reply"
                                                title="Approved"
                                                onClick={() => {
                                                    setSelectedApplicant(applicant);
                                                    setIsModalOpen(true);
                                                    setModalStep(1);
                                                    setInterviewDate('');
                                                }}
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: '#007bff',
                                                    border: '0.5px solid #007bff',
                                                }}
                                            >
                                                <i className="fas fa-check-circle"></i>
                                            </button>
                                            <button
                                                className="btn-action btn-delete"
                                                title="Rejected"
                                                onClick={() => {
                                                    setSelectedApplicant(applicant);
                                                    setModalStep(3); // Bước xác nhận Reject
                                                    setIsModalOpen(true);
                                                }}
                                                style={{
                                                    backgroundColor: 'white',
                                                    color: '#dc3545',
                                                    border: '0.5px solid #dc3545',
                                                }}
                                            >
                                                <i className="fas fa-times-circle"></i>
                                            </button>
                                        </>
                                    )}
                                    {applicant.status === 'Approved' && (
                                        <span style={{ color: '#198754', fontWeight: 600 }}>Approved</span>
                                    )}
                                    {applicant.status === 'Rejected' && (
                                        <span style={{ color: '#dc3545', fontWeight: 600 }}>Rejected</span>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {filteredApplicants.length === 0 && (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                                No matching applicants found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Toast Notification */}
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

            {/* Modal */}
            {isModalOpen && selectedApplicant && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10000,
                    }}
                >
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-[400px] max-w-full">
                        {modalStep === 1 && (
                            <>
                                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                    📅 Step 1: Schedule an Interview
                                </h3>
                                <input
                                    type="datetime-local"
                                    value={interviewDate}
                                    onChange={(e) => setInterviewDate(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <div className="flex justify-end gap-3 mt-6">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        ❌ Cancel
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!interviewDate) {
                                                showToast('⚠️ Please select a date and time', 'error');
                                                return;
                                            }
                                            const ok = await updateInterviewDate(selectedApplicant.id, interviewDate);
                                            if (ok) setModalStep(2);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                                    >
                                        ✅ Save and continue
                                    </button>
                                </div>
                            </>
                        )}

                        {modalStep === 2 && (
                            <>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">✅ Step 2: Review CV</h3>
                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to review the CV of{' '}
                                    <strong className="text-blue-600">{selectedApplicant.name}</strong>?
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        ❌ Cancel
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await updateStatus(selectedApplicant.id, 1);
                                            setIsModalOpen(false);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                                    >
                                        👍 Confirm review
                                    </button>
                                </div>
                            </>
                        )}

                        {modalStep === 3 && selectedApplicant && (
                            <>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">⚠️Confirm rejection</h3>
                                <p className="text-gray-600 mb-4">
                                    Are you sure you want to reject the CV of{' '}
                                    <strong className="text-red-600">{selectedApplicant.name}</strong>?
                                </p>
                                <div className="flex justify-end gap-3">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                    >
                                        ❌ Cancel
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await updateStatus(selectedApplicant.id, 2);
                                            setIsModalOpen(false);
                                        }}
                                        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                    >
                                        🚫 Confirm rejection
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CareerApplicants;
