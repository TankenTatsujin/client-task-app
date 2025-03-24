import React, { useState } from "react";
import { database } from "../firebaseConfig";
import { ref, set, get, child } from "firebase/database";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "./Login.css";

const Login = () => {
  const [showSignup, setShowSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showSignup) {
      if (!email.endsWith("@gmail.com")) {
        alert("Please enter a valid Gmail address.");
        return;
      }

      try {
        const dbRef = ref(database);
        const userRef = child(dbRef, "user/" + username);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          alert("User already exists!");
        } else {
          await set(userRef, {
            "user-name": username,
            "user-email": email,
            "password": password,
          });
          alert("Signup successful! You can now log in.");
          setShowSignup(false);
        }
      } catch (error) {
        console.error("Error signing up:", error);
      }
    } else {
      try {
        const dbRef = ref(database);
        const userRef = child(dbRef, "user/" + username);
        const snapshot = await get(userRef);

        if (snapshot.exists() && snapshot.val().password === password) {
          localStorage.setItem("loggedInUser", username); // Store user session
          alert("Login successful!");
          navigate("/dashboard"); // ✅ Redirect to Landing Page
        } else {
          alert("Invalid credentials.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
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
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">{showSignup ? "Sign Up" : "Login"}</button>
          </div>
        </form>
        <p onClick={() => setShowSignup(!showSignup)} className="toggle-link">
          {showSignup ? (
            <>Already have an account? <span className="highlight">Login</span></>
          ) : (
            <>Don't have an account? <span className="highlight">Sign Up</span></>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
