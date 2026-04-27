// Interview.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaSearch,
  FaChevronDown,
  FaChevronUp,
  FaBullseye,
  FaLightbulb,
  FaCheckCircle,
} from "react-icons/fa";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import Header from "../../auth/components/Header";

function Interview() {
  const { interviewId } = useParams();
  const [activeTab, setActiveTab] = useState("technical");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { report, loading, getReportById } = useInterview();

  useEffect(() => {
      if (interviewId) getReportById(interviewId);
  }, []);
  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "#e1034d";
      case "medium":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#8892b0";
    }
  };

  const filteredTechnicalQuestions = report?.technicalQuestions?.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredBehavioralQuestions = report?.behavioralQuestions?.filter((q) =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  if (loading) {
    return (
      <main className="loading">
        <Header />
        <div className="loading-container">
          <div className="spinner" />
        </div>
      </main>
    );
  }
  return (
    <>
    <Header />
        <main className="interview">
      <div className="container">
        <div className="interview-layout">
          {/* Left Sidebar - Navigation */}
          <aside className="sidebar left-sidebar">
            <div className="match-score">
              <div className="score-circle" style={{background: `conic-gradient(#e1034d 0deg ${(360/100)*report?.matchScore}deg, rgba(26, 31, 39, 0.8) ${(360/100)*report?.matchScore}deg 360deg)`}}>
                <span className="score">{report?.matchScore}</span>
                <span className="score-label">Match</span>
              </div>
              <p className="score-text" style={{color: `${report?.matchScore && report?.matchScore > 90 ? "#10b981" : "#d61052"}`}}>{report?.matchScore && report?.matchScore > 90 ? "Strong match for this role" : "Not a strong match for this role"}</p>
            </div>

            <nav className="nav-menu">
              <ul>
                <li
                  className={`nav-item ${activeTab === "technical" ? "active" : ""}`}
                >
                  <button onClick={() => setActiveTab("technical")}>
                    Technical questions
                  </button>
                </li>
                <li
                  className={`nav-item ${activeTab === "behavioral" ? "active" : ""}`}
                >
                  <button onClick={() => setActiveTab("behavioral")}>
                    Behavioral questions
                  </button>
                </li>
                <li
                  className={`nav-item ${activeTab === "roadmap" ? "active" : ""}`}
                >
                  <button onClick={() => setActiveTab("roadmap")}>
                    Road Map
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section className="main-content">
            {activeTab === "technical" && (
              <div className="questions-section">
                <div className="section-header">
                  <h2 className="highlight-text">Technical Questions</h2>
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="questions-list">
                  {filteredTechnicalQuestions?.map((item, index) => (
                    <div
                      key={index}
                      className={`question-card ${expandedQuestion === index ? "expanded" : ""}`}
                    >
                      <div
                        className="question-header"
                        onClick={() => toggleQuestion(index)}
                      >
                        <h3>{item.question}</h3>
                        <button className="toggle-btn">
                          {expandedQuestion === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </div>
                      {expandedQuestion === index && (
                        <div className="question-details">
                          <div className="intention">
                            <FaBullseye className="icon" />
                            <div>
                              <strong>Interviewer's Intention:</strong>
                              <p>{item.intention}</p>
                            </div>
                          </div>
                          <div className="answer">
                            <FaLightbulb className="icon" />
                            <div>
                              <strong>Suggested Answer:</strong>
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "behavioral" && (
              <div className="questions-section">
                <div className="section-header">
                  <h2 className="highlight-text">Behavioral Questions</h2>
                  <div className="search-box">
                    <FaSearch />
                    <input
                      type="text"
                      placeholder="Search questions..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <div className="questions-list">
                  {filteredBehavioralQuestions?.map((item, index) => (
                    <div
                      key={index}
                      className={`question-card ${expandedQuestion === index ? "expanded" : ""}`}
                    >
                      <div
                        className="question-header"
                        onClick={() => toggleQuestion(index)}
                      >
                        <h3>{item.question}</h3>
                        <button className="toggle-btn">
                          {expandedQuestion === index ? (
                            <FaChevronUp />
                          ) : (
                            <FaChevronDown />
                          )}
                        </button>
                      </div>
                      {expandedQuestion === index && (
                        <div className="question-details">
                          <div className="intention">
                            <FaBullseye className="icon" />
                            <div>
                              <strong>Interviewer's Intention:</strong>
                              <p>{item.intention}</p>
                            </div>
                          </div>
                          <div className="answer">
                            <FaLightbulb className="icon" />
                            <div>
                              <strong>Suggested Answer:</strong>
                              <p>{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "roadmap" && (
              <div className="roadmap-section">
                <h2>{report?.preparationPlan?.length}-Day Preparation Plan</h2>
                <div className="roadmap-timeline">
                  {report?.preparationPlan?.map((day, index) => (
                    <div key={index} className="roadmap-day">
                      <div className="day-header">
                        <div className="day-number">Day {day.day}</div>
                        <h3>{day.focus}</h3>
                      </div>
                      <ul className="tasks-list">
                        {day.tasks.map((task, taskIndex) => (
                          <li key={taskIndex}>
                            <FaCheckCircle className="task-icon" />
                            <span>{task}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Right Sidebar - Skill Gaps */}
<aside className="sidebar right-sidebar">
  <div className="skill-gaps-section">
    <h3 className="section-title">Skill Gaps</h3>
    <div className="skill-tags">
      {report?.skillGaps?.map((gap, index) => (
        <div
          key={index}
          className="skill-tag"
          style={{ borderColor: getSeverityColor(gap.severity) }}
        >
          <span className="skill-name">{gap.skill}</span>
          <span
            className="skill-severity"
            style={{
              backgroundColor: getSeverityColor(gap.severity),
              color: '#0f0f1a' // Ensure text contrast
            }}
          >
            {gap.severity}
          </span>
        </div>
      ))}
    </div>
  </div>
</aside>
        </div>
      </div>
    </main>
    </>

  );
}

export default Interview;
