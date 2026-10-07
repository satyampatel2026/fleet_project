const connection = require("../model/db");


// ================= GET ALL PARTNERS =================

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
    console.error("Get Partners Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch partners",
    });
  }
};


// ================= UPDATE PARTNER STATUS =================

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
    console.error(
      "Update Partner Status Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update partner status",
    });
  }
};

// ================= TOTAL PARTNERS =================

const getTotalPartners = async (req, res) => {
  try {
    const [result] = await connection.query(`
      SELECT COUNT(*) AS total_partners
      FROM partners
    `);

    return res.status(200).json({
      success: true,
      data: {
        total_partners: result[0].total_partners,
      },
    });

  } catch (error) {
    console.error("Total Partners Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch total partners",
    });
  }
};

module.exports = {
  getPartners,
  updatePartnerStatus,getTotalPartners
};