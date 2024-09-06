import job_model from "../models/job.model.js"

const postJob = async (req, res) => {
    const job = {
        title : req.body.title,
        location : req.body.location,
        description : req.body.description,
        working_hours : req.body.working_hours,
        preferred_experience : req.body.preferred_experience,
        wage : req.body.wage,
        skills : req.body.skills,
        qualification : req.body.qualification,
        proposals : req.body.proposals,
        postedBy : req.user._id
    }
    try {
        const job_posted = await job_model.create(job);
        res.status(201).send({
            message: "Job Posted"
        })
    } catch(err) {
        console.log("Job Posting Failed ", err);
        res.status(501).send({
            error: "Failed to Post Job"
        })
    }
}

const getJobs = async (req, res) => {
    try {
        const jobs = await job_model.find().populate('postedBy', '_id name');
        res.status(201).send({
            jobs: jobs
        })
    } catch(error) {
        console.log("Error: Failed to Fetch Jobs", error);
        res.status(501).send({
            error: "Failed to fetch jobs"
        })
    }
};

const job_controller = {
    postJob : postJob,
    getJobs : getJobs
  };
  
  export default job_controller;
  