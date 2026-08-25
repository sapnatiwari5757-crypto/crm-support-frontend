import React, { useEffect, useState } from "react";
import axios from "axios";

function TicketList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/tickets")
      .then(res => setTickets(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (ticketId) => {
    axios.delete(`http://127.0.0.1:8000/api/tickets/${ticketId}`)
      .then(() => {
        alert("Ticket deleted successfully");
        setTickets(tickets.filter(t => t.ticket_id !== ticketId));
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Tickets</h2>
      {tickets.map(ticket => (
        <div key={ticket.ticket_id} className="p-4 border rounded mb-2">
          <h3 className="font-bold">{ticket.subject}</h3>
          <p>{ticket.description}</p>
          <p>Ticket ID: {ticket.ticket_id}</p>   {/* 👈 ID added */}
          <p>Status: {ticket.status}</p>

          <button
            className="bg-red-500 text-white px-3 py-1 rounded mt-2"
            onClick={() => handleDelete(ticket.ticket_id)}
          >
            Delete
          </button>

          {ticket.status === "Open" && (
            <button
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2 ml-2"
              onClick={() => {
                axios.put(`http://127.0.0.1:8000/api/tickets/${ticket.ticket_id}`, {
                  status: "Closed"
                })
                .then(() => {
                  alert("Ticket closed successfully");
                  setTickets(tickets.map(t =>
                    t.ticket_id === ticket.ticket_id ? { ...t, status: "Closed" } : t
                  ));
                })
                .catch(err => console.error(err));
              }}
            >
              Mark as Closed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TicketList;
