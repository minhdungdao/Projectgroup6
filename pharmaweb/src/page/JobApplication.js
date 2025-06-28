import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import httpClient from '../auth/httpClient';
import TextGradient from '../components/TextGradient';
import { useAuthData } from '../stores';
import careerService from '../services/careerService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const JobApplication = () => {
    const navigate = useNavigate(); // Khởi tạo biến navigate
    const { jobId } = useParams(); // lấy id từ URL, ví dụ /jobapplication/1
    const [jobDetail, setJobDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authData } = useAuthData();

    useEffect(() => {
        document.title = 'Job Application';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchJobDetail = async () => {
            try {
                setLoading(true);
                const response = await httpClient.get(`/api/Job/calljob/${jobId}`);
                setJobDetail(response.data);
            } catch (err) {
                setError('Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        if (jobId) {
            fetchJobDetail();
        }
    }, [jobId]);

    if (loading) return <div>Loading job details...</div>;
    if (error) return <div>{error}</div>;
    if (!jobDetail) return <div>Job not found.</div>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            await careerService.apply({
                JobId: jobId,
                Name: data.Name,
                Email: data.Email,
                CVFile: data.CVFile,
                CandidateId: authData?.data?.id,
            });

            form.reset();
            toast.success('Thank you! Weve received your CV and sent you a confirmation email.');
        } catch (err) {
            console.error(err);
            toast.error('You may not be logged in or there was a system error. Please log in again.');
            setTimeout(() => {
                navigate('/login');
            }, 4500); // đợi 2 giây trước khi chuyển hướng
        }
    };

    return (
        <div>
            <section className="banner-area other-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-6xl">
                                <TextGradient>Apply CV</TextGradient>
                            </h1>
                            <div className="flex items-center justify-center gap-3 text-base">
                                <Link to="/">Home</Link> <span>|</span> <Link to="/career">Career</Link>
                                <span>|</span> <Link to="">Apply CV</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="d-flex px-8 py-10 gap-6">
                <div
                    className="content-article bg-white rounded-lg p-6 border-[1.5px] border-solid border-blue-300"
                    style={{ textAlign: 'left' }}
                >
                    <h2 className="text-xl">Job Details</h2>
                    <div className="detail-article">
                        <p>
                            <strong>1.Job Information:</strong>
                        </p>
                        <p className="mb-1">Job Title: {jobDetail.nameJob}</p>

                        <p className="">Address: Hoa Lac Hi-Tech Park, Thach Hoa, Thach That, Hanoi</p>

                        <p>
                            <strong>2.Job Description:</strong>
                        </p>
                        <p className="mb-1">{jobDetail.description}</p>
                        <p>
                            <strong>Start Date: {new Date(jobDetail.createdAt).toLocaleDateString('vi-VN')}</strong>
                        </p>
                        <p></p>

                        <p>
                            <strong>5. Application process</strong>
                        </p>
                        <p className="mb-1">Applicants submit their applications online via this website.</p>
                        <p className="mb-1">
                            Or send your CV to the email address:{' '}
                            <a href="mailto:vpm.nmt@gmail.com">vpm.nmt@gmail.com</a>
                        </p>
                        <p className="mb-1">Contact phone number: Mr.TomTom - 098.1837.295</p>
                        <p>Hola Park, Hoa Lac Hi-Tech Park, Km29 Thang Long, Thach Hoa, Thach That, Hanoi, Vietnam.</p>
                    </div>

                    {/* Đưa form ra ngoài, cho nó chiếm toàn bộ chiều rộng bên phải */}
                </div>
                <div
                    id="appform"
                    style={{
                        width: '100%',
                        maxWidth: '100%',
                        background: '#fff',
                        padding: '40px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                    className="rounded-lg border-[1.5px] border-solid border-blue-300 shadow-lg"
                >
                    <div style={{ width: '100%' }}>
                        <h1
                            style={{
                                textAlign: 'center',
                                marginBottom: '32px',
                                fontSize: '32px',
                                fontWeight: 700,
                                letterSpacing: 1,
                            }}
                            className="text-2xl"
                        >
                            Apply For This Job
                        </h1>
                        <div className="form" style={{ width: '100%' }}>
                            <form
                                method="POST"
                                encType="multipart/form-data"
                                action="apply"
                                style={{
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '24px',
                                }}
                                onSubmit={handleSubmit}
                            >
                                <input type="hidden" name="utm_source" id="f-utm-source" />
                                <input type="hidden" name="utm_medium" id="f-utm-medium" />
                                <input type="hidden" name="utm_campaign" id="f-utm-campaign" />
                                <input type="hidden" name="utm_content" id="f-utm-content" />
                                <input type="hidden" name="utm_term" id="f-utm-term" />
                                <input type="hidden" name="referral_id" id="f-referral-id" />
                                <input type="hidden" name="job_id" defaultValue={8536} />
                                <input type="hidden" name="token" defaultValue="VMV9Y758H4NRD5B3Q5F72EK58H35WQCF" />
                                <input type="hidden" name="sig" defaultValue="3e44a4862afa5e786e1f992b200395a1" />
                                <input
                                    type="hidden"
                                    name="redirect_uri"
                                    defaultValue="https://thaiminh.talent.vn/careers/apply/8536"
                                />
                                <input type="hidden" name="response_type" defaultValue="uri" />

                                <div>
                                    <label
                                        className="label d-flex"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Full Name <span style={{ color: 'red', marginLeft: '6px' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="Name"
                                        placeholder="Enter Full Name"
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid #d7d7d7',
                                            fontSize: '1rem',
                                        }}
                                        className="text-base focus:border-blue-400 transition-all duration-75"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="label d-flex"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Email <span style={{ color: 'red', marginLeft: '6px' }}>*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="Email"
                                        required
                                        placeholder="Enter Email Address"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid #d7d7d7',
                                            fontSize: '1rem',
                                        }}
                                        className="text-base focus:border-blue-400 transition-all duration-75"
                                    />
                                </div>

                                <input data-cid="offices" type="hidden" name="offices" defaultValue="" />

                                <div>
                                    <label
                                        className="label d-flex"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        Phone Number <span style={{ color: 'red', marginLeft: '6px' }}>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        required
                                        placeholder="Enter Phone Number"
                                        style={{
                                            width: '100%',
                                            padding: '10px 12px',
                                            borderRadius: '6px',
                                            border: '1px solid #d7d7d7',
                                            fontSize: '1rem',
                                        }}
                                        className="text-base focus:border-blue-400 transition-all duration-75"
                                    />
                                </div>

                                <div>
                                    <label
                                        className="label d-flex"
                                        style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 500,
                                            fontSize: '1rem',
                                        }}
                                    >
                                        CV File <span style={{ color: 'red', marginLeft: '6px' }}>*</span>
                                    </label>
                                    <input
                                        type="file"
                                        name="CVFile"
                                        required
                                        accept="application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*"
                                        style={{
                                            display: 'block',
                                            fontSize: '1rem',
                                            padding: '8px 0',
                                        }}
                                    />
                                </div>

                                <div style={{ textAlign: 'center', marginTop: '16px' }}>
                                    <button
                                        type="submit"
                                        className="template-btn"
                                        style={{
                                            background: 'linear-gradient(90deg, #4d65f9 0%, #0dcaf0 100%)',
                                            color: '#fff',
                                            fontWeight: 500,
                                            fontSize: '14px',
                                            border: 'none',
                                            borderRadius: '6px',
                                            padding: '14px 48px',
                                            boxShadow: 'none',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                        }}
                                    >
                                        Submit Application
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default JobApplication;
