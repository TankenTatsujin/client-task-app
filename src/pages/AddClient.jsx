import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebaseConfig";
import { ref, push, set } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddClient.css";

const AddClient = () => {
  const [clientId, setClientId] = useState("");
  const [businessStatus, setBusinessStatus] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientBusiness, setClientBusiness] = useState("");
  const [clientContact, setClientContact] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const navigate = useNavigate();

  const handleAddClient = () => {
    if (!clientId || !businessStatus || !clientAddress || !clientBusiness || !clientContact || !clientEmail) {
      toast.error("Please fill in all fields!");
      return;
    }

    const newClientRef = push(ref(database, "client/"));
    set(newClientRef, {
      "client-id": clientId,
      "business-status": businessStatus,
      "client-address": clientAddress,
      "client-business": clientBusiness,
      "client-contact": clientContact,
      "client-email": clientEmail,
    }).then(() => {
      toast.success("Client added successfully!");
      navigate("/dashboard");
    });
  };

  return (
    <div className="add-client-container">
      <div className="client-form">
        <h2>Add New Client</h2>
        <input type="text" placeholder="Client ID" value={clientId} onChange={(e) => setClientId(e.target.value)} />
        <input type="text" placeholder="Business Status" value={businessStatus} onChange={(e) => setBusinessStatus(e.target.value)} />
        <input type="text" placeholder="Client Address" value={clientAddress} onChange={(e) => setClientAddress(e.target.value)} />
        <input type="text" placeholder="Client Business" value={clientBusiness} onChange={(e) => setClientBusiness(e.target.value)} />
        <input type="text" placeholder="Client Contact" value={clientContact} onChange={(e) => setClientContact(e.target.value)} />
        <input type="email" placeholder="Client Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
        <button className="add-btn" onClick={handleAddClient}>Add Client</button>
        <button className="back-btn" onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
      </div>
    </div>
  );
};

export default AddClient;
