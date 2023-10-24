import Joi from 'joi';

const getJobs = {
    query: Joi.object().keys({
        jobTitle: Joi.string(),
        companyName: Joi.string(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer()
    })
};

const getJob = {
    params: Joi.object().keys({
        id: Joi.number().integer()
    })
}

const applyJob = {
    params: Joi.object().keys({
        jobId: Joi.number().integer()
    }),
    body: Joi.object().keys({
        personalNote: Joi.string()
    })
}

export default {
    getJobs,
    getJob,
    applyJob
}