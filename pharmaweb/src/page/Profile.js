import { useEffect, useState } from 'react';
import httpClient from '../auth/httpClient';
import '../assets/sass/module/Profile.scss';
import { MdOutlineCameraAlt } from 'react-icons/md';
import TextGradient from '../components/TextGradient';
import { VscFilePdf } from 'react-icons/vsc';
import { useAuthData } from '../stores';
import { FaRegCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Profile = () => {
    const { authData } = useAuthData();

    const calculateAccountAge = (createDate) => {
        const createdAt = new Date(createDate);
        const today = new Date();
        const diffTime = Math.abs(today - createdAt);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    useEffect(() => {
        document.title = 'Profile';
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="pb-8">
            <div className="profile">
                <div className="relative profile-wall h-60 md:h-80">
                    <img
                        src="https://png.pngtree.com/background/20210710/original/pngtree-medical-blue-banner-picture-image_1036794.jpg"
                        alt="wall profile image"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center">
                        <div className="text-white max-w-xl pl-[150px] text-left font-sans tracking-wide">
                            <h1 className="text-4xl font-bold leading-snug">
                                <span style={{ color: '#4a6cf7' }}>Hello</span>{' '}
                                <span style={{ color: '#ff4c93' }}>
                                    {authData?.data?.fullName
                                        ?.toLowerCase()
                                        .replace(/\b\w/g, (char) => char.toUpperCase())}
                                </span>
                            </h1>
                            <p className="text-base leading-relaxed mt-2">
                                Thank you so much to all our amazing users for your continued interest and support in
                                following our website! 🌟 Your engagement means the world to us! 😊
                            </p>
                        </div>
                    </div>
                </div>

                <div className="profile-infos">
                    <div className="profile-avatar-wrapper">
                        <div className="profile-avatar">
                            <img
                                src={
                                    authData?.data?.avatar ||
                                    'https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg'
                                }
                                alt="avatar user"
                            />
                            <label htmlFor="profile-avatar-choose" className="profile-avatar-icon">
                                <MdOutlineCameraAlt />
                            </label>
                            <input type="file" id="profile-avatar-choose" className="profile-choose-file" />
                        </div>
                    </div>
                    <h3 className="profile-username">{authData?.data?.fullName}</h3>
                    <p className="text-base text-center text-gray-700 mt-2 space-x-2">
                        <span className="font-medium">Email:</span> {authData?.data?.email}
                        {authData?.data?.phone && (
                            <>
                                <span className="font-medium">| Phone:</span> {authData?.data?.phone}
                            </>
                        )}
                        {authData?.data?.createat && (
                            <>
                                <span className="font-medium">| Account Age:</span>{' '}
                                {calculateAccountAge(authData?.data?.createat)} Days
                            </>
                        )}
                    </p>
                </div>
            </div>

            <div className="flex gap-8 bg-white p-8">
                <div className="flex-1 p-5 border-[1.5px] rounded-md border-solid border-blue-200">
                    <h3 className="font-medium text-xl">
                        <TextGradient>Profile</TextGradient>
                    </h3>
                    <div className="flex gap-5 justify-evenly mt-10">
                        <div className="flex-1 shadow-sm hover:shadow-md p-8 rounded-md border-[1.5px] border-solid border-blue-100 flex items-center justify-between">
                            <div className="flex flex-col gap-3 items-center">
                                <h6 className="m-0 p-0 font-semibold text-base">Career Opportunities for You</h6>

                                <Link to={'/career'} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center">
                                        <VscFilePdf className="text-xl" />
                                    </span>
                                    View now
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 shadow-sm hover:shadow-md p-8 rounded-md border-[1.5px] border-solid border-blue-100 flex items-center justify-between">
                            <div className="flex flex-col gap-3 items-center">
                                <h6 className="m-0 p-0 font-semibold text-base">Your Opinion Matters</h6>

                                <Link to={'/quoteus'} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center">
                                        <FaRegCommentDots className="text-xl" />
                                    </span>
                                    Send Feedback Now
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 shadow-sm hover:shadow-md p-8 rounded-md border-[1.5px] border-solid border-blue-100 flex items-center justify-between">
                            <div className="flex flex-col gap-3 items-center">
                                <h6 className="m-0 p-0 font-semibold text-base">CV Management</h6>

                                <Link to={'/mycv'} className="flex items-center gap-3">
                                    <span className="flex items-center justify-center">
                                        <VscFilePdf className="text-xl" />
                                    </span>
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
