import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { database } from "../firebaseConfig";
import { ref, set, push, update, remove, onValue } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./LandingPage.css";

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      navigate("/");
    }

    const clientsRef = ref(database, "client/");
    onValue(clientsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const clientList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setClients(clientList);
      }
    });
  }, [navigate]);

  return (
    <div className="landing-container">
      <div className="top-bar">
        <span className="username">Welcome, {username}</span>
        <FiLogOut className="logout-icon" onClick={() => { localStorage.removeItem("loggedInUser"); navigate("/"); }} />
      </div>

      <div className="content">
        <h1>ClientTask Dashboard</h1>
        <p>Manage your clients efficiently.</p>
        <button className="add-client-btn" onClick={() => navigate("/add-client")}>Add New Client</button>
        <div className="client-list">
          {clients.length === 0 ? <p>No clients added yet.</p> : clients.map((client) => (
            <div key={client.id} className="client-card">
              <div>
                <h3>{client["client-business"]}</h3>
                <p>ID: {client["client-id"]}</p>
                <p>Status: {client["business-status"]}</p>
                <p>Address: {client["client-address"]}</p>
                <p>Contact: {client["client-contact"]}</p>
                <p>Email: {client["client-email"]}</p>
              </div>
              <div>
                <button className="edit-btn" onClick={() => navigate(`/edit-client/${client.id}`)}>Edit</button>
                <button className="delete-btn" onClick={() => remove(ref(database, `client/${client.id}`))
                  .then(() => toast.success("Client deleted successfully!"))
                  .catch((error) => toast.error("Error deleting client: " + error.message))}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
