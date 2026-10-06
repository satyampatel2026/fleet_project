const DocumentCard = ({
    type,
    document,
    selectedFile,
    error,
    onFileChange,
    onRemove,
    disabled = false
}) => {

    const titles = {

        pan_document: "PAN Document",

        aadhaar_document: "Aadhaar Document",

        gst_document: "GST Document"

    };


    const title =
        titles[type] || "Document";


    const inputId =
        `file-${type}`;


    const existingUrl =
        typeof document === "object"
            ? document?.url
            : document;


    const existingName =
        typeof document === "object"
            ? document?.name
            : "Existing document";


    const formatSize = (bytes) => {

        if (!bytes) {
            return "";
        }

        return (
            bytes / (1024 * 1024)
        ).toFixed(2) + " MB";

    };


    const handleChange = (e) => {

        const file =
            e.target.files?.[0] || null;

        onFileChange(
            type,
            file
        );

    };


    return (

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

            <div className="mb-4">

                <h3 className="text-sm font-bold text-slate-900">
                    {title}
                </h3>

                <p className="mt-1 text-xs text-slate-500">
                    PDF, JPG, PNG · Maximum 5 MB
                </p>

            </div>


            {/* EXISTING DOCUMENT */}

            {document && !selectedFile && (

                <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">

                    <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                                ✓
                            </div>

                            <div className="min-w-0">

                                <p className="text-xs font-semibold text-emerald-800">
                                    Uploaded
                                </p>

                                <p className="truncate text-xs text-emerald-700">
                                    {existingName}
                                </p>

                            </div>

                        </div>


                        {existingUrl && (

                            <a
                                href={existingUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="shrink-0 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                            >
                                View
                            </a>

                        )}

                    </div>

                </div>

            )}


            {/* NEW SELECTED FILE */}

            {selectedFile && (

                <div className="mb-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3">

                    <div className="flex items-center justify-between gap-3">

                        <div className="flex min-w-0 items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-600">
                                ✓
                            </div>

                            <div className="min-w-0">

                                <p className="text-xs font-bold text-indigo-800">
                                    New document selected
                                </p>

                                <p
                                    className="truncate text-xs text-indigo-700"
                                    title={selectedFile.name}
                                >
                                    {selectedFile.name}
                                </p>

                                <p className="mt-0.5 text-[11px] text-indigo-500">
                                    {formatSize(
                                        selectedFile.size
                                    )}
                                </p>

                            </div>

                        </div>


                        {!disabled && (

                            <button
                                type="button"
                                onClick={() =>
                                    onRemove(type)
                                }
                                className="shrink-0 text-xs font-bold text-red-500 hover:text-red-600"
                            >
                                Remove
                            </button>

                        )}

                    </div>

                </div>

            )}


            {/* UPLOAD */}

            {!disabled && (

                <label
                    htmlFor={inputId}
                    className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-center transition hover:border-indigo-300 hover:bg-indigo-50"
                >

                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 shadow-sm">
                        ↑
                    </div>

                    <p className="text-sm font-semibold text-slate-700">
                        {selectedFile
                            ? "Change document"
                            : "Select document"}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        Click to browse files
                    </p>

                    <input
                        id={inputId}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleChange}
                        className="hidden"
                    />

                </label>

            )}


            {disabled && (

                <div className="rounded-xl bg-slate-50 px-4 py-3 text-center text-xs text-slate-500">
                    KYC verified. Document cannot be changed.
                </div>

            )}


            {error && (

                <p className="mt-2 text-xs font-semibold text-red-500">
                    {error}
                </p>

            )}

        </div>

    );

};


export default DocumentCard;