const BASE_URL = "http://localhost:5000/api";

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      "Something went wrong"
    );
  }

  return data;
}


// Register
export async function registerPartner(partnerData) {
  return request(`${BASE_URL}/register-partner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(partnerData),
  });
}

export async function loginPartner(loginData) {
  return request(`${BASE_URL}/login-partner`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
}

// Logout
export async function logoutPartner() {
  return request(`${BASE_URL}/logout-partner`, {
    method: "POST",
  });
}

export async function sendForgotPasswordOtp(email) {
  return request(`${BASE_URL}/forgot-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

// Forgot Password - Verify OTP
export async function verifyForgotPasswordOtp(email, otp) {
  return request(`${BASE_URL}/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      otp,
    }),
  });
}

// Forgot Password - Reset Password
export async function resetForgotPassword(email, newPassword) {
  return request(`${BASE_URL}/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword,
    }),
  });
}

export async function verifyAuth() {
  try {
    const res = await request(`${BASE_URL}/auth/verify?t=${Date.now()}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Cache-Control": "no-cache"
      }
    });
    console.log("API Verify Success:", res);
    return res;
  } catch (err) {
    console.error("API Verify FAILED with error:", err.message); // Yahan exact pata chalega error kya hai
    throw err;
  }
}