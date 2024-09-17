import React from "react";
import axios from "axios";
const JobCard = ({ job }) => {
    const applyforJob = () => {
        const url = `/api/applyJob/${job._id}`;
        axios.post(url, {
            headers: {
              "Content-Type": "application/json", 
            },
          });
    }
  return (
    <div id={job._id}>
      <h2 className="text-white">Title: {job.title}</h2>
      <h2 className="text-white">Location: {job.location}</h2>
      <h2 className="text-white">Description: {job.description}</h2>
      <h2 className="text-white">Preferred Working Hours: {job.working_hours}</h2>
      <h2 className="text-white">Preferred Experience: {job.preferred_experience}</h2>
      <h2 className="text-white">Wage: {job.wage}</h2>
      <h2 className="text-white">Skills:</h2>
      {job.skills.map((skill, index) => (
        <h2 className="text-white" key={index}>
          {skill}
        </h2>
      ))}

      <h2 className="text-white">Qualification:</h2>
      {job.qualification.map((qualification, index) => (
        <h2 className="text-white" key={index}>
          {qualification}
        </h2>
      ))}
      <h2 className="text-white">Proposals: {job.proposals}</h2>
      <h2 className="text-white">Posted By: {job.postedBy.name}</h2>
      <button onClick={applyforJob} className="btn btn-primary">Apply</button>
    </div>
  );
};

export default JobCard;
