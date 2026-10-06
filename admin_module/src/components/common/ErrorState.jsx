export default function ErrorState({
  title = "Unable to load data",
  message = "Something went wrong.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <svg
          className="h-7 w-7 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v3.5m0 3h.01M10.29 3.86l-7.1 12.28A2 2 0 004.92 19h14.16a2 2 0 001.73-2.86l-7.1-12.28a2 2 0 00-3.42 0z"
          />
        </svg>
      </div>

      <h3 className="text-base font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm text-gray-500">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
      >
        Try Again
      </button>
    </div>
  );
}
