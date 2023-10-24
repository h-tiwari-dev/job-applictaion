import { Job, JobApplication, Prisma } from "@prisma/client";
import prisma from "../client";
import userService from "./user.service";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const queryJobs = async<Key extends keyof Job>(
    filter: object,
    options: {
        limit?: number,
        page?: number,
        sortBy?: string
        sortType?: 'asc' | 'desc'
    },
    keys: Key[] = [
        'id',
        'companyName',
        'jobDescription',
        'headquarters',
        'minSalary',
        'maxSalary',
        'location',
        'jobTitle',
        'seniority',
        'rating'
    ] as Key[]
): Promise<Pick<Job, Key>[]> => {
    const page = options.page ?? 1;
    const limit = options.limit ?? 10;
    const sortBy = options.sortBy;
    const sortType = options.sortType ?? 'desc';
    const users = await prisma.job.findMany({
        where: filter,
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
        skip: page * limit,
        take: limit,
        orderBy: sortBy ? { [sortBy]: sortType } : undefined,
    });
    return users as Pick<Job, Key>[];
}


/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Job, Key> | null>}
 */
const getJobById = async <Key extends keyof Job>(
    id: number,
    keys: Key[] = [
        'id',
        'companyName',
        'jobDescription',
        'headquarters',
        'minSalary',
        'maxSalary',
        'location',
        'jobTitle',
        'seniority',
        'rating'
    ] as Key[]
): Promise<Pick<Job, Key> | null> => {
    return prisma.job.findUnique({
        where: { id },
        select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
    }) as Promise<Pick<Job, Key> | null>;
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const applyJobById = async (
    userId: number,
    jobId: number,
    personalNote: string
): Promise<JobApplication | null> => {
    const user = await userService.getUserById(userId, ['id', 'email', 'name']);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const job = await getJobById(jobId);
    if (!job) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
    }

    const jobApplication = await prisma.jobApplication.create({
        data: {
            userId: user.id,
            jobId: job.id,
            personalNote: personalNote,
        }
    });
    return jobApplication;
};
export default {
    queryJobs,
    getJobById,
    applyJobById
}