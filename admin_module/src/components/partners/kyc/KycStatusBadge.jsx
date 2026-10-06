export default function KycStatusBadge({ status }) {
  const statusConfig = {
    pending: {
      label: "Pending",
      className: "bg-amber-100 text-amber-700",
      dotClassName: "bg-amber-500",
    },

    verified: {
      label: "Verified",
      className: "bg-green-100 text-green-700",
      dotClassName: "bg-green-500",
    },

    rejected: {
      label: "Rejected",
      className: "bg-red-100 text-red-700",
      dotClassName: "bg-red-500",
    },
  };

  const config =
    statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${config.className}`}
    >
      <span
        className={`mr-2 h-1.5 w-1.5 rounded-full ${config.dotClassName}`}
      />

      {config.label}
    </span>
  );
}
