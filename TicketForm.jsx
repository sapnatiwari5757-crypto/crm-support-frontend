import { useState } from "react";

function TicketForm({ onAdd }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim()) return;
    onAdd({
      subject,
      description,
      customer_name: customerName,
      customer_email: customerEmail,
      status: "Open",
    });
    setSubject("");
    setDescription("");
    setCustomerName("");
    setCustomerEmail("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        placeholder="Customer Name"
      />
      <input
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
        placeholder="Customer Email"
      />
      <button type="submit">Add Ticket</button>
    </form>
  );
}

export default TicketForm;
