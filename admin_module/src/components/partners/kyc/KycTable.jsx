import KycStatusBadge from "./KycStatusBadge";
import KycTableSkeleton from "./KycTableSkeleton";

import EmptyState from "../../common/EmptyState";
import ErrorState from "../../common/ErrorState";
import Pagination from "../../common/Pagination";

export default function KycTable({
  kycList,
  loading,
  error,
  page,
  totalPages,
  onPageChange,
  onReview,
  onRetry,
}) {
  if (loading) {
    return <KycTableSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load KYC"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (!kycList.length) {
    return (
      <EmptyState
        title="No KYC records found"
        message="Try changing your search or filter."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Desktop */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-left">
              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Partner
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Business
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Submitted
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Documents
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Status
              </th>

              <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {kycList.map((kyc) => {
              const documentCount = [
                kyc.pan_document,
                kyc.aadhaar_document,
                kyc.gst_document,
              ].filter(Boolean).length;

              return (
                <tr
                  key={kyc.kyc_id}
                  className="transition hover:bg-gray-50/50"
                >
                  {/* Partner */}
                  <td className="px-6 py-3.5">
                    <div>
                      <p className="font-medium text-gray-900">
                        {kyc.partner_name}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        {kyc.email}
                      </p>

                      <p className="mt-0.5 text-xs text-gray-500">
                        {kyc.mobile}
                      </p>
                    </div>
                  </td>

                  {/* Business */}
                  <td className="px-6 py-3.5">
                    <p className="text-sm font-medium text-gray-800">
                      {kyc.business_name || "-"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-500">
                      {kyc.owner_name}
                    </p>
                  </td>

                  {/* Submitted */}
                  <td className="px-6 py-3.5 text-sm text-gray-600">
                    {kyc.submitted_at
                      ? new Date(
                          kyc.submitted_at
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  {/* Documents */}
                  <td className="px-6 py-3.5">
                    <span className="text-sm font-medium text-gray-700">
                      {documentCount}
                    </span>

                    <span className="ml-1 text-sm text-gray-500">
                      / 3
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3.5">
                    <KycStatusBadge
                      status={kyc.kyc_status}
                    />
                  </td>

                  {/* Action */}
                  <td className="px-6 py-3.5">
                    <button
                      type="button"
                      onClick={() => onReview(kyc)}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile */}
      <div className="divide-y divide-gray-100 md:hidden">
        {kycList.map((kyc) => {
          const documentCount = [
            kyc.pan_document,
            kyc.aadhaar_document,
            kyc.gst_document,
          ].filter(Boolean).length;

          return (
            <div
              key={kyc.kyc_id}
              className="p-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-gray-900">
                    {kyc.partner_name}
                  </p>

                  <p className="mt-0.5 text-sm text-gray-500">
                    {kyc.business_name || "No business name"}
                  </p>

                  <p className="mt-0.5 text-sm text-gray-500">
                    {kyc.mobile}
                  </p>
                </div>

                <KycStatusBadge
                  status={kyc.kyc_status}
                />
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4 pt-1">
                <div>
                  <p className="text-xs text-gray-400">
                    Submitted
                  </p>

                  <p className="mt-0.5 text-sm text-gray-700">
                    {kyc.submitted_at
                      ? new Date(
                          kyc.submitted_at
                        ).toLocaleDateString("en-IN")
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400">
                    Documents
                  </p>

                  <p className="mt-0.5 text-sm text-gray-700">
                    {documentCount} / 3
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onReview(kyc)}
                className="mt-3 w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                Review KYC
              </button>
            </div>
          );
        })}
      </div>

      <div className="border-t border-gray-100 px-4 py-3">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}