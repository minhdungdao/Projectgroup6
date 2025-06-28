import { useEffect, useState } from 'react';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import TextGradient from '../components/TextGradient';
import httpClient from '../auth/httpClient';
import { FaStar } from 'react-icons/fa';
import '../assets/sass/module/Quote.scss';
import quoteService from '../services/quoteService';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

const QuoteUs = () => {
    useEffect(() => {
        document.title = 'Quote US';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);
    const location = useLocation();
    const [feedbacks, setFeedback] = useState([]);

    const handleGetFeedback = async () => {
        try {
            const response = await quoteService.getFeedback();
            if (response.data) {
                setFeedback(response.data);
            }
        } catch (err) {
            console.error(err);
            toast.error('Lỗi khi lấy dữ liệu máy');
        }
    };

    useEffect(() => {
        handleGetFeedback();
    }, []);

    // Parse the query string
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;

            if (type === 'tablet') {
                response = await httpClient.get('/api/Quote/tablet', {
                    responseType: 'blob', // 👈 Quan trọng để nhận dữ liệu nhị phân
                });
            } else if (type === 'liquidfilling') {
                response = await httpClient.get('/api/Quote/liquid', {
                    responseType: 'blob',
                });
            } else {
                response = await httpClient.get('/api/Quote/pdf', {
                    responseType: 'blob',
                });
            }

            // Tạo URL từ blob
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const downloadUrl = window.URL.createObjectURL(blob);

            // Tạo thẻ a và click để tải
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = 'quote.pdf'; // 👈 Tên file tải về
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl); // Dọn dẹp
        } catch (err) {
            console.error('Lỗi tải file PDF:', err);
            toast.error('Lỗi tải file PDF');
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await quoteService.createFeedback(data);

            if (response.data) {
                handleGetFeedback();
                form.reset();
                toast.success('Feedback submitted successfully!');
            }
        } catch (err) {
            console.error(err);
            toast.error('Your IP has been blocked for 15 minutes due to spam');
        }
    };

    return (
        <div>
            <section className="banner-area other-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1 className="text-6xl">
                                <TextGradient>Quote Us</TextGradient>
                            </h1>
                            <div className="flex items-center justify-center gap-3 text-base">
                                <Link to="/">Home</Link> <span>|</span> <Link to="/quoteus">Quote Us</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section
                className="quote section px-4"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingBottom: '4rem',
                    paddingTop: '12rem',
                    minHeight: '60vh',
                    backgroundColor: '#fff',
                }}
            >
                <form
                    className="quote-form max-w-[967px] border-[2px] border-solid border-blue-200"
                    style={{
                        background: '#ffffff',
                        borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                        padding: '3rem 2.5rem',
                        maxWidth: '640px',
                        width: '100%',
                    }}
                    onSubmit={handleSubmit}
                >
                    <h2
                        style={{
                            fontWeight: 600,
                            fontSize: '1.75rem',
                            marginBottom: '48px',
                            color: '#1f2937',
                            textAlign: 'center',
                            opacity: 0.9,
                        }}
                    >
                        Get a Quote Now
                    </h2>

                    {/* Input Field Group */}
                    {[
                        { placeholder: 'Full name', type: 'text', required: true },
                        { placeholder: 'Company name', type: 'text' },
                        // { placeholder: 'Địa chỉ', type: 'text' },
                        { placeholder: 'Email address', type: 'email', required: true },
                        // { placeholder: 'Số điện thoại', type: 'tel' },
                    ].map((field, i) => (
                        <div className="mb-3 flex flex-col items-start" key={i}>
                            <label className="mb-1 flex items-center gap-2">
                                {field.placeholder}

                                {field.required && <span style={{ color: 'red', opacity: 0.9 }}>*</span>}
                            </label>
                            <input
                                type={field.type}
                                placeholder={`Enter ${field.placeholder.toLowerCase()}`}
                                required={field.required}
                                className="form-control shadow-none focus:border-blue-400 border-[1.5px] border-solid border-[#d7d7d7]"
                                style={{
                                    height: '44px',
                                    borderRadius: '6px',
                                    border: '1px solid #d1d5db',
                                    padding: '0 12px',
                                    fontSize: '1rem',
                                    width: '100%',
                                    outline: 'none',
                                }}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="template-btn"
                        style={{
                            backgroundColor: '#3b82f6',
                            color: 'white',
                            padding: '12px 20px',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            width: '100%',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
                        onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
                    >
                        Request a Quote
                    </button>
                </form>
            </section>

            <section className="flex items-center w-full justify-center"></section>

            <section className="flex items-center w-full justify-center">
                <div className={'container-form-rate w-[1280px] rounded-lg p-8'}>
                    <div>
                        <h2 className={'form-heading-rate text-3xl'}>Customer Feedback</h2>
                        <div className="bg-white rounded-lg p-6 flex flex-col gap-5">
                            {feedbacks.length > 0 ? (
                                feedbacks.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col gap-4 items-start border border-solid border-blue-300 p-3 rounded"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex size-[42px]">
                                                <img
                                                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740"
                                                    alt="avatar user"
                                                    className="size-full rounded-full"
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <h5 className="text-base m-0 p-0 text-left font-semibold">
                                                    {item.name}
                                                </h5>
                                                <p className="m-0 p-0">
                                                    {dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-base pl-3">{item.comments}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No customer feedback available</p>
                            )}
                        </div>
                    </div>
                    <h2 className={'form-heading-rate mt-12 text-3xl'}>Leave your feedback</h2>
                    <form action="" className="p-4" onSubmit={handleSubmitComment}>
                        <div style={{}}>
                            <p style={{ fontSize: '16px', marginBottom: '6px' }}>Your rating</p>
                            <div className="flex items-center gap-3 justify-center">
                                <span className="flex items-center justify-center text-xl text-yellow-400">
                                    <FaStar />
                                </span>
                                <span className="flex items-center justify-center text-xl text-yellow-400">
                                    <FaStar />
                                </span>
                                <span className="flex items-center justify-center text-xl text-yellow-400">
                                    <FaStar />
                                </span>
                                <span className="flex items-center justify-center text-xl text-yellow-400">
                                    <FaStar />
                                </span>
                                <span className="flex items-center justify-center text-xl text-yellow-400">
                                    <FaStar />
                                </span>
                            </div>
                        </div>

                        <div className={'form-item flex flex-col items-start'}>
                            <label htmlFor="name" className="text-base flex items-center gap-3">
                                Name <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                            </label>
                            <input
                                id="name"
                                required
                                name="name"
                                type="text"
                                placeholder="Your name..."
                                s
                                className="focus:border-blue-400"
                            />
                        </div>
                        <div className={'form-item flex flex-col items-start'}>
                            <label htmlFor="email" className="text-base flex items-center gap-3">
                                Email <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                            </label>
                            <input
                                id="email"
                                required
                                name="email"
                                type="email"
                                placeholder="Your name..."
                                className="focus:border-blue-400 w-full h-[46px]"
                            />
                        </div>
                        <div className={'form-item flex flex-col items-start'}>
                            <label htmlFor="Phone" className="text-base flex items-center gap-3">
                                Phone number <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                            </label>
                            <input
                                id="Phone"
                                required
                                name="phoneNumber"
                                type="text"
                                placeholder="Phone number..."
                                className="focus:border-blue-400"
                            />
                        </div>
                        <div style={{ paddingTop: '12px' }} className="flex flex-col items-start">
                            <p
                                style={{ fontSize: '15px', marginBottom: '4px' }}
                                className="text-base flex items-center gap-3"
                            >
                                Comment <span style={{ color: 'red', opacity: 0.8 }}>*</span>
                            </p>
                            <textarea
                                name="comments"
                                id="des"
                                required
                                style={{
                                    width: '100%',
                                    height: 96,
                                    border: '1px solid #d7d7d7',
                                    outline: 'none',
                                    padding: '8px 8px 8px 12px',
                                    borderRadius: '4px',
                                }}
                                placeholder="Aa..."
                                className="focus:border-blue-400"
                            ></textarea>
                        </div>
                        <button className={'submit-rate'} type="submit">
                            Send
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default QuoteUs;
