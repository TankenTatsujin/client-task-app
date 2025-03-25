import React, { useState } from "react";
import { database } from "../firebaseConfig";
import { ref, set, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showSignup) {
      if (!email.endsWith("@gmail.com")) {
        toast.error("Please enter a valid Gmail address.");
        return;
      }

      try {
        const userRef = ref(database, "user/" + username);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          toast.error("User already exists!");
        } else {
          await set(userRef, {
            "user-name": username,
            "user-email": email,
            "password": password,
          });
          toast.success("Signup successful! You can now log in.");
          setShowSignup(false);
        }
      } catch (error) {
        toast.error("Signup failed: " + error.message);
      }
    } else {
      try {
        const userRef = ref(database, "user/" + username);
        const snapshot = await get(userRef);

        if (snapshot.exists() && snapshot.val().password === password) {
          localStorage.setItem("loggedInUser", username);
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          toast.error("Invalid username or password.");
        }
      } catch (error) {
        toast.error("Login failed: " + error.message);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>ClientTask</h1>
        <form onSubmit={handleSubmit}>
          {showSignup && (
            <div className="input-group">
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          )}
          <div className="input-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">{showSignup ? "Sign Up" : "Login"}</button>
        </form>
        <p onClick={() => setShowSignup(!showSignup)} className="toggle-link">
          {showSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Login;
