const connection = require("../../model/db");

// Get all KYC records
const getKycList = async (req, res) => {
  try {
    const [kycList] = await connection.query(`
      SELECT
        k.kyc_id,
        k.partner_id,

        p.partner_name,
        p.email,
        p.mobile,

        k.owner_name,
        k.business_name,
        k.business_address,

        k.pan_number,
        k.gst_number,
        k.aadhaar_number,

        k.pan_document,
        k.aadhaar_document,
        k.gst_document,

        k.kyc_status,
        k.rejection_reason,

        k.submitted_at,
        k.verified_at

      FROM partner_kyc k

      INNER JOIN partners p
        ON p.partner_id = k.partner_id

      ORDER BY k.submitted_at DESC
    `);

    return res.status(200).json({
      success: true,
      data: kycList,
    });
  } catch (error) {
    console.error("Get KYC list error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch KYC records",
    });
  }
};


// Get single KYC details
const getKycDetails = async (req, res) => {
  try {
    const { kycId } = req.params;

    const [kycRecords] = await connection.query(
      `
      SELECT
        k.kyc_id,
        k.partner_id,

        p.partner_name,
        p.email,
        p.mobile,

        k.owner_name,
        k.business_name,
        k.business_address,

        k.pan_number,
        k.gst_number,
        k.aadhaar_number,

        k.pan_document,
        k.aadhaar_document,
        k.gst_document,

        k.kyc_status,
        k.rejection_reason,

        k.submitted_at,
        k.verified_at

      FROM partner_kyc k

      INNER JOIN partners p
        ON p.partner_id = k.partner_id

      WHERE k.kyc_id = ?

      LIMIT 1
      `,
      [kycId]
    );

    if (kycRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: kycRecords[0],
    });
  } catch (error) {
    console.error("Get KYC details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch KYC details",
    });
  }
};


///verify kyc/////
const verifyKyc = async (req, res) => {
  try {
    const { kycId } = req.params;

    const [kycRecords] = await connection.query(
      `
      SELECT kyc_id, kyc_status
      FROM partner_kyc
      WHERE kyc_id = ?
      LIMIT 1
      `,
      [kycId]
    );

    if (kycRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    const kyc = kycRecords[0];

    if (kyc.kyc_status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `KYC is already ${kyc.kyc_status}`,
      });
    }

    await connection.query(
      `
      UPDATE partner_kyc
      SET kyc_status = 'verified',
        verified_at = CURRENT_TIMESTAMP,
        rejection_reason = NULL
      WHERE kyc_id = ?
      `,
      [kycId]
    );

    return res.status(200).json({
      success: true,
      message: "KYC verified successfully",
    });
  } catch (error) {
    console.error("Verify KYC error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to verify KYC",
    });
  }
};


const rejectKyc = async (req, res) => {
  try {
    const { kycId } = req.params;
    const { rejectionReason } = req.body;

    if (!rejectionReason || !rejectionReason.trim()) {
      return res.status(400).json({
        success: false,
        message: "Rejection reason is required",
      });
    }

    const reason = rejectionReason.trim();

    if (reason.length < 10) {
      return res.status(400).json({
        success: false,
        message:
          "Rejection reason must be at least 10 characters",
      });
    }

    if (reason.length > 255) {
      return res.status(400).json({
        success: false,
        message:
          "Rejection reason cannot exceed 255 characters",
      });
    }

    const [kycRecords] = await connection.query(
      `
      SELECT kyc_id, kyc_status
      FROM partner_kyc
      WHERE kyc_id = ?
      LIMIT 1
      `,
      [kycId]
    );

    if (kycRecords.length === 0) {
      return res.status(404).json({
        success: false,
        message: "KYC record not found",
      });
    }

    const kyc = kycRecords[0];

    if (kyc.kyc_status !== "pending") {
      return res.status(400).json({
        success: false,
        message: `KYC is already ${kyc.kyc_status}`,
      });
    }

    await connection.query(
      `
      UPDATE partner_kyc
      SET
        kyc_status = 'rejected',
        rejection_reason = ?,
        verified_at = NULL
      WHERE kyc_id = ?
      `,
      [reason, kycId]
    );

    return res.status(200).json({
      success: true,
      message: "KYC rejected successfully",
    });
  } catch (error) {
    console.error("Reject KYC error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to reject KYC",
    });
  }
};


module.exports = {getKycList,getKycDetails,verifyKyc,rejectKyc};
