import httpStatus from "http-status";
import jobService from "../services/job.service";
import ApiError from "../utils/ApiError";
import catchAsync from "../utils/catchAsync";
import pick from "../utils/pick";
import { User } from "@prisma/client";

const getJobs = catchAsync(async (req, res) => {
    const filters = pick(req.query, ['jobTitle', 'companyName']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await jobService.queryJobs(filters, options);
    res.send(result);
})

const getJob = catchAsync(async (req, res) => {
    const job = await jobService.getJobById(req.params.id);
    if (!job) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(job);
});

const applyJob = catchAsync(async (req, res) => {
    const jobApplication = await jobService.applyJobById((req.user as User)?.id ?? "", req.params.jobId, req.body.personalNote);
    if (!jobApplication) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.status(httpStatus.OK).send(jobApplication);
});

export default {
    getJobs,
    getJob,
    applyJob
}