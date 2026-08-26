
import { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  
  // Use environment variable for API URL, fallback to localhost for development
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
  const API_URL = `${API_BASE_URL}/api/tickets`;

  const fetchTickets = async () => {
    let url = API_URL;
    const params = [];
    if (statusFilter) params.push(`status=${statusFilter}`);
    if (search) params.push(`search=${search}`);
    if (params.length > 0) url += "?" + params.join("&");

    try {
      const res = await fetch(url);
      setTickets(await res.json());
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [search, statusFilter]);

  const addTicket = async (ticketData) => {
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      });
      fetchTickets();
    } catch (error) {
      console.error("Error adding ticket:", error);
    }
  };

  const updateStatus = async (ticketId, newStatus) => {
    try {
      await fetch(`${API_URL}/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchTickets();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Support CRM</h1>
      <TicketForm onAdd={addTicket} />
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Search tickets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
      <TicketList tickets={tickets} onUpdateStatus={updateStatus} />
    </div>
  );
}

export default App;
