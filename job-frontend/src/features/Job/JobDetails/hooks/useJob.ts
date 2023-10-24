import { useQuery } from "react-query";
import { mapError } from "../../../../utils/Errors/mapError";
import { QUERY_KEY } from "../../../../constants/queryKeys";
import { fetchJob } from "../apis/fetchJob";
import { JobInterface } from "../../JobsList/apis/fetchJobs";

export interface UseJob {
    job: JobInterface | undefined;
    isLoading: boolean;
    isFetching: boolean;
    error?: string;
}


export const useJob = (id: string | undefined): UseJob => {
    if (!id) {
        return {
            job: undefined,
            isLoading: true,
            isFetching: true,
            error: mapError(new Error("Cannot find the id"))
        }
    }
    const {
        data,
        isLoading,
        isFetching,
        error,
    } = useQuery(
        QUERY_KEY.jobs,
        ({ signal }) => fetchJob(id, signal),
        {
            refetchOnWindowFocus: false,
            retry: 2,
        }
    );

    return {
        job: data,
        isLoading,
        isFetching,
        error: mapError(error),
    };
};
