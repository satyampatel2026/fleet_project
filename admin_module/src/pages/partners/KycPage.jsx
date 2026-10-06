import { useEffect, useMemo, useState } from "react";

import KycTable from "../../components/partners/kyc/KycTable";
import KycReview from "../../components/partners/kyc/KycReview";
import { getKycList } from "../../services/partnerService";

export default function KycPage() {
  const [allKyc, setAllKyc] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [selectedKycId, setSelectedKycId] = useState(null);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const LIMIT = 10;

  // Fetch KYC only once
  const fetchKyc = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getKycList();

      setAllKyc(response.data || []);
    } catch (error) {
      setError(
        error.message ||
          "Unable to load KYC records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKyc();
  }, []);

  // Search + filter
  const filteredKyc = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return allKyc.filter((kyc) => {
      const matchesSearch =
        searchValue === "" ||
        kyc.partner_name
          ?.toLowerCase()
          .includes(searchValue) ||
        kyc.email
          ?.toLowerCase()
          .includes(searchValue) ||
        kyc.mobile?.includes(searchValue) ||
        kyc.business_name
          ?.toLowerCase()
          .includes(searchValue) ||
        kyc.pan_number
          ?.toLowerCase()
          .includes(searchValue);

      const matchesStatus =
        status === "" ||
        kyc.kyc_status === status;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [allKyc, search, status]);

  // Total pages
  const totalPages = Math.ceil(
    filteredKyc.length / LIMIT
  );

useEffect(() => {
  if (totalPages > 0 && page > totalPages) {
    setPage(totalPages);
  }
}, [page, totalPages]);

  // Current page
  const paginatedKyc = useMemo(() => {
    const startIndex =
      (page - 1) * LIMIT;

    return filteredKyc.slice(
      startIndex,
      startIndex + LIMIT
    );
  }, [filteredKyc, page]);

  // Search
  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  // Status filter
  const handleStatusFilter = (value) => {
    setStatus(value);
    setPage(1);
  };

  // Pagination
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Review
  const handleReview = (kyc) => {
   setSelectedKycId(kyc.kyc_id);
  };

  const handleKycStatusChange = (updatedKyc) => {
  setAllKyc((previousList) =>
    previousList.map((item) =>
      item.kyc_id === updatedKyc.kyc_id
        ? {
            ...item,
            kyc_status: updatedKyc.kyc_status,
            rejection_reason:
              updatedKyc.rejection_reason,
            verified_at:
              updatedKyc.verified_at,
          }
        : item
    )
  );
};

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold tracking-tight text-gray-900">
            KYC Verification
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Review and manage partner KYC submissions.
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Toolbar */}
          <div className="border-b border-gray-100 p-4 sm:p-5">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

              {/* Search */}
              <div className="relative w-full md:max-w-sm">
                <svg
                  className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m21 21-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                  placeholder="Search partner, email, PAN..."
                  className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                />
              </div>

              {/* Status */}
              <select
                value={status}
                onChange={(e) =>
                  handleStatusFilter(
                    e.target.value
                  )
                }
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm outline-none transition hover:border-gray-300 focus:border-gray-400 focus:ring-2 focus:ring-gray-100 md:w-auto"
                >
                <option value="">
                  All Status
                </option>

                <option value="pending">
                  Pending
                </option>

                <option value="verified">
                  Verified
                </option>

                <option value="rejected">
                  Rejected
                </option>
              </select>
            </div>
          </div>

          {/* Table */}
          <KycTable
            kycList={paginatedKyc}
            loading={loading}
            error={error}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onReview={handleReview}
            onRetry={fetchKyc}
          />
        </div>
      </div>
      {selectedKycId && (
  <KycReview
    kycId={selectedKycId}
    onClose={() => setSelectedKycId(null)}
      onStatusChange={handleKycStatusChange}
  />
)}
    </div>
  );
}
