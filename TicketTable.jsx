import StatusBadge from "./StatusBadge";

function TicketTable({ tickets, onUpdateStatus }) {
  if (!Array.isArray(tickets)) return <p>No tickets found</p>;

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Subject</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={t.ticket_id}>
            <td>{t.ticket_id}</td>
            <td>{t.subject}</td>
            <td>{t.customer_name} ({t.customer_email})</td>
            <td><StatusBadge status={t.status} /></td>
            <td>
              {t.status === "Open" && (
                <button onClick={() => onUpdateStatus(t.ticket_id, "Closed")}>
                  Close
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TicketTable;
