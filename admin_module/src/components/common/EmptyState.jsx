export default function EmptyState({
  title = "No records found",
  message = "There are no records available.",
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-7 w-7 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 13V7a2 2 0 00-2-2h-3l-1-1H10L9 5H6a2 2 0 00-2 2v6m16 0v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4m16 0H4"
          />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        {message}
      </p>
    </div>
  );
}
