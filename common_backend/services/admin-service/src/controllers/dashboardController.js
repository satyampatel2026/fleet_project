const connection = require("../model/db");
const axios = require("axios");

const getDashboardStats = async (req, res) => {
  try {
    // Admin-service ke apne data
    const [userResult] = await connection.query(
      `SELECT COUNT(*) AS total_users FROM users`
    );

    const [departmentResult] = await connection.query(
      `SELECT COUNT(*) AS total_departments FROM departments`
    );

    const [roleResult] = await connection.query(
      `SELECT COUNT(*) AS total_roles FROM roles`
    );

    // Partner-service se partner count
    const partnerResponse = await axios.get(
      "http://localhost:5003/api/admin/partners/total",
      {
        headers: {
          Cookie: req.headers.cookie || "",
        },
      }
    );

    return res.status(200).json({
      success: true,
      data: {
        total_users: userResult[0].total_users,
        total_departments: departmentResult[0].total_departments,
        total_roles: roleResult[0].total_roles,
        total_partners:
          partnerResponse.data.data.total_partners,
      },
    });

  } catch (error) {
    console.error("Dashboard Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

module.exports = {
  getDashboardStats,
};