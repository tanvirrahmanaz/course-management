// src/components/Home/Banner.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';

// react-slick এর CSS ফাইল
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ব্যানার ইমেজগুলো যৌক্তিকভাবে ইম্পোর্ট করা হয়েছে
import banner1 from '../../assets/banner/banner1.jpg';
import banner2 from '../../assets/banner/banner2.jpg';
import banner3 from '../../assets/banner/banner3.png';
import banner4 from '../../assets/banner/banner4.png';
import banner5 from '../../assets/banner/banner5.png';
import banner6 from '../../assets/banner/banner6.png';

const Banner = () => {
    // react-slick এর সেটিংস
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: 'ease-in-out',
        appendDots: dots => (
            <div>
              {/* কাস্টম ডট স্টাইলিংয়ের জন্য একটি className যোগ করা হয়েছে */}
              <ul className="m-0 slick-dots-custom"> {dots} </ul>
            </div>
        ),
    };

    // স্লাইডের ডেটা
    const slideData = [
        { bg: banner1, title: 'Unlock Your Potential with Expert-Led Courses', subtitle: 'Dive into a world of knowledge with thousands of courses taught by industry pioneers.' },
        { bg: banner2, title: 'Learn on Your Schedule, Anywhere', subtitle: 'Our flexible learning options are designed to fit your busy lifestyle. Start learning today!' },
        { bg: banner3, title: 'Achieve Your Career Goals Faster', subtitle: 'Gain the in-demand skills and certifications you need to advance in your chosen field.' },
        { bg: banner4, title: 'Interactive Learning, Real-World Projects', subtitle: 'Go beyond theory. Apply your knowledge with hands-on projects and interactive quizzes.' },
        { bg: banner5, title: 'Join a Thriving Community of Learners', subtitle: 'Connect, collaborate, and grow with fellow students and mentors from around the globe.' },
        { bg: banner6, title: 'Transform Your Future, One Skill at a Time', subtitle: 'Your journey to personal and professional growth begins here. What will you learn today?' },
    ];

    // Framer Motion এর জন্য অ্যানিমেশন ভ্যারিয়েন্ট
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    return (
        <>
            {/* এই স্টাইলগুলো index.css বা App.css ফাইলে রাখলে আরও ভালো হয় */}
            <style>
                {`
                    .slick-dots-custom { bottom: 25px; }
                    .slick-dots-custom li button:before { font-size: 12px; color: white; opacity: 0.5; }
                    .slick-dots-custom li.slick-active button:before { color: white; opacity: 1; }
                `}
            </style>
            
            <div className="relative z-0">
                <Slider {...settings}>
                    {slideData.map((slide, index) => (
                        <div key={index} className="relative h-[60vh] md:h-[85vh] w-full">
                            
                            {/* ব্যাকগ্রাউন্ড ইমেজ এবং কালো ওভারলে */}
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${slide.bg})`
                                }}
                            />
                            
                            {/* টেক্সট এবং বাটন কন্টেন্ট */}
                            <div className="relative h-full flex flex-col justify-center items-center text-center text-white p-4">
                                {/* <<< পরিবর্তন: অ্যানিমেশন রি-ট্রিগার করার জন্য key যোগ করা হয়েছে >>> */}
                                <motion.div 
                                    key={index}
                                    className="max-w-3xl"
                                    initial="hidden"
                                    animate="visible" // whileInView এর পরিবর্তে animate ব্যবহার করা হয়েছে
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.2 } }
                                    }}
                                >
                                    <motion.h1 
                                        className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight"
                                        variants={textVariants}
                                    >
                                        {slide.title}
                                    </motion.h1>

                                    <motion.p 
                                        className="text-lg md:text-xl text-gray-200 mb-8"
                                        variants={textVariants}
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                    
                                    <motion.div variants={textVariants}>
                                        <Link 
                                            to="/courses"
                                            className="btn btn-primary btn-lg rounded-full px-8 transform transition-transform duration-300 hover:scale-105"
                                        >
                                            Explore Courses
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </>
    );
};

export default Banner;