import { useEffect, useState } from 'react';
import httpClient from '../auth/httpClient';
import { Link } from 'react-router-dom';
import CardItem from '../components/CardItem';
import TextGradient from '../components/TextGradient';
import { toast } from 'react-toastify';

const Product = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        document.title = 'Product';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const response = await httpClient.get('/api/Products');
                setMachines(response.data.capsules ?? []);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu máy:', error);
                toast.error('Lỗi khi lấy dữ liệu máy');
            }
        };

        fetchMachines();
    }, []);
    return (
        <div>
            <section className="banner-area other-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="text-6xl">
                                <TextGradient>Capsule</TextGradient>
                            </h1>
                            <div className="flex items-center justify-center gap-3 text-base">
                                <Link to="/">Home</Link> <span>|</span> <Link to="/about">Product</Link>
                                <span>|</span> <Link to="/product">Capsule</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="feature-area section-padding">
                <div className="px-12">
                    <h2 className="text-4xl m-0 pb-10">
                        <TextGradient>Product List</TextGradient>
                    </h2>
                    <div className="grid grid-cols-4 gap-6">
                        {machines.map((machine, index) => (
                            <div key={index} className="relative group rounded-lg overflow-hidden shadow-lg bg-white">
                                <CardItem
                                    to="#"
                                    title="Machine"
                                    name={machine.name ?? 'Unknow'}
                                    src={`https://localhost:5194${machine.avatar}`}
                                    price={machine.price}
                                    output={machine.output}
                                    capsuleSize={machine.capsuleSize}
                                    machineDimension={machine.machineDimension}
                                    shippingWeight={machine.shippingWeight}
                                    isFull
                                />

                                <div className="absolute inset-0 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition-opacity duration-300">
                                    <button
                                        onClick={() => (window.location.href = `/product/${machine.id}?type=capsules`)}
                                        className="bg-white text-black font-semibold px-4 py-2 rounded hover:bg-gray-100"
                                    >
                                        Product Details
                                    </button>
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/quoteus?type=capsules&id=${machine.id}`)
                                        }
                                        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        Quotation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Product;
