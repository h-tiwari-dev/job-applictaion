import { Link, useParams } from 'react-router-dom';
import { useJob } from '../hooks/useJob';
import { useAuth } from '../../../Auth/hooks/useAuth';
import { useState } from 'react';
import ApplicationModal from '../../../../utils/modal';


export const JobDetails = function () {
    const { id } = useParams();
    const { job, isLoading, isFetching, error } = useJob(id);
    const { authUser } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    if (isLoading || isFetching || !job) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error Occured. Please try again.</div>
    }

    const { jobTitle, companyName, location, minSalary, maxSalary, rating, jobDescription } = job;

    return (
        <div className="flex">
            <div className="max-w-md bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 mr-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{jobTitle}</h2>
                <p className="text-gray-600 dark:text-gray-400">{companyName}</p>
                <p className="text-gray-600 dark:text-gray-400">{location}</p>
                <p className="text-gray-600 dark:text-gray-400">{`Salary: $${minSalary} - $${maxSalary}`}</p>

                <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400">{`${rating}/5 ★`}</p>
                </div>

                <Link to="/jobs" className="text-blue-600 hover:underline">
                    Back to Job List
                </Link>
            </div>

            <div className="max-w-md bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4 flex-grow">
                <p className="text-gray-600 dark:text-gray-400">{jobDescription}</p>
            </div>

            <div className="max-w-md bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 p-4">
                {
                    authUser ?
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
            </div>

            <ApplicationModal
                jobId={Number.parseInt(id ?? "")}
                isOpen={isModalOpen}
                onClose={closeModal}
                jobTitle={jobTitle}
                companyName={companyName}
                location={location}
            />
        </div>
    );
};