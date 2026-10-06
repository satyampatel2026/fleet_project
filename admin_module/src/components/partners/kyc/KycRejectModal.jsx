export default function KycRejectModal({
  open,
  rejectionReason,
  rejectError,
  actionLoading,
  onChange,
  onCancel,
  onReject,
}) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="border-b border-gray-200 px-5 py-4 sm:px-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Reject KYC
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Please provide a reason for rejecting this KYC.
          </p>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6">
          <label
            htmlFor="rejection-reason"
            className="text-sm font-medium text-gray-700"
          >
            Rejection Reason
          </label>

          <textarea
            id="rejection-reason"
            value={rejectionReason}
            onChange={(event) =>
              onChange(event.target.value)
            }
            maxLength={255}
            rows={5}
            placeholder="Enter rejection reason..."
            disabled={actionLoading}
            className="mt-2 w-full resize-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

          <div className="mt-1 flex items-start justify-between gap-4">
            <p className="text-xs text-red-600">
              {rejectError || "\u00A0"}
            </p>

            <p className="shrink-0 text-xs text-gray-400">
              {rejectionReason.length}/255
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-gray-200 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            disabled={actionLoading}
            onClick={onCancel}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={actionLoading}
            onClick={onReject}
            className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {actionLoading ? "Rejecting..." : "Reject KYC"}
          </button>
        </div>
      </div>
    </div>
  );
}
