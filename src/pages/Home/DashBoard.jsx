import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import axios from 'axios';
// LoadingSpinner ইমপোর্ট করা নেই, তাই এটি কমেন্ট আউট করা হলো অথবা আপনি আপনার ফাইল থেকে সঠিক পথে ইমপোর্ট করুন
// import LoadingSpinner from '../../components/shared/LoadingSpinner'; 
import { FaArrowRight } from 'react-icons/fa';
import { FiBook, FiAward, FiBarChart2 } from 'react-icons/fi';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && user) {
            const fetchEnrolledCourses = async () => {
                setLoading(true);
                try {
                    const token = localStorage.getItem('access-token');
                    const response = await axios.get('https://course-management-system-server-woad.vercel.app/api/my-enrollments', {
                        headers: { 'authorization': `Bearer ${token}` }
                    });
                    setEnrolledCourses(response.data);
                } catch (error) {
                    console.error("Failed to fetch enrolled courses for dashboard.", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchEnrolledCourses();
        } else if (!authLoading && !user) {
            setLoading(false);
        }
    }, [user, authLoading]);

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                        Welcome back, {user?.displayName || 'Learner'}!
                    </h1>
                    <p className="text-gray-400 mt-2">Here's your learning dashboard</p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-900/30 text-purple-400 mr-4">
                                <FiBook className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Courses Enrolled</p>
                                <p className="text-2xl font-bold">{enrolledCourses.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-900/30 text-blue-400 mr-4">
                                <FiAward className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Certificates</p>
                                <p className="text-2xl font-bold">
                                    {/* <<< সমাধান: এখানে c.course.completion_certificate এর বদলে সরাসরি c.completion_certificate হবে >>> */}
                                    {enrolledCourses.filter(c => c.completion_certificate).length}
                                </p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-colors">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-900/30 text-green-400 mr-4">
                                <FiBarChart2 className="text-xl" />
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm">Learning Progress</p>
                                <p className="text-2xl font-bold">0%</p> {/* এটি আপাতত হার্ডকোডেড রাখা হলো */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                    {/* Your Courses Section */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Continue Learning</h2>
                            <Link to="/my-enrolled-courses" className="text-purple-400 hover:text-purple-300 flex items-center text-sm">
                                View all <FaArrowRight className="ml-1" />
                            </Link>
                        </div>
                        
                        {enrolledCourses.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* <<< সমাধান: এখানেও ডেটা ম্যাপিং এবং destructuring ঠিক করা হয়েছে >>> */}
                                {enrolledCourses.slice(0, 4).map((course) => (
                                    <div key={course.enrollmentId} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300 group">
                                        <div className="h-40 bg-gray-700 overflow-hidden">
                                            <img 
                                                src={course.image || 'https://via.placeholder.com/400x225?text=Course+Image'} 
                                                alt={course.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-4">
                                            <h3 className="font-bold text-lg mb-1 line-clamp-1">{course.title}</h3>
                                            <p className="text-gray-400 text-sm flex items-center mb-3">
                                                {/* <FiUser className="mr-1" />  এই আইকনটি এখানে নেই, আপনি চাইলে যোগ করতে পারেন */}
                                                {course.author?.name || 'Unknown Instructor'}
                                            </p>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-purple-400">
                                                    {course.level || 'Beginner'}
                                                </span>
                                                <Link 
                                                    to={`/course/${course._id}`} // <<< সমাধান: এখন course._id ব্যবহার করা হচ্ছে >>>
                                                    className="text-sm text-white bg-purple-600 hover:bg-purple-700 px-3 py-1 rounded transition-colors"
                                                >
                                                    Continue
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-800 rounded-lg p-8 text-center border-2 border-dashed border-gray-700">
                                <div className="max-w-md mx-auto">
                                    <FiBook className="text-5xl text-purple-400/50 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">No Enrolled Courses</h3>
                                    <p className="text-gray-400 mb-6">
                                        You haven't enrolled in any courses yet. Explore our catalog to start learning!
                                    </p>
                                    <Link 
                                        to="/courses"
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors inline-block"
                                    >
                                        Browse Courses
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;