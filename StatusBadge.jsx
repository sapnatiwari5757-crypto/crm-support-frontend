function StatusBadge({ status }) {
  let color = "gray";
  if (status === "Open") color = "green";
  if (status === "In Progress") color = "orange";
  if (status === "Closed") color = "red";

  return (
    <span
      style={{
        padding: "4px 8px",
        borderRadius: "6px",
        backgroundColor: color,
        color: "white",
        fontSize: "12px",
      }}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
