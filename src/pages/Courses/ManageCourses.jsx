import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';

const ManageCourses = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        if (user) {
            fetchUserCourses();
        }
    }, [user]);

    const fetchUserCourses = async () => {
        const toastId = toast.loading('Loading your courses...');
        
        try {
            const token = localStorage.getItem('access-token');
            const response = await fetch('https://course-management-system-server-woad.vercel.app/api/my-courses', {
                headers: { 'authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }

            const data = await response.json();
            setCourses(data);
            
            toast.success(`${data.length} courses loaded successfully!`, { id: toastId });
        } catch (error) {
            console.error('Error fetching courses:', error);
            toast.error('Failed to load courses. Please try again.', { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    const openDeleteModal = (course) => {
        setCourseToDelete(course);
        document.getElementById('delete_modal').showModal();
    };

    const closeDeleteModal = () => {
        setCourseToDelete(null);
        document.getElementById('delete_modal').close();
    };

    const openDetailsModal = (course) => {
        setSelectedCourse(course);
        document.getElementById('details_modal').showModal();
    };

    const closeDetailsModal = () => {
        setSelectedCourse(null);
        document.getElementById('details_modal').close();
    };

    const confirmDeleteCourse = async () => {
        if (!courseToDelete) return;

        setIsDeleting(true);
        const toastId = toast.loading(`Deleting "${courseToDelete.title}"...`);

        try {
            const token = localStorage.getItem('access-token');
            const response = await fetch(`https://course-management-system-server-woad.vercel.app/api/courses/${courseToDelete._id}`, {
                method: 'DELETE',
                headers: { 'authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to delete course');
            }

            setCourses(prevCourses => 
                prevCourses.filter(course => course._id !== courseToDelete._id)
            );

            toast.success(`"${courseToDelete.title}" deleted successfully!`, { id: toastId });
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting course:', error);
            toast.error('Failed to delete course. Please try again.', { id: toastId });
        } finally {
            setIsDeleting(false);
        }
    };

    const formatPrice = (price, discountPrice) => {
        if (discountPrice && discountPrice < price) {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-success">${discountPrice}</span>
                    <span className="text-sm line-through text-base-content/50">${price}</span>
                    <div className="badge badge-success badge-sm">
                        {Math.round(((price - discountPrice) / price) * 100)}% OFF
                    </div>
                </div>
            );
        }
        return <span className="text-lg font-bold">${price}</span>;
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            'active': 'badge-success',
            'inactive': 'badge-warning',
            'draft': 'badge-info',
            'archived': 'badge-error'
        };
        return `badge ${statusColors[status] || 'badge-neutral'} badge-lg`;
    };

    const getLevelColor = (level) => {
        const levelColors = {
            'Beginner': 'text-success',
            'Intermediate': 'text-warning',
            'Advanced': 'text-error'
        };
        return levelColors[level] || 'text-info';
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-base-100">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-base-content/70">Loading your courses...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-100">
            <div className="container mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-base-content">Manage Courses</h1>
                            <p className="text-base-content/70 mt-2">
                                You have {courses.length} course{courses.length !== 1 ? 's' : ''} • 
                                Total enrollments: {courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0)}
                            </p>
                        </div>
                        <Link 
                            to="/add-course" 
                            className="btn btn-primary btn-lg gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Add New Course
                        </Link>
                    </div>
                </div>

                {/* Courses Grid */}
                {courses.length === 0 ? (
                    <div className="text-center py-16 bg-base-200 rounded-2xl">
                        <div className="max-w-md mx-auto">
                            <div className="w-20 h-20 mx-auto mb-6 bg-base-300 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-base-content/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-base-content mb-2">No courses yet</h3>
                            <p className="text-base-content/70 mb-6">Start creating your first course to share your knowledge!</p>
                            <Link to="/add-course" className="btn btn-primary">
                                Create Your First Course
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <div key={course._id} className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 border border-base-300">
                                {/* Course Image */}
                                <figure className="relative h-48 overflow-hidden">
                                    <img 
                                        src={course.image || '/api/placeholder/400/300'} 
                                        alt={course.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/400/300';
                                        }}
                                    />
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <div className={getStatusBadge(course.status)}>
                                            {course.status?.toUpperCase()}
                                        </div>
                                        {course.featured && (
                                            <div className="badge badge-accent">FEATURED</div>
                                        )}
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <div className="flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded-full text-sm">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>{course.rating || 0}</span>
                                        </div>
                                    </div>
                                </figure>

                                <div className="card-body p-6">
                                    {/* Course Header */}
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h2 className="card-title text-lg font-bold line-clamp-2 mb-2">
                                                {course.title}
                                            </h2>
                                            <div className="flex items-center gap-3 text-sm text-base-content/70">
                                                <span className={`font-medium ${getLevelColor(course.level)}`}>
                                                    {course.level}
                                                </span>
                                                <span>•</span>
                                                <span>{course.duration}</span>
                                                <span>•</span>
                                                <span>{course.language}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Stats */}
                                    <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-base-100 rounded-lg">
                                        <div className="text-center">
                                            <div className="font-bold text-primary">{course.enrollmentCount || 0}</div>
                                            <div className="text-xs text-base-content/70">Students</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-secondary">{course.seats}</div>
                                            <div className="text-xs text-base-content/70">Max Seats</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-accent">{course.reviews?.length || 0}</div>
                                            <div className="text-xs text-base-content/70">Reviews</div>
                                        </div>
                                    </div>

                                    {/* Course Description */}
                                    <p className="text-base-content/80 text-sm line-clamp-3 mb-4">
                                        {course.short_description || course.detailed_description || 'No description available'}
                                    </p>

                                    {/* Course Category & Features */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {course.category && (
                                            <div className="badge badge-outline badge-sm">{course.category}</div>
                                        )}
                                        {course.completion_certificate && (
                                            <div className="badge badge-success badge-sm">Certificate</div>
                                        )}
                                        {course.prerequisites?.length > 0 && (
                                            <div className="badge badge-info badge-sm">Prerequisites</div>
                                        )}
                                    </div>

                                    {/* Price */}
                                    <div className="mb-4">
                                        {formatPrice(course.price, course.discount_price)}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="card-actions justify-between items-center">
                                        <button 
                                            onClick={() => openDetailsModal(course)}
                                            className="btn btn-ghost btn-sm gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            View Details
                                        </button>
                                        
                                        <div className="flex gap-2">
                                            <Link 
                                                to={`/edit-course/${course._id}`} 
                                                className="btn btn-info btn-sm gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => openDeleteModal(course)} 
                                                className="btn btn-error btn-sm gap-2"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    {/* Created Date */}
                                    <div className="text-xs text-base-content/50 mt-3 pt-3 border-t border-base-300">
                                        Created: {new Date(course.createdAt).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'short', 
                                            day: 'numeric' 
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Course Details Modal */}
            <dialog id="details_modal" className="modal">
                <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
                    {selectedCourse && (
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-bold text-2xl">{selectedCourse.title}</h3>
                                <button 
                                    className="btn btn-sm btn-circle btn-ghost" 
                                    onClick={closeDetailsModal}
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Course Image */}
                            <div className="mb-6">
                                <img 
                                    src={selectedCourse.image} 
                                    alt={selectedCourse.title}
                                    className="w-full h-64 object-cover rounded-lg"
                                    onError={(e) => {
                                        e.target.src = '/api/placeholder/800/400';
                                    }}
                                />
                            </div>

                            {/* Course Info Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Basic Information</h4>
                                        <div className="space-y-2 text-sm">
                                            <div><span className="font-medium">Category:</span> {selectedCourse.category}</div>
                                            <div><span className="font-medium">Level:</span> {selectedCourse.level}</div>
                                            <div><span className="font-medium">Duration:</span> {selectedCourse.duration}</div>
                                            <div><span className="font-medium">Language:</span> {selectedCourse.language}</div>
                                            <div><span className="font-medium">Status:</span> 
                                                <span className={`ml-2 badge ${getStatusBadge(selectedCourse.status)}`}>
                                                    {selectedCourse.status?.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Pricing</h4>
                                        <div className="space-y-2">
                                            {formatPrice(selectedCourse.price, selectedCourse.discount_price)}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h4 className="font-semibold mb-2">Statistics</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="bg-base-200 p-3 rounded-lg text-center">
                                                <div className="font-bold text-lg text-primary">{selectedCourse.enrollmentCount || 0}</div>
                                                <div className="text-xs">Enrolled</div>
                                            </div>
                                            <div className="bg-base-200 p-3 rounded-lg text-center">
                                                <div className="font-bold text-lg text-secondary">{selectedCourse.seats}</div>
                                                <div className="text-xs">Max Seats</div>
                                            </div>
                                            <div className="bg-base-200 p-3 rounded-lg text-center">
                                                <div className="font-bold text-lg text-accent">{selectedCourse.rating || 0}</div>
                                                <div className="text-xs">Rating</div>
                                            </div>
                                            <div className="bg-base-200 p-3 rounded-lg text-center">
                                                <div className="font-bold text-lg text-success">{selectedCourse.reviews?.length || 0}</div>
                                                <div className="text-xs">Reviews</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-semibold mb-2">Features</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedCourse.completion_certificate && (
                                                <div className="badge badge-success">Certificate</div>
                                            )}
                                            {selectedCourse.featured && (
                                                <div className="badge badge-accent">Featured</div>
                                            )}
                                            {selectedCourse.prerequisites?.length > 0 && (
                                                <div className="badge badge-info">Prerequisites</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Descriptions */}
                            <div className="space-y-4 mb-6">
                                {selectedCourse.short_description && (
                                    <div>
                                        <h4 className="font-semibold mb-2">Short Description</h4>
                                        <p className="text-base-content/80">{selectedCourse.short_description}</p>
                                    </div>
                                )}
                                
                                {selectedCourse.detailed_description && (
                                    <div>
                                        <h4 className="font-semibold mb-2">Detailed Description</h4>
                                        <p className="text-base-content/80">{selectedCourse.detailed_description}</p>
                                    </div>
                                )}
                            </div>

                            {/* Prerequisites */}
                            {selectedCourse.prerequisites?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Prerequisites</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedCourse.prerequisites.map((prereq, index) => (
                                            <li key={index} className="text-base-content/80">{prereq}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Learning Outcomes */}
                            {selectedCourse.learning_outcomes?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {selectedCourse.learning_outcomes.map((outcome, index) => (
                                            <li key={index} className="text-base-content/80">{outcome}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Curriculum */}
                            {selectedCourse.curriculum?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Curriculum</h4>
                                    <div className="space-y-2">
                                        {selectedCourse.curriculum.map((item, index) => (
                                            <div key={index} className="bg-base-200 p-3 rounded-lg">
                                                <div className="font-medium">{item.title || `Module ${index + 1}`}</div>
                                                {item.description && (
                                                    <div className="text-sm text-base-content/70 mt-1">{item.description}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Instructor Info */}
                            {selectedCourse.instructor && (
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Instructor</h4>
                                    <div className="bg-base-200 p-4 rounded-lg">
                                        <div className="font-medium">{selectedCourse.instructor.name || 'Instructor Name'}</div>
                                        {selectedCourse.instructor.email && (
                                            <div className="text-sm text-base-content/70">{selectedCourse.instructor.email}</div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tags */}
                            {selectedCourse.tags?.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedCourse.tags.map((tag, index) => (
                                            <div key={index} className="badge badge-outline">{tag}</div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Dates */}
                            <div className="text-sm text-base-content/70 pt-4 border-t border-base-300">
                                <div>Created: {new Date(selectedCourse.createdAt).toLocaleString()}</div>
                                <div>Updated: {new Date(selectedCourse.updatedAt).toLocaleString()}</div>
                            </div>
                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeDetailsModal}>close</button>
                </form>
            </dialog>

            {/* Delete Confirmation Modal */}
            <dialog id="delete_modal" className="modal">
                <div className="modal-box max-w-md">
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-error/10 rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-xl text-base-content mb-2">Delete Course</h3>
                        <p className="text-base-content/70 mb-6">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-base-content">
                                "{courseToDelete?.title}"
                            </span>
                            ? This action cannot be undone.
                        </p>
                    </div>
                    
                    <div className="modal-action justify-center gap-3">
                        <button 
                            className="btn btn-ghost min-w-24" 
                            onClick={closeDeleteModal}
                            disabled={isDeleting}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn btn-error min-w-24" 
                            onClick={confirmDeleteCourse}
                            disabled={isDeleting}
                        >
                            {isDeleting ? (
                                <>
                                    <span className="loading loading-spinner loading-sm"></span>
                                    Deleting...
                                </>
                            ) : (
                                'Delete Course'
                            )}
                        </button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button onClick={closeDeleteModal}>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default ManageCourses;