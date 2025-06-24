import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    // useRouteError হুকটি রাউটিং সম্পর্কিত যেকোনো এরর অবজেক্টকে ধরে ফেলে
    const error = useRouteError();
    console.error(error); // ডিবাগিং এর জন্য কনসোলে এররটি দেখতে পারেন

    let status = error.status || 404;
    let statusText = error.statusText || "Page Not Found";
    let message = "Sorry, we couldn’t find the page you’re looking for.";

    // যদি এটি 404 এরর না হয়ে অন্য কোনো এরর হয়
    if (status !== 404) {
        message = error.message || "An unexpected error has occurred.";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 text-center px-6">
            <div className="max-w-md">
                <h1 className="text-8xl md:text-9xl font-extrabold text-primary drop-shadow-lg">
                    {status}
                </h1>
                <p className="text-2xl md:text-3xl font-bold mt-4 text-gray-800">
                    {statusText}
                </p>
                <p className="text-lg text-gray-600 mt-3">
                    {message}
                </p>
                <Link to="/" className="btn btn-primary mt-8">
                    Go Back to Homepage
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;