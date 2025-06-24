import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success('Successfully logged out!');
        setIsMobileMenuOpen(false);
      })
      .catch(error => {
        toast.error(error.message);
      });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-900 shadow-2xl border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="/src/assets/logo/Course_logo.png" 
                  alt="Shiksha Alo" 
                  className="w-6 h-6 object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = '<span class="text-white font-bold text-lg">S</span>';
                  }}
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Shiksha Alo
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Course Management</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              Home
            </NavLink>
            
            <NavLink
              to="/courses"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`
              }
            >
              All Courses
            </NavLink>

            {user && (
              <>
                <NavLink
                  to="/add-course"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  Add Course
                </NavLink>
                
                <NavLink
                  to="/manage-courses"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  Manage Courses
                </NavLink>
                
                <NavLink
                  to="/my-enrolled-courses"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  My Courses
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              </>
            )}
          </div>

          {/* User Profile / Login */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <div className="flex items-center space-x-3">
                  {/* Profile Dropdown */}
                  <div className="relative group">
                    <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden">
                        {user?.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user?.displayName || 'User'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.parentElement.innerHTML = `<span class="text-white text-sm font-semibold">${(user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}</span>`;
                            }}
                          />
                        ) : (
                          <span className="text-white text-sm font-semibold">
                            {(user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-sm font-medium text-white">
                          {user?.displayName || 'User'}
                        </p>
                        <p className="text-xs text-gray-400">
                          {user?.email}
                        </p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right">
                      <div className="py-2">
                        <div className="px-4 py-2 border-b border-gray-700">
                          <p className="text-sm font-medium text-white">
                            {user?.displayName || 'User'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                          Dashboard
                        </Link>
                        <Link
                          to="/my-enrolled-courses"
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
                        >
                          My Courses
                        </Link>
                        <button
                          onClick={handleLogOut}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900 hover:text-red-300 transition-colors duration-200"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <svg
                className={`w-6 h-6 transform transition-transform duration-200 ${
                  isMobileMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800 border-t border-gray-700 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 max-h-96 visible'
            : 'opacity-0 max-h-0 invisible overflow-hidden'
        }`}
      >
        <div className="px-4 py-3 space-y-1">
          <NavLink
            to="/"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`
            }
          >
            Home
          </NavLink>
          
          <NavLink
            to="/courses"
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`
            }
          >
            All Courses
          </NavLink>

          {user && (
            <>
              <NavLink
                to="/add-course"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                Add Course
              </NavLink>
              
              <NavLink
                to="/manage-courses"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                Manage Courses
              </NavLink>
              
              <NavLink
                to="/my-enrolled-courses"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                My Courses
              </NavLink>

              <NavLink
                to="/dashboard"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`
                }
              >
                Dashboard
              </NavLink>
            </>
          )}

          {!user && (
            <div className="pt-4 border-t border-gray-700 mt-4">
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block px-3 py-2 rounded-lg text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMobileMenu}
                className="block px-3 py-2 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;