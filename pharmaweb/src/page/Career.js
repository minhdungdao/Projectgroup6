import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import httpClient from '../auth/httpClient';
import TextGradient from '../components/TextGradient';

const Career = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        document.title = 'Career';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await httpClient.get('/api/Job/joball');
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

    return (
        <div className="pb-8">
            {/* Banner Section */}
            <section className="banner-area other-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-6xl">
                                <TextGradient>Career</TextGradient>
                            </h1>
                            <div className="flex items-center gap-3 justify-center text-base">
                                <Link to="/">Home</Link> <span>|</span> <Link to="/career">Career</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section Header */}
            <div className="jobs__head section__head text-center py-4 px-3 mt-16 mx-auto" style={{ maxWidth: '600px' }}>
                <h2 className="section--title mb-3 text-5xl">Open Positions</h2>
                <p className="mb-3 text-base">Welcome, energetic young talents! Join our team and grow with us.</p>
            </div>

            {/* Job List */}
            <div id="main-wrap">
                <div className="container my-5">
                    {loading && (
                        <div className="text-center py-5 text-xl">
                            <span>Loading available positions...</span>
                        </div>
                    )}
                    {error && <div className="alert alert-danger text-center">{error}</div>}
                    {!loading && !error && jobs.length === 0 && (
                        <div className="text-center py-5">
                            <span>There are currently no job openings.</span>
                        </div>
                    )}
                    {!loading &&
                        !error &&
                        jobs.map((job) => (
                            <div
                                key={job.id}
                                className="job__item p-4 rounded-lg shadow-sm border-[1.5px] border-solid border-[#d7d7d7] transition-all duration-75 hover:border-blue-300 bg-white d-flex flex-column flex-md-row justify-content-between align-items-start gap-3 mb-4"
                            >
                                <div className="job__content text-start">
                                    <div className="dept fw-bold text-uppercase mb-4 text-primary font-semibold text-lg d-flex">
                                        Job Openings
                                    </div>
                                    <h4 className="job--title mb-2 text-base">
                                        <span className="text-dark text-decoration-none font-medium">
                                            {job.nameJob}
                                        </span>
                                    </h4>
                                    <p className="job--desc mb-2 text-muted d-flex gap-1">
                                        <i className="bi bi-geo-alt-fill me-1" />
                                        <span className="text-decoration-none text-muted text-sm">TH - TM HITECH</span>
                                    </p>
                                    <p className="job--desc mb-0 text-muted d-flex gap-1">
                                        <i className="bi bi-clock me-1" />
                                        {job.createdAt ? new Date(job.createdAt).toLocaleDateString('vi-VN') : ''}
                                    </p>
                                </div>
                                <div className="job__button mt-3 mt-md-0">
                                    <Link
                                        to={`/jobapplication/${job.id}`}
                                        className="template-btn mt-3 rounded-md font-medium "
                                    >
                                        Apply Now
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Career;
