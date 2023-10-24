import express from 'express';
import validate from '../../middlewares/validate';
import jobValidation from '../../validations/job.validation';
import jobController from '../../controllers/job.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router
    .route('/')
    .get(validate(jobValidation.getJobs), jobController.getJobs);

router
    .route("/:id").get(validate(jobValidation.getJob), jobController.getJob)

router
    .route("/apply/:jobId")
    .post(auth(), validate(jobValidation.applyJob), jobController.applyJob)
export default router;