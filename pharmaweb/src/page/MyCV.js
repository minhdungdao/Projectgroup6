import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../auth/httpClient';
import TextGradient from '../components/TextGradient';
import { VscFilePdf } from 'react-icons/vsc';
import { useAuthData } from '../stores';
import dayjs from 'dayjs';

const MyCV = () => {
    const [jobs, setJobs] = useState([]);
    const [mycv, setMycv] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authData } = useAuthData();

    useEffect(() => {
        document.title = 'MyCV';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await httpClient.get('/api/Job/getall');
                // axios trả data trong response.data
                setJobs(response.data.filter((job) => !job.isDeleted));
            } catch (err) {
                setError(err.response?.data || err.message || 'Đã xảy ra lỗi');
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    console.log(authData?.data?.id);
    useEffect(() => {
        const fetchMyCV = async () => {
            if (authData?.data?.id) {
                try {
                    const response = await httpClient.get(`/api/CVSubmission/candidate/${authData?.data?.id}`);
                    // axios trả data trong response.data
                    setMycv(response.data);
                } catch (err) {
                    setError(err.response?.data || err.message || 'Đã xảy ra lỗi');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMyCV();
    }, [authData]);

    return (
        <div className="pb-8">
            {/* Banner Section */}
            <section className="banner-area other-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-6xl">
                                <TextGradient>My CV</TextGradient>
                            </h1>
                            <div className="flex items-center gap-3 justify-center text-base">
                                <Link to="/">Home</Link> <span>|</span> <Link to="/career">Career</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex gap-8 bg-white p-8">
                <div>
                    <div
                        className="jobs__head section__head text-center px-3 mt-8 mx-auto flex items-center justify-center"
                        style={{ width: '480px' }}
                    >
                        <h2 className="section--title mb-3 text-xl max-w-[220px] text-center">Recommended Jobs</h2>
                    </div>
                    <div id="main-wrap">
                        <div className="container my-5">
                            {loading && (
                                <div className="text-center py-5 text-xl">
                                    <span>Loading job list...</span>
                                </div>
                            )}
                            {error && <div className="alert alert-danger text-center">{error}</div>}
                            {!loading && !error && jobs.length === 0 && (
                                <div className="text-center py-5">
                                    <span>No job openings at the moment.</span>
                                </div>
                            )}
                            {!loading &&
                                !error &&
                                jobs.map((job) => (
                                    <div
                                        key={job.id}
                                        className="job__item p-3 rounded-lg shadow-sm border-[1.5px] border-solid border-[#f2f3f5] transition-all duration-75 hover:border-blue-300 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-3"
                                    >
                                        <div className="job__content text-start">
                                            <div className="dept fw-bold text-uppercase mb-4 text-primary font-semibold text-sm d-flex">
                                                Job Openings
                                            </div>
                                            <h4 className="job--title mb-2 text-sm">
                                                <span className="text-dark text-decoration-none font-medium">
                                                    {job.nameJob}
                                                </span>
                                            </h4>
                                            <p className="job--desc mb-2 text-muted d-flex gap-1">
                                                <i className="bi bi-geo-alt-fill me-1" />
                                                <span className="text-decoration-none text-muted text-xs">
                                                    TH - TM HITECH
                                                </span>
                                            </p>
                                            <p className="job--desc mb-0 text-muted d-flex gap-1 text-xs">
                                                <i className="bi bi-clock me-1" />
                                                {job.createdAt
                                                    ? new Date(job.createdAt).toLocaleDateString('vi-VN')
                                                    : ''}
                                            </p>
                                        </div>
                                        <div className="job__button mt-3 mt-md-0">
                                            <Link
                                                to={`/jobapplication/${job.id}`}
                                                className="template-btn mt-3 rounded-md font-medium px-2"
                                            >
                                                Apply Now
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1 p-5 border-[1.5px] rounded-md border-solid border-blue-200">
                    <h3 className="font-medium text-xl">
                        <TextGradient>Jobs You Have Applied For</TextGradient>
                    </h3>
                    <div className="flex flex-col gap-3">
                        {mycv?.map((item) => (
                            <div
                                key={item.id}
                                className="shadow-sm hover:shadow-md p-4 rounded-md border-[1.5px] border-solid border-blue-100 flex items-center justify-between"
                            >
                                <div className="flex flex-col gap-2 items-start">
                                    <h6 className="m-0 p-0 font-semibold text-base">{item.jobName} </h6>
                                    <p className="m-0 p-0">Email: {item.email}</p>
                                    <p className="m-0 p-0">
                                        Application Date: {dayjs(item.submittedAt).format('DD/MM/YYYY HH:mm')}
                                    </p>
                                    <p className="flex items-center gap-3">
                                        Job Application CV:{' '}
                                        <a
                                            target="_blank"
                                            href={`https://localhost:5194/${item.cvFilePath}`}
                                            className="flex items-center gap-2"
                                        >
                                            {' '}
                                            <span className="flex items-center justify-center">
                                                <VscFilePdf className="text-xl" />
                                            </span>
                                            View Cv
                                        </a>
                                    </p>
                                </div>
                                {item.status === 'Rejected' ? (
                                    <p className="mt-3 text-white px-4 py-2.5 rounded-md font-medium uppercase text-xs bg-red-500">
                                        Rejected
                                    </p>
                                ) : item.status === 'Approved' ? (
                                    <p className="mt-3 text-white px-4 py-2.5 rounded-md font-medium uppercase text-xs bg-green-500">
                                        Approved
                                    </p>
                                ) : (
                                    <p className="mt-3 text-white px-4 py-2.5 rounded-md font-medium uppercase text-xs bg-blue-500">
                                        Pending
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyCV;
