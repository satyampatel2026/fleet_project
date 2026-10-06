export default function KycDetailItem({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
        {label}
      </p>

      <div className="mt-1 break-words text-sm font-medium text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}
