import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
const Details = () => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/profile");
      const profile_data = response.data.profile;
      setProfileData(profile_data);
    })();
  }, []);

  return (
    <>
      {profileData !== null ? (
        <>
          <div className="text-white">
            <h2>Username: {profileData.username}</h2>
          </div>
          <div className="text-white">
            <h2>Name: {profileData.name}</h2>
          </div>

          {profileData.bio ? (
            <div className="text-white">
              <h2>Bio: {profileData.bio}</h2>
            </div>
          ) : (
            <p>Bio: Not set</p>
          )}

          {profileData.availability ? (
            <div className="text-white">
              <h2>Availability: {profileData.availability}</h2>
            </div>
          ) : (
            <p>Availability: Not set</p>
          )}

          {profileData.hourlyRate ? (
            <div className="text-white">
              <h2>HourlyRate: {profileData.hourlyRate}</h2>
            </div>
          ) : (
            <p>HourlyRate: Not set</p>
          )}

        { profileData.skills?.length != 0 ? (
            <div className="text-white">
              <h2>
                Skills:
                {profileData.skills.map((skill, index) => (
                  <h2 className="text-white" key={index}>
                    {skill}
                  </h2>
                ))}
              </h2>
            </div>
          ) : (
            <p>Skills: Not set</p>
          )}

          {profileData.languages?.length != 0 ? (
            <div className="text-white">
              <h2>
              Languages:
                {profileData.languages.map((language, index) => (
                  <h2 className="text-white" key={index}>
                    {language}
                  </h2>
                ))}
              </h2>
            </div>
          ) : (
            <p>Languages: Not set</p>
          )}

          {profileData.jobsApplied?.length != 0 ? (
            <div className="text-white">
              <h2>
              Jobs Applied:
                {profileData.jobsApplied.map((job, index) => (
                  <h2 className="text-white" key={index}>
                    {job.title}
                  </h2>
                ))}
              </h2>
            </div>
          ) : (
            <p>Jobs Applied: 0</p>
          )}
          
          {profileData.jobsUndertaken?.length != 0 ? (
            <div className="text-white">
              <h2>
              Jobs Undertaken:
                {profileData.jobsUndertaken.map((job, index) => (
                  <h2 className="text-white" key={index}>
                    {job}
                  </h2>
                ))}
              </h2>
            </div>
          ) : (
            <p>Jobs Undertaken: 0</p>
          )}

          {(profileData.certifications && profileData.certifications.length != 0) ? (
            <div className="text-white">
              <h2>
              Job Certifications:
                {profileData.certifications.map((certification, index) => (
                  <h2 className="text-white" key={index}>
                    {certification}
                  </h2>
                ))}
              </h2>
            </div>
          ) : (
            <p>Job Certifications: 0</p>
          )}

          {(profileData.reviews && profileData.reviews.length != 0 )? (
            <div className="text-white">
              <h2>
              Reviews: 
                {profileData.reviews.map((review, index) => (
                  <h2 className="text-white" key={index}>
                    {review}
                  </h2>
                ))}
              </h2>
            </div>
          ) : (
            <p>Reviews: 0</p>
          )}

          <div className="text-white">Rating: {profileData.rating}</div>
          <div className="text-white">Number of Rating: {profileData.ratingCount}</div>{" "}
        </>
      ) : (
        <h2>No data</h2>
      )}
    </>
  );
};

export default Details;
