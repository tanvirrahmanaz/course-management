// src/pages/MyEnrolledCourses.jsx

import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FiBook, FiUser, FiTrash2, FiArrowLeft, FiClock, FiStar, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion'; // <<< framer-motion ইমপোর্ট করা হয়েছে >>>

// --- Skeleton Loader Component (কোনো পরিবর্তন নেই) ---
const CourseCardSkeleton = () => (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 p-4 animate-pulse">
        <div className="h-48 bg-slate-700 rounded-lg mb-4"></div>
        <div className="h-6 bg-slate-700 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2 mb-4"></div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-700">
            <div className="h-8 bg-slate-700 rounded w-1/4"></div>
            <div className="h-10 bg-slate-700 rounded-lg w-1/3"></div>
        </div>
    </div>
);


const MyEnrolledCourses = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    // useEffect এবং handleRemoveEnrollment ফাংশন অপরিবর্তিত আছে, কারণ এগুলো সঠিকভাবে কাজ করছে
    useEffect(() => {
        let isMounted = true;
        const fetchEnrolledCourses = async () => {
            if (isMounted) setLoading(true);
            try {
                const token = localStorage.getItem('access-token');
                const response = await fetch('https://course-management-system-server-woad.vercel.app/api/my-enrollments', {
                    headers: { 'authorization': `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                if (isMounted) setEnrolledCourses(data);
            } catch (error) {
                if (isMounted) Swal.fire({ icon: 'error', title: 'Oops...', text: 'Failed to fetch your courses. Please try again later.', background: '#1f2937', color: '#f3f4f6' });
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        if (!authLoading && user) {
            fetchEnrolledCourses();
        } else if (!authLoading && !user) {
            setEnrolledCourses([]);
            setLoading(false);
        }

        return () => { isMounted = false; };
    }, [user, authLoading]);

    const handleRemoveEnrollment = async (courseId, courseTitle) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You are about to remove your enrollment from "${courseTitle}".`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, remove it!',
            background: '#1f2937',
            color: '#f3f4f6'
        });

        if (result.isConfirmed) {
            try {
                const token = localStorage.getItem('access-token');
                const response = await fetch(`https://course-management-system-server-woad.vercel.app/api/enrollments/toggle`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${token}` },
                    body: JSON.stringify({ courseId: courseId })
                });

                const data = await response.json();
                if (!response.ok || data.enrolled) throw new Error(data.message || 'Failed to remove enrollment.');
                
                Swal.fire({ title: 'Removed!', text: 'Your enrollment has been successfully removed.', icon: 'success', background: '#1f2937', color: '#f3f4f6', timer: 2000, showConfirmButton: false });
                
                setEnrolledCourses(prev => prev.filter(course => course._id !== courseId));
            } catch (error) {
                Swal.fire({ icon: 'error', title: 'Operation Failed', text: error.message, background: '#1f2937', color: '#f3f4f6' });
            }
        }
    };

    if (loading || authLoading) {
        return (
            <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="h-8 w-24 bg-slate-700 rounded-lg mb-6 animate-pulse"></div>
                    <div className="flex items-center justify-between mb-8">
                        <div className="h-10 w-1/2 bg-slate-700 rounded-lg animate-pulse"></div>
                        <div className="h-8 w-28 bg-slate-700 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                        <CourseCardSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    // <<< ডিজাইন: অ্যানিমেশনের জন্য ভ্যারিয়েন্ট তৈরি করা হয়েছে >>>
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8">
            <motion.div 
                className="max-w-7xl mx-auto"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-indigo-400 hover:text-indigo-300 mb-8 transition-colors text-sm font-medium"
                >
                    <FiArrowLeft className="mr-2" /> Back to Dashboard
                </button>

                <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
                    <h1 className="text-3xl md:text-4xl font-black tracking-tighter bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                        My Learning Path
                    </h1>
                    <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-2 flex items-center space-x-2 text-sm font-semibold">
                        <FiBook className="text-indigo-400" />
                        <span>
                            {enrolledCourses.length} Enrolled
                        </span>
                    </div>
                </div>

                {enrolledCourses.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {enrolledCourses.map((course) => (
                            <motion.div 
                                key={course.enrollmentId} 
                                variants={itemVariants}
                                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 transition-all duration-300 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/50"
                            >
                                <div className="relative h-52 overflow-hidden group">
                                    <img
                                        src={course.image || 'https://via.placeholder.com/400x225?text=Course+Image'}
                                        alt={course.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    <div className="absolute top-2 right-2 flex items-center gap-2">
                                        <div className="flex items-center gap-1 text-xs bg-slate-900/80 text-white py-1 px-2 rounded-full backdrop-blur-sm">
                                            <FiStar className="text-yellow-400" />
                                            <span className="font-bold">{course.rating || '4.5'}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="flex gap-2 mb-3">
                                        <span className="bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                                           <FiZap size={12}/> {course.level || 'All Levels'}
                                        </span>
                                        <span className="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                                            <FiClock size={12}/> {course.duration || '6-8h'}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-50 flex-grow mb-2">{course.title}</h3>
                                    <p className="text-sm text-slate-400 flex items-center mb-4">
                                        <FiUser className="mr-1.5" /> By {course.author?.name || 'Unknown'}
                                    </p>
                                    
                                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700">
                                        <span className="text-2xl text-indigo-400 font-extrabold">
                                            ${course.discount_price ?? course.price ?? '0'}
                                        </span>
                                        <button
                                            onClick={() => handleRemoveEnrollment(course._id, course.title)}
                                            className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white font-semibold transition-all text-xs px-3 py-2 rounded-lg flex items-center gap-1.5"
                                        >
                                            <FiTrash2 size={14} /> Remove
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        className="bg-slate-800 rounded-lg p-8 text-center border-2 border-dashed border-slate-700 mt-10"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="max-w-md mx-auto">
                            <FiBook className="text-7xl text-slate-600 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Your Learning Journey is Empty</h3>
                            <p className="text-slate-400 mb-6">
                                The best time to start was yesterday. The second best time is now. Enroll in a course!
                            </p>
                            <button
                                onClick={() => navigate('/courses')}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
                            >
                                Explore All Courses
                            </button>
                        </div>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default MyEnrolledCourses;