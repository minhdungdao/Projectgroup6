import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TextGradient from '../components/TextGradient';

const AboutUs = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        document.title = 'About Us - XYZ Pharmaceuticals';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div>
            {/* Banner */}
            <section className="bg-gradient-to-r from-blue-100 to-white py-12 mb-10 banner-area">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-extrabold mb-4">
                        <TextGradient>About Us</TextGradient>
                    </h1>
                    <nav className="text-sm text-gray-600">
                        <Link to="/" className="no-underline">
                            Home
                        </Link>
                        <span className="mx-1">|</span>
                        <span className="font-medium">About Us</span>
                    </nav>
                </div>
            </section>

            {/* Welcome Section */}
            <section className="py-10 bg-gray-50">
                <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src="https://media.istockphoto.com/id/2187596922/photo/portrait-of-happy-smiling-healthcare-team-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=dSh2z1lXDPXWDIlplotaQFDJv-krkKx6xATg0n0Ggjg="
                            alt="Medical team"
                            className="w-full h-auto max-h-[500px] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                            onClick={() =>
                                setSelectedImage(
                                    'https://media.istockphoto.com/id/2187596922/photo/portrait-of-happy-smiling-healthcare-team-looking-at-camera.webp?a=1&b=1&s=612x612&w=0&k=20&c=dSh2z1lXDPXWDIlplotaQFDJv-krkKx6xATg0n0Ggjg=',
                                )
                            }
                        />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-gray-800 leading-snug">
                            <TextGradient>Welcome to XYZ Pharmaceuticals</TextGradient>
                        </h2>
                        <p className="text-gray-700 mb-4">
                            XYZ Pharmaceuticals is a leading company in the manufacturing and supply of modern
                            pharmaceutical equipment such as <strong>Encapsulation, Tablet, Liquid Filling</strong>...
                        </p>
                        <p className="text-gray-700 mb-4">
                            We are pioneers in applying automation technology to enhance production efficiency, optimize
                            costs, and meet international standards.
                        </p>
                        <Link
                            to="/career"
                            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition duration-200"
                        >
                            Join our journey
                        </Link>
                    </div>
                </div>
            </section>

            {/* Vision, Mission, Core Values */}
            <section className="container mx-auto px-4 mt-20 mb-20">
                <div className="grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: 'Vision',
                            description:
                                'To become a leading pharmaceutical brand in Vietnam and the region, driven by sustainability and innovation.',
                            image: 'https://datax-talent.basecdn.net/thaiminh/image/vision.jpg',
                        },
                        {
                            title: 'Mission',
                            description:
                                'To deliver high-quality pharmaceutical products that serve public health with dedication and advanced technology.',
                            image: 'https://datax-talent.basecdn.net/thaiminh/image/book.jpg',
                        },
                        {
                            title: 'Core Values',
                            description:
                                'Integrity – Dedication – Innovation – Collaboration – Responsibility – People-Centered.',
                            image: 'https://datax-talent.basecdn.net/thaiminh/image/core-values.jpg',
                        },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-3xl shadow-2xl p-10 text-center hover:shadow-blue-100 transition"
                        >
                            <div className="w-full flex justify-center items-center bg-white rounded-2xl overflow-hidden mb-8 max-h-[32rem]">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full max-h-[32rem] object-contain cursor-pointer hover:scale-105 transition-transform duration-300"
                                    onClick={() => setSelectedImage(item.image)}
                                />
                            </div>
                            <h3 className="text-4xl font-extrabold text-blue-700 mb-4">{item.title}</h3>
                            <p className="text-gray-700 text-xl leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex justify-center items-start bg-black bg-opacity-80 overflow-auto pt-[80px] px-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative bg-white rounded-xl shadow-2xl p-4 max-w-[90vw] max-h-[85vh] overflow-hidden">
                        {/* Nút đóng */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl z-10"
                        >
                            &times;
                        </button>

                        {/* Ảnh */}
                        <img src={selectedImage} alt="Zoom" className="h-[70vh] w-auto object-contain mx-auto" />

                        {/* Nút tải xuống */}
                        <div className="text-center mt-4">
                            <a
                                href={selectedImage}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-white bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            >
                                Dowload Image
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AboutUs;
