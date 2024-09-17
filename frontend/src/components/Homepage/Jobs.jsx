import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

const Jobs = () => {

    const [jobs, setJobs] = useState(null);
    useEffect(() => {
        (async () => {
            const jobs_fetched = await axios.get("/api/getJobs");
            console.log(jobs_fetched.data.jobs);
            setJobs(jobs_fetched.data.jobs);
        })()
    }, [])

    return (
        <div className="flex flex-wrap gap-8 justify-center">{
            jobs?.length > 0 ? jobs.map(job => <JobCard key={job._id} job={job}/>) : <h2 className="text-2xl">No Products found! Please try with another category</h2>
        }
        </div>
    )
};

export default Jobs;