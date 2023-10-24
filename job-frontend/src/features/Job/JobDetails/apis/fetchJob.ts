import { ResponseError } from "../../../../utils/Errors/ResponseError";
import { JobInterface } from "../../JobsList/apis/fetchJobs";

export const fetchJob = async (
    id: string,
    signal: AbortSignal | undefined
): Promise<JobInterface> => {
    const response = await fetch(`http://localhost:3000/v1/jobs/${id}`, {
        signal,
    });
    if (!response.ok) {
        throw new ResponseError('Failed to fetch todos', response);
    }
    const job: JobInterface = await response.json();
    return job;
};
