import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { InterviewProvider } from "./features/interview/interview.context";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
  return (
    <GoogleOAuthProvider clientId="709500510086-t8rcrn01o4rp42mcffkqhf0opmea9fl3.apps.googleusercontent.com">
      <AuthProvider>
        <InterviewProvider>
          <RouterProvider router={router} />
        </InterviewProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
