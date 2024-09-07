import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Jobs'
    },
    applicants: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User'
    }
});

const jobApplication_model = mongoose.model("JobApplications", jobApplicationSchema);

export default jobApplication_model;