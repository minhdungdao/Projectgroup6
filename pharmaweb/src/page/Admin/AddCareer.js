import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import httpClient from '../../auth/httpClient';

const AddCareer = () => {
    const { id } = useParams();
    const [position, setPosition] = useState('');
    const [description, setDescription] = useState('');
    const [toast, setToast] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchJob = async () => {
            if (id) {
                try {
                    const res = await httpClient.get(`/api/Job/calljob/${id}`);
                    const job = res.data;
                    setPosition(job.nameJob);
                    setDescription(job.description);
                } catch (err) {
                    console.error('Error loading job:', err);
                    showToast('❌ Unable to load job data for editing.', 'error');
                }
            }
        };
        fetchJob();
    }, [id]);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => {
            setToast({ message: '', type: '' });
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jobData = {
            nameJob: position,
            description: description,
        };

        try {
            if (id) {
                await httpClient.put(`/api/Job/edit/${id}`, jobData);
                showToast('✅ Job updated successfully!', 'success');
            } else {
                await httpClient.post('/api/Job/create', jobData);
                showToast('🎉 Career opportunity added successfully!', 'success');
            }

            setTimeout(() => {
                window.history.back();
            }, 1000);
        } catch (error) {
            console.error('Error saving job:', error);
            showToast('❌ Operation failed. Please try again!', 'error');
        }
    };

    const handleGoBack = () => {
        window.history.back();
    };

    return (
        <div
            style={{
                maxWidth: '720px',
                margin: '3rem auto',
                padding: '3rem 2.5rem',
                borderRadius: '20px',
                background: '#fff',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.1)',
                position: 'relative',
            }}
        >
            <h2
                style={{
                    fontWeight: 700,
                    fontSize: '2rem',
                    marginBottom: '2.5rem',
                    color: '#0369a1',
                    textAlign: 'center',
                }}
            >
                {id ? 'Edit Career Opportunity' : 'Add Career Opportunity'}
            </h2>

            <button
                type="button"
                onClick={handleGoBack}
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
                <i className="fas fa-arrow-left"></i> Go Back
            </button>

            <form onSubmit={handleSubmit}>
                {/* Position */}
                <div style={{ marginBottom: '1.8rem' }}>
                    <label style={labelStyle}>Job Position</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Enter job position"
                        required
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.border = '1.5px solid #0369a1')}
                        onBlur={(e) => (e.target.style.border = '1.5px solid #e2e8f0')}
                    />
                </div>

                {/* Description */}
                <div style={{ marginBottom: '2rem' }}>
                    <label style={labelStyle}>Job Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Enter job description"
                        required
                        rows="6"
                        style={{
                            ...inputStyle,
                            resize: 'vertical',
                        }}
                        onFocus={(e) => (e.target.style.border = '1.5px solid #0369a1')}
                        onBlur={(e) => (e.target.style.border = '1.5px solid #e2e8f0')}
                    ></textarea>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <button
                        type="submit"
                        style={submitButtonStyle}
                        onMouseEnter={(e) => {
                            e.target.style.background = '#0369a1';
                            e.target.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = '#bae6fd';
                            e.target.style.color = '#0369a1';
                        }}
                    >
                        <i className="fas fa-save" style={{ marginRight: '5px' }}></i>
                        {id ? 'Save Changes' : 'Add Opportunity'}
                    </button>
                </div>
            </form>

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
        </div>
    );
};

const labelStyle = {
    fontWeight: 600,
    color: '#1e293b',
    marginBottom: '0.6rem',
    display: 'block',
    fontSize: '1.1rem',
};

const inputStyle = {
    padding: '16px',
    fontSize: '1.1rem',
    borderRadius: '10px',
    border: '1.5px solid #e2e8f0',
    backgroundColor: '#f8fafc',
    width: '100%',
    outline: 'none',
};

const backButtonStyle = {
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
};

const submitButtonStyle = {
    background: '#bae6fd',
    color: '#0369a1',
    border: '2px solid white',
    boxShadow: '0 4px 8px rgba(3, 105, 161, 0.2)',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
};

export default AddCareer;
