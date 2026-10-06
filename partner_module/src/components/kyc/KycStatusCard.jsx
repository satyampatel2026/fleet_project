const statusConfig = {

    pending: {
        label: "Pending Verification",
        color: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500"
    },

    verified: {
        label: "Verified",
        color: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500"
    },

    rejected: {
        label: "Rejected",
        color: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500"
    }

};


const KycStatusCard = ({ status, rejectionReason }) => {

    const config =
        statusConfig[status] ||
        statusConfig.pending;


    return (
        <div className="space-y-4">

            {/* Status */}
            <div
                className={`
                    flex items-center justify-between
                    rounded-2xl border px-5 py-4
                    ${config.color}
                `}
            >

                <div className="flex items-center gap-3">

                    <span
                        className={`
                            h-2.5 w-2.5 rounded-full
                            ${config.dot}
                        `}
                    />

                    <div>
                        <p className="text-sm font-semibold">
                            KYC Status
                        </p>

                        <p className="text-xs opacity-75 mt-0.5">
                            {status === "verified"
                                ? "Your documents have been verified."
                                : status === "rejected"
                                    ? "Please review and resubmit your documents."
                                    : "Your documents are awaiting verification."
                            }
                        </p>
                    </div>

                </div>


                <span className="text-sm font-bold">
                    {config.label}
                </span>

            </div>


            {/* Rejection Reason */}
            {status === "rejected" &&
                rejectionReason && (

                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">

                        <div className="flex gap-3">

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-600">
                                !
                            </div>

                            <div>

                                <p className="text-sm font-semibold text-red-800">
                                    Rejection Reason
                                </p>

                                <p className="mt-1 text-sm text-red-700">
                                    {rejectionReason}
                                </p>

                            </div>

                        </div>

                    </div>
                )}

        </div>
    );
};


export default KycStatusCard;