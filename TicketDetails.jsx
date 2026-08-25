import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function TicketDetail() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/tickets/${ticketId}`)
      .then(res => setTicket(res.data))
      .catch(err => console.error(err));
  }, [ticketId]);

  const handleDelete = () => {
    axios.delete(`http://127.0.0.1:8000/api/tickets/${ticketId}`)
      .then(() => {
        alert("Ticket deleted successfully");
        navigate("/"); // redirect to list page
      })
      .catch(err => console.error(err));
  };

  if (!ticket) return <p>Loading...</p>;

  return (
    <div className="p-4 border rounded">
      <h2 className="text-xl font-bold">{ticket.subject}</h2>
      <p>{ticket.description}</p>
      <p>Status: {ticket.status}</p>

      {/* 👇 Delete button */}
      <button
        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
        onClick={handleDelete}
      >
        Delete Ticket
      </button>
    </div>
  );
}

export default TicketDetail;
