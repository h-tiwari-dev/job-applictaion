import { useAuth } from "../../../Auth/hooks/useAuth";
import { JobCard } from "../components/JobCard";
import { useJobs } from "../hooks/useJobs";

export const JobList = function () {
    const { jobs, isLoading, isFetching, error } = useJobs();
    const { authUser } = useAuth();

    if (isLoading || isFetching) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error Occured. Please try again.</div>
    }
    return (
        <div>
            {jobs.map(job =>
                <JobCard
                    companyName={job.companyName}
                    jobDescription={job.jobDescription}
                    minSalary={job.minSalary}
                    maxSalary={job.maxSalary}
                    location={job.location}
                    jobTitle={job.jobTitle}
                    rating={job.rating}
                    id={job.id}
                    key={job.id}
                    userLoggedIn={authUser != undefined}
                />
            )}
        </div>
    );
}