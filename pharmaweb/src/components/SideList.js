import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CardItem from './CardItem';
import '../assets/sass/module/SideList.scss';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import httpClient from '../auth/httpClient';
import { showToast } from '../utils';
import { toast } from 'react-toastify';

function Similar() {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        const fetchMachines = async () => {
            try {
                const response = await httpClient.get('/api/Products');

                const normalize = (items, type) =>
                    items.map((item) => ({
                        ...item,
                        name: item.name ?? item.modelName ?? item.modelNumber ?? 'Unknown',
                        type, // gán thêm type để dùng cho `to` trong link
                    }));

                const capsules = normalize(response.data.capsules, 'capsules');
                const tablets = normalize(response.data.tablets, 'tablet');
                const liquidFillings = normalize(response.data.liquidFillings, 'liquidfilling');

                setMachines([...capsules, ...tablets, ...liquidFillings]);
            } catch (error) {
                console.error('Failed to fetch data', error);
                toast.error('Failed to fetch data');
            }
        };

        fetchMachines();
    }, []);

    console.log(machines);

    return (
        <div className={'similar'}>
            <Swiper
                slidesPerView={3}
                modules={[Autoplay]}
                autoplay={{
                    delay: 3000, // 3 giây giữa các slide
                    disableOnInteraction: false, // không dừng autoplay khi người dùng tương tác
                }}
                loop
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                }}
                spaceBetween={20}
                speed={500}
                className="mySwiper"
            >
                {machines?.map((item) => (
                    <SwiperSlide key={item.id}>
                        <CardItem
                            to={`/quoteus?type=${item.type}`}
                            title="Machine"
                            name={'Model: ' + item.name}
                            src={`https://localhost:5194${item.avatar}`}
                            price={item.price}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Similar;
