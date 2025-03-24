import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi"; // Logout Icon
import { database } from "../firebaseConfig";
import { ref, set, push, update, remove, onValue } from "firebase/database";
import "./LandingPage.css"; // Landing page styling

const LandingPage = () => {
  const [username, setUsername] = useState("");
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [businessStatus, setBusinessStatus] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [editingClient, setEditingClient] = useState(null); // Stores client being edited
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      navigate("/"); // Redirect to login if no user is logged in
    }

    // Fetch clients from Firebase
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

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser"); // Remove user session
    navigate("/"); // Redirect to login page
  };

  const handleAddClient = () => {
    if (!clientId || !businessStatus || !clientAddress || !clientBusiness || !clientContact || !clientEmail) {
      alert("Please fill in all fields!");
      return;
    }

    if (editingClient) {
      // Update existing client
      update(ref(database, `client/${editingClient.id}`), {
        "client-id": clientId,
        "business-status": businessStatus,
        "client-address": clientAddress,
        "client-business": clientBusiness,
        "client-contact": clientContact,
        "client-email": clientEmail,
      });
      setEditingClient(null);
    } else {
      // Add new client
      const newClientRef = push(ref(database, "client/"));
      set(newClientRef, {
        "client-id": clientId,
        "business-status": businessStatus,
        "client-address": clientAddress,
        "client-business": clientBusiness,
        "client-contact": clientContact,
        "client-email": clientEmail,
      });
    }

    // Clear input fields after adding/updating
    setClientId("");
    setBusinessStatus("");
    setClientAddress("");
    setClientBusiness("");
    setClientContact("");
    setClientEmail("");
  };

  const handleEditClient = (clientId) => {
    navigate(`/edit-client/${clientId}`);
  };
  

  const handleDeleteClient = (id) => {
    remove(ref(database, `client/${id}`));
  };

  return (
    <div className="landing-container">
      <div className="top-bar">
        <span className="username">Welcome, {username}</span>
        <FiLogOut className="logout-icon" onClick={handleLogout} />
      </div>

      <div className="content">
      <h1>ClientTask Dashboard</h1>
      <p>Manage your clients efficiently.</p>

      {/* Button to navigate to Add Client Page */}
      <button className="add-client-btn" onClick={() => navigate("/add-client")}>
        Add New Client
      </button>

      {/* Client List */}
      <div className="client-list">
        {clients.length === 0 ? (
          <p>No clients added yet.</p>
        ) : (
          clients.map((client) => (
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
                <button className="edit-btn" onClick={() => handleEditClient(client.id)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDeleteClient(client.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
};

export default LandingPage;
