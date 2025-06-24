// src/components/shared/CourseCard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaUsers, FaClock, FaStar, FaLevelUpAlt } from 'react-icons/fa';

const CourseCard = ({ course }) => {
    
    // মূল্য দেখানোর জন্য একটি হেল্পার ফাংশন
    const renderPrice = (price, discountPrice) => {
        if (discountPrice && discountPrice < price) {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-purple-400">${discountPrice}</span>
                    <span className="text-md line-through text-gray-500">${price}</span>
                </div>
            );
        }
        return <span className="text-2xl font-bold text-purple-400">${price || 0}</span>;
    };
    
    return (
        <Link to={`/course/${course._id}`} className="block group">
            <div className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/20">
                
                {/* Image Section */}
                <figure className="relative h-52 overflow-hidden">
                    <img
                        src={course.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-purple-600 text-white px-3 py-1 text-sm font-semibold rounded-full capitalize">
                            {course.level || 'All Levels'}
                        </span>
                    </div>
                </figure>
                
                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Category and Rating */}
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-purple-400">{course.category || 'General'}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                            <FaStar />
                            <span className="text-gray-300 font-semibold">{course.rating?.toFixed(1) || '0.0'}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-white mb-3 flex-grow line-clamp-2">
                        {course.title}
                    </h2>

                    {/* Instructor */}
                    <div className="flex items-center gap-3 mb-4">
                        <img 
                            src={course.instructor?.photoURL || `https://ui-avatars.com/api/?name=${course.instructor?.name || 'A'}&background=random`} 
                            alt={course.instructor?.name}
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-400">{course.instructor?.name || 'Anonymous Instructor'}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between items-center text-gray-400 text-sm border-t border-b border-gray-700 py-3 my-3">
                        <div className="flex items-center gap-2">
                            <FaUsers />
                            <span>{course.enrollmentCount || 0} Students</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock />
                            <span>{course.duration || 'Self-paced'}</span>
                        </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex justify-between items-center mt-auto">
                        {renderPrice(course.price, course.discount_price)}
                        <span className="text-white font-semibold transition-colors duration-300 group-hover:text-purple-400">
                            View Details →
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;