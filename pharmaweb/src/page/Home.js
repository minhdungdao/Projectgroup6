import img1 from '../assets/images/feature1.png';
import img2 from '../assets/images/feature2.png';
import img3 from '../assets/images/feature3.png';
import img4 from '../assets/images/feature4.png';
import img5 from '../assets/images/welcome.png';
import { Link } from 'react-router-dom';
import TextGradient from '../components/TextGradient';
import Similar from '../components/SideList';
import { useEffect } from 'react';

const Home = () => {
    useEffect(() => {
        document.title = 'Home';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <section className="banner-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 flex flex-col gap-4">
                            <h4 data-aos="fade-up" data-aos-duration="800" className="text-base">
                                Comprehensive healthcare
                            </h4>
                            <h1 data-aos="fade-up" data-aos-duration="1000" className="text-6xl">
                                <TextGradient>Leading in pharma equipment tech</TextGradient>
                            </h1>
                            <p data-aos="fade-up" data-aos-duration="800" className="text-base">
                                XYZ Company specializes in providing modern machinery solutions for the pharmaceutical
                                industry, supporting efficient and safe production processes.
                            </p>
                            <Link
                                data-aos="fade-right"
                                data-aos-duration="1200"
                                to="/contactus"
                                className="template-btn mt-3 rounded-full text-base font-medium"
                            >
                                Contact Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="feature-area section-padding">
                <div className="px-12">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="col-span-1" data-aos="flip-left" data-aos-duration="2000">
                            <div className="single-feature rounded-lg hover:translate-y-[-8px] transition-all text-center item-padding">
                                <img src={img1} alt="Công nghệ tiên tiến" />
                                <h3>Advanced technology</h3>
                                <p className="pt-3">
                                    Applying modern technology to improve productivity and product quality.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1" data-aos="flip-right" data-aos-duration="1500">
                            <div className="single-feature rounded-lg hover:translate-y-[-8px] transition-all text-center item-padding mt-4 mt-md-0">
                                <img src={img2} alt="Thiết bị chất lượng" />
                                <h3>Quality equipment</h3>
                                <p className="pt-3">
                                    Our machinery is rigorously tested to ensure durability and safety in use.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1" data-aos="flip-up" data-aos-duration="1500">
                            <div className="single-feature rounded-lg hover:translate-y-[-8px] transition-all text-center item-padding mt-4 mt-lg-0">
                                <img src={img3} alt="Đội ngũ chuyên nghiệp" />
                                <h3>Professional team</h3>
                                <p className="pt-3">
                                    Our technical and customer support team is dedicated and highly experienced in the
                                    industry.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1" data-aos="flip-down" data-aos-duration="2000">
                            <div className="single-feature rounded-lg hover:translate-y-[-8px] transition-all text-center item-padding mt-4 mt-lg-0">
                                <img src={img4} alt="Dịch vụ hậu mãi" />
                                <h3>After-sales service</h3>
                                <p className="pt-3">
                                    We are committed to fast maintenance and technical support to ensure uninterrupted
                                    operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="h-[220px] w-full overflow-hidden flex">
                <img
                    src="https://trityenviro.com/assets/blogs/importance-of-pharmaceutical-industry-effluent-treatment-plants.jpg"
                    className="size-full object-cover rounded"
                    alt="preview"
                />
            </div>

            {/* Welcome */}
            <section className="welcome-area section-padding3">
                <div className="container">
                    <div data-aos="zoom-in" data-aos-duration="1000" className="flex items-center gap-8">
                        <div className="col-lg-5 align-self-center px-0">
                            <div className="welcome-img">
                                <img src={img5} alt="Giới thiệu công ty" className="rounded-lg" />
                            </div>
                        </div>
                        <div className="col-lg-7 px-0">
                            <div className="welcome-text mt-5 mt-lg-0 flex flex-col gap-6 items-center justify-center">
                                <h2 className="max-w-[390px] text-5xl leading-[56px]">
                                    <TextGradient>Welcome to XYZ Company</TextGradient>
                                </h2>
                                <p className="m-0 text-base text-grey-600">
                                    With years of experience in the pharmaceutical industry, we take pride in being a
                                    trusted partner providing high-quality manufacturing equipment that meets
                                    international standards.
                                </p>
                                <p className="m-0 text-base text-grey-600">
                                    We continuously invest in research and development to deliver optimal solutions for
                                    our clients, enhancing production efficiency and ensuring safety in every process.
                                </p>
                                <Link to="/aboutus" className="template-btn mt-3 rounded-md text-base font-medium">
                                    Learn more
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-12">
                <h2 data-aos="fade-left" data-aos-duration="1500" className="text-5xl m-0 pb-6">
                    <TextGradient>Best-selling products</TextGradient>
                </h2>
                <Similar />
            </section>

            {/* Departments / Product categories */}
            <section className="department-area section-padding4">
                <div className="container">
                    <div className="">
                        <div className="flex items-center justify-center">
                            <div className="section-top text-center">
                                <h2 data-aos="fade-right" data-aos-duration="1500" className="text-5xl m-0 pb-2">
                                    <TextGradient>Main Product Lines</TextGradient>
                                </h2>
                                <p data-aos="fade-left" data-aos-duration="1500" className="text-base mt-0">
                                    Our equipment solutions support every stage of advanced pharmaceutical
                                    manufacturing.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        {/* Product 1 */}
                        <div data-aos="fade-up" data-aos-duration="1500" className="col-span-1 bg-gray-100 rounded-lg">
                            <div className="single-department item-padding text-center">
                                <img src={img2} alt="Máy đóng viên nang" className="img-fluid mb-3" />
                                <h3 className="text-xl opacity-90">Capsule Filling Machine</h3>
                                <p className="px-8 text-base">
                                    High-quality capsule filling equipment with precise operation, ideal for large-scale
                                    production needs.
                                </p>
                            </div>
                        </div>

                        {/* Product 2 */}
                        <div data-aos="fade-up" data-aos-duration="1500" className="col-span-1 bg-gray-100 rounded-lg">
                            <div className="single-department item-padding text-center">
                                <img src={img2} alt="Máy dập viên nén" className="img-fluid mb-3" />
                                <h3 className="text-xl opacity-90">Tablet Press Machine</h3>
                                <p className="px-8 text-base">
                                    Modern tablet press machine that produces high-quality tablets with excellent
                                    uniformity.
                                </p>
                            </div>
                        </div>

                        {/* Product 3 */}
                        <div
                            data-aos="fade-left"
                            data-aos-duration="1500"
                            className="col-span-1 bg-gray-100 rounded-lg"
                        >
                            <div className="single-department item-padding text-center">
                                <img src={img3} alt="Máy chiết rót chất lỏng" className="img-fluid mb-3" />
                                <h3 className="text-xl opacity-90">Liquid Filling Machine</h3>
                                <p className="px-8 text-base">
                                    An automated and precise liquid filling solution that enhances efficiency and
                                    minimizes product loss.
                                </p>
                            </div>
                        </div>

                        {/* Product 4 */}
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1500"
                            className="col-span-1 bg-gray-100 rounded-lg"
                        >
                            <div className="single-department item-padding text-center">
                                <img src={img4} alt="Thiết bị quy trình" className="img-fluid mb-3" />
                                <h3 className="text-xl opacity-90">harmaceutical Process Equipment</h3>
                                <p className="px-8 text-base">
                                    Equipment that supports production processes and inspection systems to ensure smooth
                                    operation.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Home;
