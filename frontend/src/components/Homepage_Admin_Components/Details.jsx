import React from "react";
import { useState, useEffect } from "react";

const Details = () => {
  const [profileData, setProfileData] = useState(null);
  useEffect(() => {
    (async () => {
      const response = await axios.get("/api/profile");
      const profile_data = response.data.profile;
      setProfileData(profile_data);
    })();
  }, []);

  return( <>
  
  </>);
};

export default Details;
