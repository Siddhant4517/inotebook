import React, { useState, useEffect } from 'react';

const About = () => {
  const [aboutInfo, setAboutInfo] = useState(null);

  useEffect(() => {
    // Simulate fetching data from an API or any other source
    const fetchAboutInfo = async () => {
      const aboutData = {
        description: "We are a company dedicated to providing excellent note-taking services.",
        mission: "To help people organize their thoughts and ideas efficiently.",
        vision: "To be the leading note-taking app in the industry."
      };

      // Simulate an API call with a timeout
      setTimeout(() => {
        setAboutInfo(aboutData);
      }, 1000);
    };

    fetchAboutInfo();
  }, []);

  return (
    <div className="about-page c1">
      <h1>About Us</h1>
      <p>{aboutInfo ? aboutInfo.description : "Loading..."}</p>
      <div className="about-details">
        <h2>Our Mission</h2>
        <p>{aboutInfo ? aboutInfo.mission : "Loading..."}</p>
        <h2>Our Vision</h2>
        <p>{aboutInfo ? aboutInfo.vision : "Loading..."}</p>
      </div>
    </div>
  );
};

export default About;
