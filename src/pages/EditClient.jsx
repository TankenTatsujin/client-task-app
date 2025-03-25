import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../firebaseConfig";
import { ref, update, get } from "firebase/database";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditClient.css";

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    clientId: "",
    businessStatus: "",
    clientAddress: "",
    clientBusiness: "",
    clientContact: "",
    clientEmail: "",
  });

  useEffect(() => {
    const clientRef = ref(database, `client/${id}`);
    get(clientRef).then((snapshot) => {
      if (snapshot.exists()) {
        setClientData({
          clientId: snapshot.val()["client-id"] || "",
          businessStatus: snapshot.val()["business-status"] || "",
          clientAddress: snapshot.val()["client-address"] || "",
          clientBusiness: snapshot.val()["client-business"] || "",
          clientContact: snapshot.val()["client-contact"] || "",
          clientEmail: snapshot.val()["client-email"] || "",
        });
      } else {
        toast.error("Client not found!");
        navigate("/dashboard");
      }
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    update(ref(database, `client/${id}`), {
      "client-id": clientData.clientId,
      "business-status": clientData.businessStatus,
      "client-address": clientData.clientAddress,
      "client-business": clientData.clientBusiness,
      "client-contact": clientData.clientContact,
      "client-email": clientData.clientEmail,
    })
      .then(() => {
        toast.success("Client updated successfully!");
        navigate("/dashboard");
      })
      .catch((error) => toast.error("Error updating client: " + error.message));
  };

  return (
    <div className="edit-client-container">
      <div className="edit-client-box">
        <h2>Edit Client</h2>
        <input className="edit-input" type="text" name="clientId" value={clientData.clientId} onChange={handleChange} placeholder="Client ID" />
        <input className="edit-input" type="text" name="businessStatus" value={clientData.businessStatus} onChange={handleChange} placeholder="Business Status" />
        <input className="edit-input" type="text" name="clientAddress" value={clientData.clientAddress} onChange={handleChange} placeholder="Address" />
        <input className="edit-input" type="text" name="clientBusiness" value={clientData.clientBusiness} onChange={handleChange} placeholder="Business Name" />
        <input className="edit-input" type="text" name="clientContact" value={clientData.clientContact} onChange={handleChange} placeholder="Contact" />
        <input className="edit-input" type="email" name="clientEmail" value={clientData.clientEmail} onChange={handleChange} placeholder="Email" />
        <button className="edit-btn" onClick={handleUpdate}>Update Client</button>
        <button className="cancel-btn" onClick={() => navigate("/dashboard")}>Cancel</button>
      </div>
    </div>
  );
};

export default EditClient;
