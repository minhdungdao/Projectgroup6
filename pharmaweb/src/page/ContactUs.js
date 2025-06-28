import { useEffect, useState } from 'react';
import httpClient from '../auth/httpClient';
import { Link } from 'react-router-dom';
import TextGradient from '../components/TextGradient';
import { toast } from 'react-toastify';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        comments: '',
        email: '', // Chỉ hiển thị nhưng không gửi
    });

    const [message, setMessage] = useState('');

    useEffect(() => {
        document.title = 'Contact US';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, phoneNumber, comments } = formData;

        try {
            const res = await httpClient.post('/api/Feedbacks', {
                name,
                phoneNumber,
                comments,
            });

            if (res.status === 201) {
                setMessage('✅ Gửi phản hồi thành công!');
                setFormData({ name: '', phoneNumber: '', comments: '', email: '' });
            }
        } catch (err) {
            setMessage('❌ Gửi phản hồi thất bại. Vui lòng thử lại.');
            console.error(err);
            toast.error('Gửi phản hồi thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="pb-8 bg-slate-100">
            <section className="banner-area other-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-6xl">
                                <TextGradient>Contact</TextGradient>
                            </h1>
                            <div className="flex items-center justify-center gap-3 text-base">
                                <Link to="/">Home</Link> <span>|</span> <Link to="/contact">Contact</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Phần form & bản đồ */}
            <section
                className="contact-map-form mt-8 rounded-lg shadow-2xl"
                style={{ margin: '0 32px', padding: '24px' }}
            >
                <div className="container-fluid">
                    <div className="flex gap-8">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4005.097592005556!2d105.7443518755585!3d21.03796348061365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455305afd834b%3A0x17268e09af37081e!2sT%C3%B2a%20nh%C3%A0%20FPT%20Polytechnic.!5e1!3m2!1svi!2s!4v1749224925666!5m2!1svi!2s"
                            width="1000"
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* Form liên hệ */}
                        <div className="col-lg-6 col-12" style={{ paddingLefts: '15px' }}>
                            <section className="contact-form pb-[72px]">
                                <div className="mb-4">
                                    <div className="d-flex mb-4 items-center">
                                        <div className="text-xl mr-3">
                                            <i className="fa fa-home" />
                                        </div>
                                        <div className="flex items-start flex-col">
                                            <h3 className="text-xl font-medium m-0">123 ABC, Hai Ba Trung, Ha Noi</h3>
                                            <p className="m-0">Santa Monica Bullevard</p>
                                        </div>
                                    </div>

                                    <div className="d-flex mb-4 items-center">
                                        <div className="text-xl mr-3">
                                            <i className="fa fa-phone" />
                                        </div>
                                        <div className="flex items-start flex-col">
                                            <h3 className="text-xl font-medium m-0">(+84) 9865 56295</h3>
                                            <p className="m-0">Monday to Friday, 9:00 AM – 6:00 PM</p>
                                        </div>
                                    </div>

                                    <div className="d-flex mb-4 items-center">
                                        <div className="text-xl mr-3">
                                            <i className="fas fa-envelope"></i>
                                        </div>
                                        <div className="flex items-start flex-col">
                                            <h3 className="text-xl font-medium m-0">vpm.nmt@gmail.com</h3>
                                            <p className="m-0">Feel free to send us your questions anytime!</p>
                                        </div>
                                    </div>
                                </div>

                                {/* <form onSubmit={handleSubmit}>
                                    <div className="mb-3 flex flex-col items-start">
                                        <label className="mb-1 flex items-center gap-2">
                                            Tên của bạn <span style={{ color: 'red', opacity: 0.9 }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Nhập tên của bạn"
                                            className="form-control h-[44px] shadow-none"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3 flex flex-col items-start">
                                        <label className="mb-1">Địa chỉ email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Nhập địa chỉ email"
                                            className="form-control h-[44px] shadow-none"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3 flex flex-col items-start">
                                        <label className="mb-1 flex items-center gap-2">
                                            Số điện thoại <span style={{ color: 'red', opacity: 0.9 }}>*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="Nhập số điện thoại"
                                            className="form-control h-[44px] shadow-none"
                                            required
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="mb-3 flex flex-col items-start">
                                        <label className="mb-1 flex items-center gap-2">
                                            Tin nhắn <span style={{ color: 'red', opacity: 0.9 }}>*</span>
                                        </label>
                                        <textarea
                                            name="comments"
                                            rows={5}
                                            placeholder="Nhập tin nhắn"
                                            className="form-control shrink-0 flex-1 shadow-none"
                                            required
                                            value={formData.comments}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="template-btn rounded-md text-base font-medium min-w-[120px]"
                                    >
                                        Gửi
                                    </button>
                                </form> */}

                                {message && (
                                    <div style={{ marginTop: '1rem', color: message.includes('✅') ? 'green' : 'red' }}>
                                        {message}
                                    </div>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactUs;
