// src/components/Home/Banner.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { motion } from 'framer-motion';
// react-slick এর CSS ফাইল
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ব্যানার ইমেজগুলো যৌক্তিকভাবে ইম্পোর্ট করা হয়েছে
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
        speed: 1000,
        fade: false, // fade বন্ধ করে slide করা হবে
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500, // 3.5 সেকেন্ড পর পর স্ক্রল
        cssEase: 'ease-in-out',
        pauseOnHover: true, // হোভার করলে থেমে যাবে
        pauseOnFocus: true,
        appendDots: dots => (
            <div>
              {/* কাস্টম ডট স্টাইলিংয়ের জন্য একটি className যোগ করা হয়েছে */}
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
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <>
            {/* এই স্টাইলগুলো index.css বা App.css ফাইলে রাখলে আরও ভালো হয় */}
            <style>
                {`
                    .slick-dots-custom { 
                        bottom: 15px; 
                        z-index: 10;
                    }
                    .slick-dots-custom li button:before { 
                        font-size: 12px; 
                        color: white; 
                        opacity: 0.7; 
                    }
                    .slick-dots-custom li.slick-active button:before { 
                        color: #3b82f6; 
                        opacity: 1; 
                        transform: scale(1.2);
                    }
                    
                    /* স্লাইডার এরো স্টাইলিং */
                    .slick-prev, .slick-next {
                        z-index: 10;
                        width: 50px;
                        height: 50px;
                    }
                    .slick-prev:before, .slick-next:before {
                        font-size: 25px;
                        color: white;
                        opacity: 0.8;
                    }
                    .slick-prev {
                        left: 20px;
                    }
                    .slick-next {
                        right: 20px;
                    }
                    
                    @media (max-width: 768px) {
                        .slick-dots-custom { bottom: 10px; }
                        .slick-dots-custom li button:before { font-size: 10px; }
                        .slick-prev, .slick-next {
                            width: 35px;
                            height: 35px;
                        }
                        .slick-prev:before, .slick-next:before {
                            font-size: 18px;
                        }
                        .slick-prev {
                            left: 10px;
                        }
                        .slick-next {
                            right: 10px;
                        }
                    }

                    /* স্মুথ ট্রানজিশন */
                    .slick-slide {
                        transition: all 0.5s ease;
                    }
                `}
            </style>
            
            <div className="relative z-0">
                <Slider {...settings}>
                    {slideData.map((slide, index) => (
                        <div key={index} className="relative h-[65vh] w-full overflow-hidden">
                            
                            {/* ব্যাকগ্রাউন্ড ইমেজ এবং কালো ওভারলে */}
                            <div
                                className="absolute inset-0 bg-no-repeat transform transition-transform duration-700 hover:scale-105"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${slide.bg})`,
                                    backgroundPosition: ' center', // উপরের অংশ দেখাবে
                                    backgroundSize: 'cover',
                                    width: '100%',
                                    height: '100%'
                                }}
                            />
                            
                            {/* টেক্সট এবং বাটন কন্টেন্ট */}
                            <div className="relative h-full flex flex-col justify-center items-center text-center text-white px-4 py-6">
                                {/* <<< পরিবর্তন: অ্যানিমেশন রি-ট্রিগার করার জন্য key যোগ করা হয়েছে >>> */}
                                <motion.div 
                                    key={index}
                                    className="max-w-4xl w-full"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.15 } }
                                    }}
                                >
                                    <motion.h1 
                                        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 md:mb-4 leading-tight"
                                        variants={textVariants}
                                    >
                                        {slide.title}
                                    </motion.h1>
                                    <motion.p 
                                        className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 mb-4 md:mb-6 px-2"
                                        variants={textVariants}
                                    >
                                        {slide.subtitle}
                                    </motion.p>
                                    
                                    <motion.div variants={textVariants}>
                                        <Link 
                                            to="/courses"
                                            className="btn btn-primary btn-sm md:btn-md lg:btn-lg rounded-full zpx-4 md:px-6 lg:px-8 text-sm md:text-base transform transition-transform duration-300 hover:scale-105"
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