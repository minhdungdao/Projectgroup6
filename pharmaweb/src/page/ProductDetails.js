import React, { useEffect, useState } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom';
import httpClient from '../auth/httpClient';

const ProductDetail = () => {
    const params = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type');
    const imageBaseURL = 'https://localhost:5194';
    const [data, setData] = useState();

    useEffect(() => {
        if (params.id) {
            if (type === 'capsules') {
                httpClient
                    .get(`/api/Capsule/${params.id}`)
                    .then((res) => {
                        setData(res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }

            if (type === 'tablet') {
                httpClient
                    .get(`/api/Tablet/${params.id}`)
                    .then((res) => {
                        setData(res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }

            if (type === 'liquidfilling') {
                httpClient
                    .get(`/api/LiquidFilling/${params.id}`)
                    .then((res) => {
                        setData(res.data);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        }
    }, [params, type]);

    const renderRating = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(rating)) {
                stars.push(<FaStar key={i} className="text-yellow-400" />);
            } else if (i - rating < 1) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-400" />);
            }
        }
        return stars;
    };

    const renderFields = () => {
        switch (type) {
            case 'liquidfilling':
                return (
                    <>
                        <InfoField label="Model" value={data?.modelName} />
                        <InfoField label="Air Pressure (bar)" value={data?.airPressure} />
                        <InfoField label="Air Volume (L/min)" value={data?.airVolume} />
                        <InfoField label="Filling Speed (BPM)" value={data?.fillingSpeedBPM} />
                        <InfoField label="Filling Range (ml)" value={data?.fillingRangeML} />
                    </>
                );
            case 'capsules':
                return (
                    <>
                        <InfoField label="Model" value={data?.name?.trim()} />
                        <InfoField label="Output" value={`${data?.output} pill/h`} />
                        <InfoField label="Capsule Size" value={data?.capsuleSize} />
                        <InfoField label="Machine Dimensions" value={data?.machineDimension} />
                        <InfoField label="Shipping Weight (kg)" value={data?.shippingWeight} />
                    </>
                );
            case 'tablet':
                return (
                    <>
                        <InfoField label="Model" value={data?.modelNumber} />
                        <InfoField label="Number of Dies" value={data?.dies} />
                        <InfoField label="Max Pressure (T)" value={data?.maxPressure} />
                        <InfoField label="Max Tablet Diameter (mm)" value={data?.maxTabletDiameterMM} />
                        <InfoField label="Max Depth of Fill (mm)" value={data?.maxDepthOfFillMM} />
                        <InfoField label="Production Capacity (tablets/h)" value={data?.productionCapacity} />
                        <InfoField label="Machine Size" value={data?.machineSize} />
                        <InfoField label="Net Weight (kg)" value={data?.netWeightKG} />
                    </>
                );
            default:
                return <p className="text-red-500">Loại sản phẩm không xác định.</p>;
        }
    };

    const InfoField = ({ label, value }) => (
        <div className="flex items-center justify-between">
            <p className="text-sm m-0 p-0 text-gray-500">{label}: </p>
            <p className="text-base m-0 p-0 font-medium text-gray-800">{value}</p>
        </div>
    );
    return (
        <div className="min">
            <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow-md flex flex-col items-center md:flex-row gap-8 mt-10">
                <div className="flex-1">
                    <img
                        src={imageBaseURL + data?.avatar}
                        alt={data?.modelName || data?.name || data?.modelNumber}
                        className="w-full h-auto object-cover rounded-lg"
                    />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        {data?.modelName || data?.name || data?.modelNumber}
                    </h1>
                    <p className="text-2xl text-pink-600 font-bold">{data?.price?.toLocaleString()} USD</p>
                    <div className="flex justify-center gap-1 text-xl mb-8">{renderRating(5)}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">{renderFields()}</div>
                    <Link to={`/quoteus?type=${type}`}>
                        <button className="py-2.5 rounded-md shadow-none outline-none w-full mt-3 bg-blue-500 font-medium text-white text-base">
                            Quote Now
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
