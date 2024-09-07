import job_model from "../models/job.model.js";
import jobApplication_model from "../models/jobApplications.model.js";
import assignedJob_model from "../models/assignedJob.model.js";
import user_model from "../models/user.model.js";
import mongoose from "mongoose";

const postJob = async (req, res) => {
  const job = {
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    working_hours: req.body.working_hours,
    preferred_experience: req.body.preferred_experience,
    wage: req.body.wage,
    skills: req.body.skills,
    qualification: req.body.qualification,
    proposals: req.body.proposals,
    postedBy: req.user._id,
  };
  try {
    const job_posted = await job_model.create(job);
    await user_model.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { jobsPosted: job_posted._id } }, // Add jobId to jobsApplied array (ensures no duplicates)
      { new: true } // Return the updated document
    );
    res.status(201).send({
      message: "Job Posted",
    });
  } catch (err) {
    console.log("Job Posting Failed ", err);
    res.status(501).send({
      error: "Failed to Post Job",
    });
  }
};

const getJobs = async (req, res) => {
  try {
    const jobs = await job_model.find().populate("postedBy", "_id name");
    res.status(201).send({
      jobs: jobs,
    });
  } catch (error) {
    console.log("Error: Failed to Fetch Jobs", error);
    res.status(501).send({
      error: "Failed to fetch jobs",
    });
  }
};

const applyJob = async (req, res) => {
  const job_id = new mongoose.Types.ObjectId(req.params.job_id);

  try {
    let jobApplication = await jobApplication_model.findOne({ job_id: job_id });
    const user = req.user;
    if (jobApplication) {
      if (!jobApplication.applicants.includes(user._id)) {
        jobApplication.applicants.push(user._id);
        await jobApplication.save();
        await job_model.findByIdAndUpdate(
          job_id,
          { $inc: { proposals: 1 } }, // Increment the proposals count by 1
          { new: true } // Return the updated document
        );
        await user_model.findByIdAndUpdate(
          user._id,
          { $addToSet: { jobsApplied: job_id } }, // Add jobId to jobsApplied array (ensures no duplicates)
          { new: true } // Return the updated document
        );
        res.status(201).send({
          message: "Successfully Applied for Job",
        });
      } else {
        res.status(401).send({
          error: "You have already applied for this job",
        });
      }
    } else {
      jobApplication = new jobApplication_model({
        job_id: job_id,
        applicants: [user._id],
      });
      await jobApplication.save();
      await job_model.findByIdAndUpdate(
        job_id,
        { $inc: { proposals: 1 } }, // Increment the proposals count by 1
        { new: true } // Return the updated document
      );
      await user_model.findByIdAndUpdate(
        user._id,
        { $addToSet: { jobsApplied: job_id } }, // Add jobId to jobsApplied array (ensures no duplicates)
        { new: true } // Return the updated document
      );
      res.status(201).send({
        message: "Successfully Applied for Job",
      });
    }
  } catch (err) {
    res.status(501).send({
      error: "Failed to apply for Job",
    });
  }
};

const getJobApplications = async (req, res) => {
  const job_id = req.params.job_id;
  const applicants = await jobApplication_model.findOne({ job_id: job_id }).populate("applicants", "name");
  res.status(201).send({
    applications: applicants,
  });
};

const assignJob = async (req, res) => {
  try {
    const job_id = new mongoose.Types.ObjectId(req.params.job_id);
    const employer_id = req.user._id;
    const user_id = new mongoose.Types.ObjectId(req.params.user_id);
    const job = await job_model.findOne({ _id: job_id });
    const assignedJob = {
      title: job.title,
      location: job.location,
      description: job.description,
      working_hours: job.working_hours,
      preferred_experience: job.preferred_experience,
      wage: job.wage,
      skills: job.skills,
      qualification: job.qualification,
      postedBy: job.postedBy,
      assignedTo: user_id,
    };
    const assigned_job_created = await assignedJob_model.create(assignedJob);
    const assigned_job_id = assigned_job_created._id;
    await user_model.findByIdAndUpdate(
      user_id,
      { $addToSet: { jobsUndertaken: assigned_job_id } }, // Adds jobId to jobsApplied array (ensures no duplicates)
      { new: true } // Returns the updated document
    );
    await user_model.findByIdAndUpdate(
      employer_id,
      { $addToSet: { jobsAssigned: assigned_job_id } }, // Adds jobId to jobsApplied array (ensures no duplicates)
      { new: true } // Returns the updated document
    );
    await user_model.findByIdAndUpdate(
      user_id,
      { $pull: { jobsApplied: job_id } }, // Removes jobId from jobsApplied array
      { new: true } // Returns the updated document
    );
    await user_model.findByIdAndUpdate(
      employer_id,
      { $pull: { jobsPosted: job_id } }, // Removes jobId from jobsApplied array
      { new: true } // Returns the updated document
    );
    await job_model.findByIdAndUpdate(
      job_id,
      {
        assigned: true,
        assignedTo: user_id,
      },
      { new: true } // Returns the updated document
    );

    res.status(201).send({
      message: "Job Assigned",
    });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Cannot assign Job",
    });
  }
};

const updateProgress = async (req, res) => {
    const assignedJob_id = req.params.assignedJob_id;
    try {
        await assignedJob_model.findByIdAndUpdate(
            assignedJob_id,
            { 
                $push: { progressMessage: { message: req.body.message } },  // Add new progress message
                progressPercent: req.body.percent                   // Update progressPercent
            },
            { new: true } // Returns the updated document
        );
        res.status(201).send({
            message: "Progress Updated"
        });
    } catch(err) {
        res.status(501).send({
            error: "Failed to update progress"
        })
    }
}

const job_controller = {
  postJob: postJob,
  getJobs: getJobs,
  applyJob: applyJob,
  getJobApplications: getJobApplications,
  assignJob: assignJob,
  updateProgress: updateProgress
};

export default job_controller;
