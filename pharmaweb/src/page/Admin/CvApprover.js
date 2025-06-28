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
    const [isModalOpen] = useState(false);
    const [selectedApplicant] = useState(null);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast({ message: '', type: '' });
        }, 3000);
    };

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                const response = await httpClient.get(`/api/CVSubmission/job/${jobId}/approved`);
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

    const filteredApplicants = applicantsList.filter((a) =>
        (a.name + a.email + a.cvFilePath).toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const handleGoBack = () => {
        window.history.back();
    };
    const formatDateTime = (dateTimeString) => {
        if (!dateTimeString) return 'N/A';
        const date = new Date(dateTimeString);
        return date.toLocaleString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="feedback-container">
            <h2>Approver Cv - {jobName || '...'}</h2>

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
                        <th>Interview Date</th>
                        <th>Interview Confirm</th>
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
                            <td>{formatDateTime(applicant.interviewDate)}</td>
                            <td>
                                {applicant.isInterviewConfirmed ? (
                                    <span
                                        style={{
                                            backgroundColor: '#22c55e',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Confirmed
                                    </span>
                                ) : (
                                    <span
                                        style={{
                                            backgroundColor: '#9ca3af',
                                            color: 'white',
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            fontWeight: 600,
                                        }}
                                    >
                                        Unconfirmed
                                    </span>
                                )}
                            </td>
                        </tr>
                    ))}
                    {filteredApplicants.length === 0 && (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', padding: '1rem' }}>
                                No applicants in the jobs have been approved.
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
                ></div>
            )}
        </div>
    );
};

export default CareerApplicants;
