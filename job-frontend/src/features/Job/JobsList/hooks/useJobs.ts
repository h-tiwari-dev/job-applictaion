import { Dispatch, SetStateAction, useState } from "react";
import { JobInterface, fetchJobs } from "../apis/fetchJobs";
import { useQuery } from "react-query";
import { mapError } from "../../../../utils/Errors/mapError";
import { QUERY_KEY } from "../../../../constants/queryKeys";

export interface UseJobs {
    jobs: JobInterface[];
    isLoading: boolean;
    isFetching: boolean;
    error?: string;
    pages: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}


export const useJobs = (): UseJobs => {
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10);

    const {
        data: { jobs, totals } = {
            jobs: [],
            totals: 0,
        },
        isLoading,
        isFetching,
        error,
    } = useQuery(
        [QUERY_KEY.jobs, page, limit],
        ({ signal }) => fetchJobs(page, limit, signal),
        {
            refetchOnWindowFocus: false,
            retry: 2,
        }
    );

    return {
        jobs,
        isLoading,
        isFetching,
        error: mapError(error),
        pages: Math.ceil(totals / limit),
        page,
        setPage,
    };
};
