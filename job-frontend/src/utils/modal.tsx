import React, { useState } from 'react';
import { useAuth } from '../features/Auth/hooks/useAuth';
import { toast } from 'react-toastify';

interface ApplicationModalProps {
    jobId: number;
    jobTitle: string;
    isOpen: boolean;
    companyName: string
    location: string
    onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ jobId, jobTitle, isOpen, onClose, companyName, }) => {
    const [personalNote, setPersonalNote] = useState('');
    const { accessToken } = useAuth();

    const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPersonalNote(e.target.value);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="relative my-6 mx-auto w-96">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                        <div>
                            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{jobTitle}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{companyName}</p>
                        </div>
                        <button
                            className="p-1 ml-auto border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={onClose}
                        >
                            ×
                        </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                        <textarea
                            value={personalNote}
                            onChange={handleDetailsChange}
                            className="w-full h-32 p-2 mt-2 border rounded border-gray-300"
                            placeholder="Tell us why you're a great fit for this job..."
                        ></textarea>
                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                        <button
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                            onClick={onClose}
                        >
                            Close
                        </button>
                        <button
                            className="ml-4 bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                            onClick={async () => {
                                try {
                                    const response = await fetch(`http://localhost:3000/v1/jobs/apply/${jobId}`, {
                                        body: JSON.stringify({
                                            personalNote: personalNote
                                        }),
                                        method: 'post',
                                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${accessToken}` },
                                    })
                                    if (!response.ok) {
                                        throw new Error('Job Application Failed. Please try again.');
                                    }
                                    toast.info(`Successfully applied for ${jobTitle} at ${companyName}`, {
                                        position: 'top-right',
                                        autoClose: 5000,
                                    });
                                    // Simulate a sign-up error
                                } catch (error) {
                                    toast.error((error as any).message, {
                                        position: 'top-right',
                                        autoClose: 5000,
                                    });
                                }
                                onClose();
                            }}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApplicationModal;
