import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbReportAnalytics } from "react-icons/tb";
import { FaClock } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useInterview } from "../hooks/useInterview";
import Header from "../../auth/components/Header";
import "../style/history.scss";

function History() {
  const { reports, getReports, loading } = useInterview();
  const navigate = useNavigate();

  useEffect(() => {
    getReports();
  }, []);

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
      <main className="history-page">
        <div className="container">
          {reports?.length > 0 ? (
            <section
              className="recent-reports"
              aria-labelledby="recent-reports-heading"
            >
              <h2 id="recent-reports-heading">
                <TbReportAnalytics />
                My Recent Interview Plans
              </h2>
              <ul className="reports-list" role="list">
                {reports?.map((report) => (
                  <li
                    key={report._id}
                    className="report-item"
                    onClick={() => navigate(`/interview/${report._id}`)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        navigate(`/interview/${report._id}`);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${report.title || "Untitled Position"} interview plan`}
                  >
                    <h3>{report?.title || "Untitled Position"}</h3>
                    <p className="report-meta">
                      <FaClock />
                      {new Date(report?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p
                      className={`match-score ${
                        report?.matchScore >= 90
                          ? "high"
                          : report?.matchScore >= 60
                          ? "medium"
                          : "low"
                      }`}
                    >
                      Match Score: {report?.matchScore}%
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : (
            <section className="empty-state">
              <h1 className="title">
                No Interview Plans Yet
              </h1>
              <Link to={"/"} className="subtitle " style={{color: "#e1034d", textDecoration: "none", display:"flex", alignItems: "center", justifyContent: "center", gap: "5px"}}>
                Create your first AI-powered interview plan to get started <MdKeyboardDoubleArrowRight />
              </Link>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

export default History;