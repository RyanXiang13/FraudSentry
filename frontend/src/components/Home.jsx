import React from "react";
import { Link, Element } from "react-scroll";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import test from "../assets/test.png";

function Home() {
return (
    <div>
        <div className="home">
            <div className="page home">
        
                <div className="text">
                <h1>Welcome to FraudSentry</h1>
                <p>Protect yourself from fraud and scams with FraudSentry.</p>
                <p>Our advanced fraud detection system analyzes your credit card statements and provides instant results.</p>
                </div>
  
                <Link to="nextPage" smooth={true} duration={500}>
                    <div className="button getstarted">Get Started</div>
                </Link>
            </div>
        </div>

        <Element name="nextPage">
            <div className="home">
                <div className="page2">
                    <div className="step1">
                        <h2>Step 1: Submit your credit card statement</h2>
                        <p>Upload your financial reports and get your results instantly! Our system will analyze your statements to identify any potential fraudulent activities.</p>
                        <form>
                            <input
                                type="file"
                                id="statement"
                                name="statement"
                                style={{ display: "none" }}
                            />
                            <label htmlFor="statement" className="custom-file-upload">
                                Choose File
                            </label>
                            <div>
                                <input
                                    type="submit"
                                    className="custom-file-upload"
                                    value="Submit"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="step2">
                        <h2>Step 2: Fraud Detection Result</h2>
                        <p>Once you submit your credit card statement, the fraud detection result will be displayed here. Our system will provide detailed information about any potential fraudulent transactions.</p>
                    </div>
                </div>
            </div>
        </Element>
    </div>
);
}

export default Home;
