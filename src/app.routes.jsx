import {createBrowserRouter, Navigate} from "react-router-dom";
import LandingPage from "./features/auth/pages/LandingPage";
import Home from "./features/interview/pages/Home";
import Protected from "./features/auth/components/Protected";
import Interview from "./features/interview/pages/Interview";
import History from "./features/interview/pages/History";
import InterviewCall from "./features/vapi/pages/InterviewCall";

export const router = createBrowserRouter([
    {
        path: "/home",
        element: <LandingPage />
    },
    {
        path: "/",
        element: <Protected><Home /></Protected>
    },
    {
        path: "/history",
        element: <Protected><History /></Protected>
    },
    {
        path: "/interview/:interviewId",
        element: <Protected><Interview /></Protected>
    },
    {
        path: "/interviewCall",
        element: <Protected><InterviewCall /></Protected>
    },
    {
        path: "*",
        element: <div>404 - Page not found. Try <a href="/home">/home</a></div>
    }
])