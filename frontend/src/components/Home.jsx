import React, { useState, useEffect } from "react";
import { Link, Element, scroller } from "react-scroll";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";

function Home() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [jobSearchTerm, setJobSearchTerm] = useState("");
  const [citySearchTerm, setCitySearchTerm] = useState("");
  const [state, setState] = useState(""); // State for selected state
  const [jobs, setJobs] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]); // State for list of states
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/retrieve/jobs/");
        const jobsData = await response.json();
        console.log("Jobs fetched:", jobsData);
        setJobs(jobsData);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/retrieve/cities/");
        const citiesData = await response.json();
        console.log("Cities fetched:", citiesData);
        setCities(citiesData);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    const fetchStates = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/retrieve/states/");
        const statesData = await response.json();
        console.log("States fetched:", statesData);
        setStates(statesData);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchJobs();
    fetchCities();
    fetchStates();
  }, []);

  useEffect(() => {
    console.log("Current job search term:", jobSearchTerm);
    const filtered = jobs.filter(job =>
      job.toLowerCase().includes(jobSearchTerm.toLowerCase())
    );
    console.log("Filtered Jobs:", filtered);
    setFilteredJobs(filtered);
  }, [jobSearchTerm, jobs]);

  useEffect(() => {
    console.log("Current city search term:", citySearchTerm);
    const filtered = cities.filter(city =>
      city.toLowerCase().includes(citySearchTerm.toLowerCase())
    );
    console.log("Filtered Cities:", filtered);
    setFilteredCities(filtered);
  }, [citySearchTerm, cities]);

  const handleJobSelect = (job) => {
    setJobSearchTerm(job);
    setFilteredJobs([]);
  };

  const handleCitySelect = (city) => {
    setCitySearchTerm(city);
    setFilteredCities([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      age: age,
      gender: gender,
      job: jobSearchTerm,
      city: citySearchTerm,
      state: state,  // Include state in form data
    };

    try {
      if (file) {
        const fileData = new FormData();
        fileData.append("file", file);

        const postResponse = await fetch("http://127.0.0.1:8000/upload/", {
          method: "POST",
          body: fileData,
        });
        const postResult = await postResponse.json();
        console.log("POST response:", postResult);
      }

      const putResponse = await fetch("http://127.0.0.1:8000/combine/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const putResult = await putResponse.json();
      console.log("PUT response:", putResult);

      const fetchResult = async () => {
        try {
          const response = await fetch("http://127.0.0.1:8000/predict/");
          const result = await response.json();
          setResult(result);
        } catch (error) {
          console.error("Error fetching result:", error);
        }
      };

      fetchResult();

      scroller.scrollTo("resultSection", {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    } catch (error) {
      console.error("Error with API requests:", error);
    }
  };

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
            <form className="user-data" onSubmit={handleSubmit}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "20px",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
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
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div>
                  <h3>Select Gender: </h3>
                  <select
                    id="gender"
                    className="input"
                    style={{
                      background: "#b29361",
                      border: "none",
                      borderRadius: "5px",
                      color: "#10443e",
                      height: "50px",
                      width: "150px",
                    }}
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
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
                value={jobSearchTerm}
                onChange={(e) => setJobSearchTerm(e.target.value)}
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                  width: "100%",
                  cursor: "text",
                }}
              />
              {filteredJobs.length > 0 && (
                <div
                  className="dropdown"
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.8)",
                    zIndex: 1,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {filteredJobs.map((job) => (
                    <div
                      key={job}
                      onClick={() => handleJobSelect(job)}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {job}
                    </div>
                  ))}
                </div>
              )}

              <h3>Enter City: </h3>
              <input
                type="text"
                placeholder="Search city..."
                className="input"
                value={citySearchTerm}
                onChange={(e) => setCitySearchTerm(e.target.value)}
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                  width: "100%",
                  cursor: "text",
                }}
              />
              {filteredCities.length > 0 && (
                <div
                  className="dropdown"
                  style={{
                    width: "100%",
                    background: "rgba(255, 255, 255, 0.8)",
                    position: "absolute",
                    zIndex: 1,
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  {filteredCities.map((city) => (
                    <div
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      style={{
                        padding: "10px",
                        borderBottom: "1px solid #ccc",
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}

              <h3>Select State: </h3>
              <select
                id="state"
                className="input"
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                  width: "100%",
                }}
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select a state...</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <h3>Upload File: </h3>
              <input
                type="file"
                className="input"
                onChange={(e) => setFile(e.target.files[0])}
                style={{
                  background: "#b29361",
                  border: "none",
                  borderRadius: "5px",
                  color: "#10443e",
                  height: "50px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <button
                  type="submit"
                  className="button submit"
                  style={{
                    background: "#10443e",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "5px",
                    height: "50px",
                    width: "150px",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Element>
      <Element name="resultSection">
        <div className="result">
          <h2>Results</h2>
          <pre>
            {result ? JSON.stringify(result, null, 2) : "No results yet"}
          </pre>
        </div>
      </Element>
    </div>
  );
}

export default Home;
