import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer
            className="text-white"
            style={{
                background: 'linear-gradient(90deg, #2e5bff 0%, #15c7ff 100%)',
                padding: '40px 20px',
                marginTop: 'auto',
            }}
        >
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                {/* Điều hướng */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Navigation</h2>
                    <div className="grid grid-cols-2 gap-x-4 justify-center">
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-white hover:underline">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/aboutus" className="text-white hover:underline">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/product" className="text-white hover:underline">
                                    Product
                                </Link>
                            </li>
                        </ul>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/quoteus" className="text-white hover:underline">
                                    Quote Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/career" className="text-white hover:underline">
                                    Career
                                </Link>
                            </li>
                            <li>
                                <Link to="/contactus" className="text-white hover:underline">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Thông tin công ty */}
                <div>
                    <h2 className="text-xl font-bold mb-4">VitaPharma</h2>
                    <p className="mb-2 flex items-center justify-center gap-2">
                        <MapPin size={18} /> 123 Đường ABC, Hai Ba Trung, Ha Noi
                    </p>
                    <p className="mb-2 flex items-center justify-center gap-2">
                        <Mail size={18} /> contact@vitapharma.vn
                    </p>
                    <p className="mb-4 flex items-center justify-center gap-2">
                        <Phone size={18} /> 0123 456 789
                    </p>

                    {/* Mạng xã hội */}
                    <div className="flex justify-center space-x-4 mt-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300"
                        >
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300"
                        >
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a
                            href="https://youtube.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-gray-300"
                        >
                            <i className="fab fa-youtube"></i>
                        </a>
                        <a href="/contactus" className="text-white hover:text-gray-300">
                            <i className="far fa-comment-dots"></i>
                        </a>
                    </div>
                </div>

                {/* Bản đồ */}
                <div>
                    <h2 className="text-xl font-bold mb-4">Map</h2>
                    <div className="w-full h-48 rounded overflow-hidden shadow-lg mx-auto">
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4421832468655!2d106.70042397480543!3d10.77637765926116!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4693148e4b%3A0x9ba39c264f9096b5!2zQ2hvw6AgTmfhu41jIEPhuqd1IFTDom4gVGjGsMahbmc!5e0!3m2!1svi!2s!4v1611734172066!5m2!1svi!2s"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>

            <div className="text-center mt-8 text-sm opacity-90">
                © {new Date().getFullYear()} VitaPharma. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
