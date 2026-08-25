
import { useState, useEffect } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";

function App() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const fetchTickets = async () => {
    let url = "http://localhost:8000/api/tickets";
    const params = [];
    if (statusFilter) params.push(`status=${statusFilter}`);
    if (search) params.push(`search=${search}`);
    if (params.length > 0) url += "?" + params.join("&");

    const res = await fetch(url);
    setTickets(await res.json());
  };

  useEffect(() => {
    fetchTickets();
  }, [search, statusFilter]);

  const addTicket = async (ticketData) => {
    await fetch("http://localhost:8000/api/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticketData),
    });
    fetchTickets();
  };

  const updateStatus = async (ticketId, newStatus) => {
    await fetch(`http://localhost:8000/api/tickets/${ticketId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTickets();
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
