import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import "../style/loading.scss"
import Header from "./Header";

function Protected({children}) {
  const { loading, user } = useAuth();
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
  if (!user) return <Navigate to={'/home'} replace/>;
  return children;
}

export default Protected;
