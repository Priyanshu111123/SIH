import job_controller from "../controllers/job.controller.js";
// import job_middleware from "../middlewares/job.middleware.js";
import auth_middleware from "../middlewares/auth.middleware.js";

function jobRoutes (app) {
  app.post("/postJob", [auth_middleware.verifyToken, auth_middleware.isEmployer], job_controller.postJob);
  app.get("/getJobs", [auth_middleware.verifyToken], job_controller.getJobs)
};

export default jobRoutes;