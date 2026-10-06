const API_URL = "http://localhost:5000/api";

export async function getPartners() {
  const response = await fetch(`${API_URL}/partners`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch partners"
    );
  }

  return data;
}


export async function updatePartnerStatus(
  partnerId,
  status
) {
  const response = await fetch(
    `${API_URL}/partners/${partnerId}/status`,
    {
      method: "PATCH",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update partner status"
    );
  }

  return data;
}


export async function getKycList() {
  const response = await fetch(
    `${API_URL}/partnerkyc`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch KYC records"
    );
  }

  return data;
}


export async function getKycDetails(kycId) {
  const response = await fetch(
    `${API_URL}/kyc/${kycId}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to fetch KYC details"
    );
  }

  return data;
}

export async function verifyKyc(kycId) {
  const response = await fetch(
    `${API_URL}/kyc/${kycId}/verify`,
    {
      method: "PATCH",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to verify KYC"
    );
  }

  return data;
}


export async function rejectKyc(
  kycId,
  rejectionReason
) {
  const response = await fetch(
    `${API_URL}/kyc/${kycId}/reject`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rejectionReason,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to reject KYC"
    );
  }

  return data;
}