import React, { useState, useEffect } from "react";
import { Link, Element } from "react-scroll";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import test from "../assets/test.png";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [locations, setLocations] = useState([]);
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [locationSearchTerm, setLocationSearchTerm] = useState("");

  useEffect(() => {
    // Fetch job options from the database
    fetch("/api/jobs")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));

    // Fetch location options from the database
    fetch("/api/locations")
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error("Error fetching locations:", error));
  }, []);
  // filter jobs based on search term
  const filteredJobs = jobs.filter((job) =>
    job.name.toLowerCase().includes(jobSearchTerm.toLowerCase())
  );
  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(locationSearchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="page">
        <div className="text">
          <h1>Welcome to FraudSentry</h1>
          <p>Protect yourself from fraud and scams with FraudSentry.</p>
          <p>
            Our advanced fraud detection system analyzes your credit card
            statements and provides instant results.
          </p>
        </div>

        <Link to="nextPage" smooth={true} duration={500}>
          <div className="button getstarted">Get Started</div>
        </Link>
      </div>
      <Element name="nextPage">
        <div className="page2">
          <h2>Step 1: Submit your credit card statement</h2>
          <p>
            Upload your financial reports and get your results instantly! Our
            system will analyze your statements to identify any potential
            fraudulent activities.
          </p>
          <div className="fraud-data">
            <form className="user-data">
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px',justifyContent:'center', alignContent: 'center' }}>
  <div>
    <h3>Enter age: </h3>
    <input
      type="number"
      id="age"
      className="input"
      style={{
        background: "#b29361",
        border: "none",
        borderRadius: "5px",
        color: "#10443e",
        height: "50px",
      }}
    />
  </div>
  <div>
    <h3>Enter sex: </h3>
    <select
      id="sex"
      className="input"
      style={{
        background: "#b29361",
        border: "none",
        borderRadius: "5px",
        color: "#10443e",
        height: "50px",
        width: "150px", // Corrected typo from 'wdith' to 'width'
      }}
    >
      <option value="Male">Male</option>
      <option value="Female">Female</option>
    </select>
  </div>
</div>
              <h3>Enter Job: </h3>
              <input
                type="text"
                placeholder="Search job..."
                className="input"
                onChange={(e) => setJobSearchTerm(e.target.value)}
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                }}
              />
              <select
                id="job"
                className="input"
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                }}
              >
                {filteredJobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.name}
                  </option>
                ))}
              </select>

              <h3>Enter Location: </h3>
              <input
                type="text"
                placeholder="Search location..."
                className="input"
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                }}
                onChange={(e) => setLocationSearchTerm(e.target.value)}
              />
              <select
                id="location"
                className="input"
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                }}
              >
                {filteredLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </div>
      </Element>
    </div>
  );
}

export default Home;
