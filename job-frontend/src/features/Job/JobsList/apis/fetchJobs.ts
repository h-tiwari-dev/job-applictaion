import { ResponseError } from "../../../../utils/Errors/ResponseError";

export interface JobInterface {
    id: number;
    companyName: string;
    jobDescription: string;
    headquarters: string;
    minSalary: number;
    maxSalary: number;
    location: string;
    jobTitle: string;
    seniority: string;
    rating: number;
}


export const fetchJobs = async (
    page: number,
    limit: number,
    signal: AbortSignal | undefined
): Promise<{
    totals: number;
    jobs: JobInterface[];
}> => {
    const response = await fetch(`http://localhost:3000/v1/jobs?page=${page}&limit=${limit}`, {
        signal,
    });
    if (!response.ok) {
        throw new ResponseError('Failed to fetch todos', response);
    }
    const jobs: JobInterface[] = await response.json();
    const totals = Number.parseInt(
        response.headers.get('x-total-count') || '0',
        10
    );

    return {
        totals,
        jobs,
    };
};
