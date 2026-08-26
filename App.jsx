import { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Use environment variable for API URL, fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const API_URL = `${API_BASE_URL}/api/tickets`;

  const fetchTickets = async () => {
    let url = API_URL;
    const params = [];
    if (statusFilter) params.push(`status=${statusFilter}`);
    if (search) params.push(`search=${search}`);
    if (params.length > 0) url += "?" + params.join("&");

    setLoading(true);
    setError("");
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setTickets(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setError("Failed to load tickets. Make sure backend is running.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, statusFilter]);

  const addTicket = async (ticketData) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      fetchTickets();
      alert("Ticket added successfully!");
    } catch (error) {
      console.error("Error adding ticket:", error);
      alert("Failed to add ticket. Make sure backend is running.");
    }
  };

  const updateStatus = async (ticketId, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      fetchTickets();
      alert("Ticket updated successfully!");
    } catch (error) {
      console.error("Error updating ticket:", error);
      alert("Failed to update ticket");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ color: "#2c3e50", marginBottom: "10px" }}>🎟️ Support CRM</h1>
      <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
        Manage support tickets efficiently
      </p>

      {error && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#ffe6e6",
            color: "#c0392b",
            borderRadius: "4px",
            marginBottom: "20px",
            border: "1px solid #e74c3c",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      <TicketForm onAdd={addTicket} />

      <div
        style={{
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#ecf0f1",
          borderRadius: "5px",
        }}
      >
        <h3 style={{ marginTop: "0" }}>Filter & Search</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <input
            placeholder="🔍 Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1",
              minWidth: "200px",
              padding: "10px",
              border: "1px solid #bdc3c7",
              borderRadius: "4px",
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #bdc3c7",
              borderRadius: "4px",
              minWidth: "150px",
            }}
          >
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#7f8c8d" }}>
          ⏳ Loading tickets...
        </div>
      ) : (
        <TicketList tickets={tickets} onUpdateStatus={updateStatus} />
      )}
    </div>
  );
}

export default App;
