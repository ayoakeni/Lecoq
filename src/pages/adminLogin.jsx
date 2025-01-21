import React, { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import useAuth from "../utils/useAuth";
import { Helmet } from "react-helmet";
import displayImage from "../assets/images/mad-designer.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/admin");
    } catch (error) {
      setLoading(false);

      // console.log("Error Message:", error.message);

      const errorMessages = {
        "auth/invalid-email": "The email address is not valid.",
        "auth/user-disabled": "This account has been disabled.",
        "auth/user-not-found": "No account found with this email.",
        "auth/wrong-password": "Incorrect password. Please try again.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/invalid-credential": "Invalid credentials. Please check your email and password.",
        "auth/network-request-failed": "Please check your internent and try again."
      };
      const userFriendlyMessage = errorMessages[error.code] || "An unexpected error occurred. Please try again.";
      setError(userFriendlyMessage);
    }
  };

  return (
    <div className="login-container">
      <Helmet>
        <title>Admin Login</title>
        <meta property="og:title" content="Admin Login" />
        <meta property="og:description" content="Login to take control of your blogs" />
        <meta property="og:image" content={displayImage} />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="login-form">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="email">
              <i className="fa-regular fa-envelope"></i>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password">
              <i className="fa-solid fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
                required
              />
              <i
                className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                onClick={() => setShowPassword((prev) => !prev)}
                style={{ cursor: "pointer" }}
                title={showPassword ? "Hide password" : "Show password"}
              ></i>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? (
              <>
                Logging in... <span className="loader"></span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
