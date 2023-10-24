import { Link } from "react-router-dom";
import { JobInterface } from "../apis/fetchJobs";
import { useState } from "react";
import ApplicationModal from "../../../../utils/modal";

export const JobCard = function ({
    jobTitle,
    companyName,
    location,
    maxSalary,
    minSalary,
    rating,
    jobDescription,
    id,
    userLoggedIn = false
}: Omit<JobInterface, 'seniority' | 'headquarters'> & {
    userLoggedIn?: boolean
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    // Trim the job description to a maximum length
    const trimmedDescription =
        jobDescription.length > 100
            ? jobDescription.slice(0, 100) + '...'
            : jobDescription;

    return (
        <div className="max-w-md bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 overflow-clip">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{jobTitle}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{companyName}</p>
                    <p className="text-gray-600 dark:text-gray-400">{location}</p>
                    <p className="text-gray-600 dark:text-gray-400">{`Salary: $${minSalary} - $${maxSalary}`}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-gray-600 dark:text-gray-400 mr-2">{`${rating}/5`}</p>
                    {renderStars(rating)}
                </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                {trimmedDescription}{' '}
                <Link to={`/job-details/${id}`} className="text-blue-600 hover:underline">
                    Know More
                </Link>

            </p>
            {
                userLoggedIn ?
                    <button
                        onClick={openModal}
                        className="block w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
                        Apply Now
                    </button>
                    :
                    <Link to={'/login'} className="block w-full px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:ring-4 focus:ring-gray-300">
                        Login/Register to apply.
                    </Link>
            }

            <ApplicationModal
                jobId={id}
                isOpen={isModalOpen}
                onClose={closeModal}
                jobTitle={jobTitle}
                companyName={companyName}
                location={location}
            />
        </div>
    );
};

// Function to generate star icons for rating
const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
                ★
            </span>
        );
    }
    return stars;
};
