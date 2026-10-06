import DocumentCard from "./DocumentCard";

const InputField = ({
    label,
    name,
    value,
    onChange,
    onBlur,
    error,
    placeholder,
    maxLength,
    className = "",
    ...props
}) => (
    <div className={className}>
        <label className="text-sm font-semibold text-slate-700">
            {label}
            <span className="ml-1 text-red-500">*</span>
        </label>

        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`mt-2 w-full rounded-xl border px-4 py-3 text-sm outline-none ${
                error
                    ? "border-red-400"
                    : "border-slate-200"
            }`}
            {...props}
        />

        {error && (
            <p className="mt-1 text-xs text-red-500">
                {error}
            </p>
        )}
    </div>
);

const KycFormModal = ({
    kyc,
    formik,
    submitting,
    modalError,
    onClose
}) => {
    const getError = (name) =>
        formik.touched[name]
            ? formik.errors[name]
            : null;

    const handleInputChange = (event) => {
        formik.setFieldValue(
            event.target.name,
            event.target.value
        );
    };

    const handleFileChange = (type, file) => {
        formik.setFieldTouched(type, true);
        formik.setFieldValue(type, file);
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 p-4">
            <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            {kyc ? "Update KYC" : "Submit KYC"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Update your KYC details and verification documents.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={submitting}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                    >
                        ✕
                    </button>
                </div>

                <form
                    onSubmit={formik.handleSubmit}
                    className="flex min-h-0 flex-1 flex-col"
                >

                    {modalError && (
                        <div className="mx-6 mt-4 flex shrink-0 items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 font-bold">
                                !
                            </span>

                            <div>
                                <p className="font-semibold">
                                    Unable to save KYC
                                </p>

                                <p className="mt-0.5">
                                    {modalError}
                                </p>
                            </div>
                        </div>
                    )}

                    <div className="flex-1 overflow-y-auto px-6 py-6">

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <InputField
                                label="Owner Name"
                                name="owner_name"
                                value={formik.values.owner_name}
                                onChange={handleInputChange}
                                onBlur={formik.handleBlur}
                                error={getError("owner_name")}
                                placeholder="Enter owner name"
                            />

                            <InputField
                                label="Business Name"
                                name="business_name"
                                value={formik.values.business_name}
                                onChange={handleInputChange}
                                onBlur={formik.handleBlur}
                                error={getError("business_name")}
                                placeholder="Enter business name"
                            />

                            <InputField
                                label="PAN Number"
                                name="pan_number"
                                value={formik.values.pan_number}
                                maxLength={10}
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        "pan_number",
                                        e.target.value
                                            .toUpperCase()
                                            .replace(/\s/g, "")
                                    );
                                }}
                                onBlur={formik.handleBlur}
                                error={getError("pan_number")}
                                placeholder="ABCDE1234F"
                            />

                            <InputField
                                label="GST Number"
                                name="gst_number"
                                value={formik.values.gst_number}
                                maxLength={15}
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        "gst_number",
                                        e.target.value
                                            .toUpperCase()
                                            .replace(/\s/g, "")
                                    );
                                }}
                                onBlur={formik.handleBlur}
                                error={getError("gst_number")}
                                placeholder="23ABCDE1234F1Z5"
                            />

                            <InputField
                                label="Aadhaar Number"
                                name="aadhaar_number"
                                value={formik.values.aadhaar_number}
                                maxLength={12}
                                inputMode="numeric"
                                onChange={(e) => {
                                    formik.setFieldValue(
                                        "aadhaar_number",
                                        e.target.value.replace(/\D/g, "")
                                    );
                                }}
                                onBlur={formik.handleBlur}
                                error={getError("aadhaar_number")}
                                placeholder="Enter 12 digit Aadhaar"
                            />

                            <div className="md:col-span-2">
                                <label className="text-sm font-semibold text-slate-700">
                                    Business Address
                                    <span className="ml-1 text-red-500">
                                        *
                                    </span>
                                </label>

                                <textarea
                                    name="business_address"
                                    rows={4}
                                    value={formik.values.business_address}
                                    onChange={handleInputChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Enter complete business address"
                                    className={`mt-2 w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none ${
                                        getError("business_address")
                                            ? "border-red-400"
                                            : "border-slate-200"
                                    }`}
                                />

                                {getError("business_address") && (
                                    <p className="mt-1 text-xs text-red-500">
                                        {getError("business_address")}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="mt-7">
                            <h3 className="mb-1 text-base font-bold text-slate-900">
                                Verification Documents
                            </h3>

                            <p className="mb-4 text-xs text-slate-500">
                                Existing documents are shown below. Select a new file only if you want to replace it.
                            </p>

                            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                                {[
                                    "pan_document",
                                    "aadhaar_document",
                                    "gst_document"
                                ].map((type) => (
                                    <DocumentCard
                                        key={type}
                                        type={type}
                                        document={kyc?.[type]}
                                        selectedFile={formik.values[type]}
                                        error={getError(type)}
                                        onFileChange={handleFileChange}
                                        onRemove={() =>
                                            formik.setFieldValue(
                                                type,
                                                null
                                            )
                                        }
                                        disabled={false}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>

                    <div className="flex shrink-0 items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4">

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={submitting}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex min-w-[140px] items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {submitting ? (
                                <>
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    {kyc ? "Update KYC" : "Submit KYC"}
                                    <span>→</span>
                                </>
                            )}
                        </button>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default KycFormModal;