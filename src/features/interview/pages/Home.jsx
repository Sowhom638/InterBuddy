// Home.jsx
import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaSuitcase  } from "react-icons/fa";
import { IoIosCloudUpload } from "react-icons/io";
import "../style/home.scss";
import { useInterview } from "../hooks/useInterview";
import Header from "../../auth/components/Header";
import { MdArrowCircleRight } from "react-icons/md";

function Home() {
  const { loading, generateReport } = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const resumeInputRef = useRef();
  const navigate = useNavigate();
  const handleFileSelect = (file) => {
    // Optional: validate file
    if (!file) return;
    console.log(file);

    const validTypes = ["application/pdf"];
    const isValidType = validTypes.includes(file.type);
    const isValidSize = file.size <= 3 * 1024 * 1024; // 3MB

    if (!isValidType) {
      alert("Please upload a PDF or DOCX file.");
      return;
    }
    if (!isValidSize) {
      alert("File size must be under 3MB.");
      return;
    }

    setSelectedFile(file); // 👈 Store in state
  };

   async function handleGenerateReport(e) {
    e.preventDefault();

    const resumeFile = selectedFile;
    if (!resumeFile) {
      alert("Please upload your resume.");
      return;
    }

    try {
      console.log("🚀 Generating report...");
      const data = await generateReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });

      console.log("✅ Report generated:", data);
      const interviewId = data?._id;

      if (!interviewId) {
        throw new Error("No interview ID returned from server");
      }

      navigate(`/interview/${interviewId}`);
    } catch (error) {
      console.error("❌ Failed to generate report:", error);
      alert("Failed to generate report. Check console for details.");
      // Don't navigate on error!
    }
  }

  if (loading) {
    return (
      <main>
        <h1>Loading your interview plan...</h1>
      </main>
    );
  }

  return (
    <>
    <Header />
        <main className="home">
      <div className="container">
        <header className="header">
          <h1 className="title">
            Create Your Custom{" "}
            <span className="highlight-text">Interview Plan</span>
          </h1>
          <p className="subtitle">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        <div className="interview-input-group">
          <div className="left">
            <div className="section-header">
              <label htmlFor="jobDescription">
                <span className="icon">
                  <FaSuitcase />
                </span>{" "}
                Target Job Description
              </label>
              <span className="required">Required</span>
            </div>
            <div className="textarea-wrapper">
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                name="jobDescription"
                id="jobDescription"
                placeholder="Paste the full job description here...&#10;&#10;e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
              ></textarea>
              <span className="char-counter">{jobDescription.split(" ").length - 1} / 15000</span>
            </div>
          </div>

          <div className="right">
            <div className="section-header">
              <label>
                <span className="icon">
                  <FaUser />
                </span>{" "}
                Your Profile
              </label>
            </div>

            <div className="upload-section">
              <label className="upload-label">
                Upload Resume <small className="highlight">(Use resume)</small>
              </label>
              <div
                className="file-drop-area"
                onClick={() => resumeInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files[0];
                  handleFileSelect(file);
                }}
              >
                <div className="upload-icon">
                  <IoIosCloudUpload />
                </div>

                {/* Show selected file name or placeholder */}
                {selectedFile ? (
                  <p className="upload-success">✓ {selectedFile.name}</p>
                ) : (
                  <>
                    <p className="upload-text">
                      Click to upload or drag & drop
                    </p>
                    <p className="upload-subtext">PDF or DOCX (Max 3MB)</p>
                  </>
                )}
              </div>

              {/* 👈 Hidden file input */}
              <input
                ref={resumeInputRef}
                hidden
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.docx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  handleFileSelect(file);
                }}
              />
            </div>

            <div className="divider">
              <span>AND</span>
            </div>

            <div className="self-desc-section">
              <label htmlFor="selfDescription" className="upload-label">
                Quick Self-Description
              </label>
              <textarea
                value={selfDescription}
                onChange={(e) => setSelfDescription(e.target.value)}
                name="selfDescription"
                id="selfDescription"
                placeholder="Briefly describe your experience, key skills, and years of experience."
              ></textarea>
            </div>

            <div className="info-box">
              <span className="info-icon">ℹ️</span>
              <p>
                Both <strong>Resume</strong> and a{" "}
                <strong>Self Description</strong> is required to generate a
                personalized plan.
              </p>
            </div>
          </div>
        </div>

        <div className="footer-section">
          <Link to={'/interviewCall'} className="generation-info">
            <span className="ai-badge">🤖</span>
            <span>Try AI-Powered mock interview</span> <MdArrowCircleRight style={{fontSize: "32px"}} />
          </Link>
          <button
            onClick={handleGenerateReport}
            className="button primary-button generate-btn"
          >
            <span className="btn-icon">✨</span>
            Generate My Interview Strategy
          </button>
        </div>
        <div className="landing-footer">
              <p>© {new Date().getFullYear()} InterBuddy. All rights reserved.</p>
        </div>
      </div>
    </main>
    </>

  );
}

export default Home;
