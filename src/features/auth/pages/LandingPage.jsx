import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaRocket,
  FaBrain,
  FaChartLine,
  FaShieldAlt,
  FaUsers,
  FaBolt,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import "../style/landing-page.scss";
import Header from "../../auth/components/Header";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import axios from "axios";

const LandingPage = () => {
  const [googleError, setGoogleError] = useState(null);
  const { user, handleGoogleRegister } = useAuth();
  const navigate = useNavigate();
  const featuresRef = useRef(null);
  const ctaRef = useRef(null);

  // Smooth scroll to section
  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Animate on scroll (simple intersection observer)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        },
      )
      .then(async (resp) => {
        await handleGoogleRegister({
          username: resp?.data?.name,
          email: resp?.data?.email,
          picture: resp?.data?.picture,
        });
      })
      .catch((error) => setGoogleError(error))
      .finally(() => {
        navigate("/");
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => setGoogleError(error),
  });

  return (
    <>
      <Header />
      <main className="landing-page">
        {/* 🌟 Hero Section */}
        <section className="hero">
          <div className="hero__background-glow" />
          <div className="container">
            <div className="hero__content animate-on-scroll">
              <div className="hero__badge">
                <FaBolt className="hero__badge-icon" />
                <span>AI-Powered Interview Prep</span>
              </div>

              <h1 className="hero__title">
                Ace Your Next Interview with{" "}
                <span className="gradient-text">Intelligent Strategy</span>
              </h1>

              <p className="hero__subtitle">
                Upload your resume, paste the job description, and let our AI
                craft a personalized interview plan with targeted questions,
                skill gap analysis, and a day-by-day preparation roadmap.
              </p>

              <div className="hero__actions">
                {
                  user ? <button
                  onClick={()=>navigate('/')}
                  className="btn btn--primary btn--xlarge"
                >
                  Generate Interview Report
                  <IoIosArrowForward className="btn__icon" />
                </button> : <button
                  onClick={login}
                  className="btn btn--primary btn--xlarge"
                >
                  Get Started Free
                  <IoIosArrowForward className="btn__icon" />
                </button>
                }
                <button
                  onClick={() => scrollToSection(featuresRef)}
                  className="btn btn--secondary btn--large"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div className="hero__decorations">
              <div className="floating-orb floating-orb--1" />
              <div className="floating-orb floating-orb--2" />
              <div className="floating-orb floating-orb--3" />
            </div>
          </div>
        </section>

        {/* ✨ Features Section */}
        <section ref={featuresRef} className="features animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Everything You Need to{" "}
                <span className="gradient-text">Succeed</span>
              </h2>
              <p className="section-subtitle">
                Powerful AI-driven tools designed to give you the competitive
                edge
              </p>
            </div>

            <div className="features__grid">
              {[
                {
                  icon: <FaBrain />,
                  title: "Smart Question Generation",
                  desc: "AI analyzes job requirements to create targeted technical & behavioral questions with model answers.",
                },
                {
                  icon: <FaChartLine />,
                  title: "Match Score Analysis",
                  desc: "Get an instant compatibility score between your profile and the role, with actionable improvement tips.",
                },
                {
                  icon: <FaRocket />,
                  title: "Personalized Roadmap",
                  desc: "Receive a customized day-by-day preparation plan focused on your specific skill gaps.",
                },
                {
                  icon: <FaShieldAlt />,
                  title: "Privacy First",
                  desc: "Your data is encrypted and never shared. Delete your reports anytime with one click.",
                },
                {
                  icon: <FaUsers />,
                  title: "Role-Specific Prep",
                  desc: "Tailored strategies for SWE, PM, Data Science, DevOps, and 50+ other tech roles.",
                },
                {
                  icon: <FaBolt />,
                  title: "Instant Results",
                  desc: "Generate your complete interview strategy in under 30 seconds—no waiting, no hassle.",
                },
              ].map((feature, idx) => (
                <div key={idx} className="feature-card animate-on-scroll">
                  <div className="feature-card__icon">{feature.icon}</div>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__desc">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🔄 How It Works */}
        <section className="how-it-works animate-on-scroll">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Get Started in{" "}
                <span className="gradient-text">3 Simple Steps</span>
              </h2>
            </div>

            <div className="steps__grid">
              {[
                {
                  step: "01",
                  title: "Upload & Describe",
                  desc: "Share your resume and paste the job description you're targeting.",
                },
                {
                  step: "02",
                  title: "AI Analysis",
                  desc: "Our engine analyzes requirements, your profile, and industry standards.",
                },
                {
                  step: "03",
                  title: "Get Your Plan",
                  desc: "Receive a personalized interview strategy with questions, tips, and roadmap.",
                },
              ].map((step, idx) => (
                <div key={idx} className="step-card">
                  <div className="step-card__number">{step.step}</div>
                  <h3 className="step-card__title">{step.title}</h3>
                  <p className="step-card__desc">{step.desc}</p>
                  {idx < 2 && <div className="step-connector" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 🚀 CTA Section */}
        <section ref={ctaRef} className="cta animate-on-scroll">
          <div className="container">
            <div className="cta__content">
              <h2 className="cta__title">
                Ready to Transform Your{" "}
                <span className="gradient-text">Interview Journey?</span>
              </h2>
              <p className="cta__subtitle">
                Join thousands of professionals who've used InterBuddy to land their
                dream roles. Start preparing smarter today—no credit card
                required.
              </p>
              <div className="cta__actions">
                {
                  user ? <button
                  onClick={()=>navigate('/interviewCall')}
                  className="btn btn--primary btn--xlarge"
                >
                  Try AI mock interviewing
                  <IoIosArrowForward className="btn__icon" />
                </button> : <button
                  onClick={login}
                  className="btn btn--primary btn--xlarge"
                >
                  Create Your Free Account
                  <IoIosArrowForward className="btn__icon" />
                </button>
                }
                
                <p className="cta__note">Free forever plan • Cancel anytime</p>
              </div>
            </div>
          </div>
          <div className="cta__background-glow" />
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <div className="container">
            <div className="landing-footer__content">
              <div className="landing-footer__brand">
                <span className="landing-footer__logo">💻InterBuddy</span>
                <p className="landing-footer__tagline">
                  AI-powered interview preparation for the modern professional.
                </p>
              </div>
            </div>

            <div className="landing-footer__bottom">
              <p>© {new Date().getFullYear()} InterBuddy. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default LandingPage;
