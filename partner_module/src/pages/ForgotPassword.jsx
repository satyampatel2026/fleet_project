import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendForgotPasswordOtp, verifyForgotPasswordOtp, resetForgotPassword,} from "../services/partnerService";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const clearMessages = () => {
        setMessage("");
        setError("");
    };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!email) {
        setError("Please enter your email");
        return;
    }

    try {
        setLoading(true);

        await sendForgotPasswordOtp(email);

        setMessage("OTP sent to your email");
        setStep(2);
    } catch (error) {
        console.error(error);
        setError(error.message || "Failed to send OTP");
    } finally {
        setLoading(false);
    }
};

 const handleVerifyOtp = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!otp || otp.length !== 6) {
        setError("Please enter a valid 6 digit OTP");
        return;
    }

    try {
        setLoading(true);

        await verifyForgotPasswordOtp(email, otp);

        setMessage("OTP verified successfully");
        setStep(3);
    } catch (error) {
        console.error(error);
        setError(error.message || "Invalid OTP");
    } finally {
        setLoading(false);
    }
};
   const handleResetPassword = async (e) => {
    e.preventDefault();
    clearMessages();

    if (!newPassword || !confirmPassword) {
        setError("Please enter both passwords");
        return;
    }

    if (newPassword.length < 6) {
        setError("Password must be at least 6 characters");
        return;
    }

    if (newPassword !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        setLoading(true);

        await resetForgotPassword(email, newPassword);

        setMessage("Password reset successfully");

        setEmail("");
        setOtp("");
        setNewPassword("");
        setConfirmPassword("");

        setTimeout(() => {
            navigate("/login");
        }, 2000);
    } catch (error) {
        console.error(error);
        setError(error.message || "Failed to reset password");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8">

                {/* Header */}
                <div className="text-center mb-7">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                        <svg
                            className="h-7 w-7 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800">
                        Forgot Password
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        Reset your password securely
                    </p>
                </div>

                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-7">

                    {[1, 2, 3].map((item, index) => (
                        <div key={item} className="flex items-center">

                            <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                                    step >= item
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-200 text-slate-500"
                                }`}
                            >
                                {item}
                            </div>

                            {index < 2 && (
                                <div
                                    className={`h-1 w-10 sm:w-16 transition ${
                                        step > item
                                            ? "bg-blue-600"
                                            : "bg-slate-200"
                                    }`}
                                />
                            )}

                        </div>
                    ))}

                </div>

                {/* Success Message */}
                {message && (
                    <div className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                        {message}
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {/* STEP 1 */}
                {step === 1 && (
                    <form onSubmit={handleSendOtp} className="space-y-5">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email Address
                            </label>

                            <input
                                type="email"
                                placeholder="Enter registered email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>

                    </form>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp} className="space-y-5">

                        <div className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
                            OTP has been sent to{" "}
                            <strong className="text-slate-800">
                                {email}
                            </strong>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Enter OTP
                            </label>

                            <input
                                type="text"
                                inputMode="numeric"
                                placeholder="Enter 6 digit OTP"
                                value={otp}
                                maxLength={6}
                                onChange={(e) =>
                                    setOtp(
                                        e.target.value.replace(/\D/g, "")
                                    )
                                }
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-lg tracking-[0.5em] outline-none transition placeholder:text-sm placeholder:tracking-normal focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setStep(1);
                                clearMessages();
                            }}
                            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            Change Email
                        </button>

                    </form>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-5">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                New Password
                            </label>

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>

                    </form>
                )}

                {/* Footer */}
                <p className="mt-7 text-center text-xs text-slate-400">
                    Your password reset is secure and protected.
                </p>

            </div>
        </div>
    );
};

export default ForgotPassword;

