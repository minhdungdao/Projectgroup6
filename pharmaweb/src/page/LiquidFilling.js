import { useEffect, useState } from 'react';
import httpClient from '../auth/httpClient';
import { Link } from 'react-router-dom';
import CardItem from '../components/CardItem';
import TextGradient from '../components/TextGradient';
import { toast } from 'react-toastify';

const LiquidFilling = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        document.title = 'LiquidFilling';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const response = await httpClient.get('/api/LiquidFilling');
                setMachines(response.data);
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
                                <TextGradient>Liquid Filling</TextGradient>
                            </h1>
                            <div className="flex items-center gap-3 text-base justify-center">
                                {' '}
                                <Link to="/">Home</Link> <span>|</span> <Link to="/product">Product</Link>
                                <span>|</span> <Link to="/liquidfilling">Liquid Filling</Link>
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
                        {[...machines].map((machine, index) => (
                            <div
                                key={index}
                                className="relative group hover:shadow-xl transition duration-300 rounded-lg overflow-hidden"
                            >
                                <CardItem
                                    to="#"
                                    title="MACHINE"
                                    name={machine.modelName ?? 'Unknow'}
                                    src={`https://localhost:5194${machine.avatar}`}
                                    price={machine.price}
                                    airPressure={machine.airPressure}
                                    airVolume={machine.airVolume}
                                    fillingSpeedBPM={machine.fillingSpeedBPM}
                                    fillingRangeML={machine.fillingRangeML}
                                    isFull3
                                />

                                {/* Nút hành động hiển thị khi hover */}
                                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 flex items-center justify-center space-x-4 transition-opacity duration-300">
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/product/${machine.id}?type=liquidfilling`)
                                        }
                                        className="bg-white text-black font-semibold px-4 py-2 rounded-lg hover:bg-gray-200"
                                    >
                                        Product Details
                                    </button>
                                    <button
                                        onClick={() =>
                                            (window.location.href = `/quoteus?type=liquidfilling&id=${machine.id}`)
                                        }
                                        className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Quotation
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* <section className="feature-area section-padding">
          <div className="container">
            <div className="row">
               {machines.map((machines) => (
              <div className="col-lg-3 col-md-6 mt-3">
                <div
                  key={machines.id}
                  className="single-feature text-center item-padding"
                >
                  <img
                    src={`https://localhost:5194${machines.avatar}`}
                    alt="Máy chiết rót chất lỏng"
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "contain",
                    }}
                  />
                  <h3 className="pt-2">{machines.modelName}</h3>
                  <p className="pt-3">
                    <strong>Air Pressure:</strong> {machines.airPressure} bar
                    <br />
                    <strong>Air Volume:</strong> {machines.airVolume} m³/min
                    <br />
                    <strong>Filling Speed:</strong> {machines.fillingSpeedBPM}{" "}
                    bottles/min
                    <br />
                    <strong>Filling Range:</strong> {machines.fillingRangeML} ml
                  </p>
                </div>
              </div>
               ))}
            </div>
          </div>
        </section> */}
        </div>
    );
};
export default LiquidFilling;
