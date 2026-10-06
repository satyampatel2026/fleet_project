const connection = require("../../model/db");

// Get all partners
const getPartners = async (req, res) => {
  try {
    const [partners] = await connection.query(`
      SELECT
        p.partner_id,
        p.partner_name,
        p.email,
        p.mobile,
        p.status,
        p.created_at,

        k.kyc_id,
        k.kyc_status

      FROM partners p

      LEFT JOIN partner_kyc k
        ON k.partner_id = p.partner_id

      ORDER BY p.created_at DESC
    `);

    return res.status(200).json({
      success: true,
      data: partners,
    });
  } catch (error) {
    console.error("Get partners error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch partners",
    });
  }
};


// Update partner status
const updatePartnerStatus = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid partner status",
      });
    }

    // Check partner exists
    const [partners] = await connection.query(
      `
      SELECT
        partner_id,
        partner_name,
        status
      FROM partners
      WHERE partner_id = ?
      LIMIT 1
      `,
      [partnerId]
    );

    if (partners.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Partner not found",
      });
    }

    // Update status
    await connection.query(
      `
      UPDATE partners
      SET status = ?
      WHERE partner_id = ?
      `,
      [status, partnerId]
    );

    // Get updated partner
    const [updatedPartner] = await connection.query(
      `
      SELECT
        partner_id,
        partner_name,
        email,
        mobile,
        status,
        created_at
      FROM partners
      WHERE partner_id = ?
      LIMIT 1
      `,
      [partnerId]
    );

    return res.status(200).json({
      success: true,

      message:
        status === "active"
          ? "Partner activated successfully"
          : "Partner deactivated successfully",

      data: updatedPartner[0],
    });
  } catch (error) {
    console.error("Update partner status error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update partner status",
    });
  }
};


module.exports = { getPartners, updatePartnerStatus,};
