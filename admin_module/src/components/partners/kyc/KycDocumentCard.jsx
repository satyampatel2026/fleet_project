export default function KycDocumentCard({
  title,
  fileName,
  fileUrl,
}) {
  if (!fileName || !fileUrl) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-5">
        <p className="font-medium text-gray-800">
          {title}
        </p>

        <p className="mt-2 text-sm text-gray-400">
          Document not uploaded
        </p>
      </div>
    );
  }

  const lowerFileName = fileName.toLowerCase();

  const isPdf = lowerFileName.endsWith(".pdf");

  const isImage =
    lowerFileName.endsWith(".jpg") ||
    lowerFileName.endsWith(".jpeg") ||
    lowerFileName.endsWith(".png") ||
    lowerFileName.endsWith(".webp");

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-4 py-3">
        <div className="min-w-0">
          <p className="font-medium text-gray-900">
            {title}
          </p>

          <p className="mt-1 truncate text-xs text-gray-500">
            {fileName}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Open
          </a>

          <a
            href={fileUrl}
            download
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 shadow-sm transition hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            Download
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="flex min-h-[280px] items-center justify-center bg-gray-50 p-4">
        {isImage && (
          <img
            src={fileUrl}
            alt={title}
            className="max-h-[450px] max-w-full rounded-lg object-contain shadow-sm"
          />
        )}

        {isPdf && (
          <iframe
            src={fileUrl}
            title={title}
            className="h-[450px] w-full rounded-lg border border-gray-200 bg-white"
          />
        )}

        {!isImage && !isPdf && (
          <div className="text-center">
            <p className="text-sm font-medium text-gray-700">
              Preview not available
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Please use Open or Download.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
