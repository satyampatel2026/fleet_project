const connection = require("../model/db");
const bcrypt = require("bcrypt");


// ================= TOTAL USERS =================

const totalUsers = async (req, res) => {
  try {
    const query = `
      SELECT COUNT(*) AS total_users
      FROM users
    `;

    const [result] = await connection.query(query);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Total Users Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= ADD USER =================

const postUser = async (req, res) => {
  const {
    full_name,
    email,
    mobile,
    password,
    department_id,
  } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const query = `
      INSERT INTO users
      SET
        full_name = UPPER(?),
        email = ?,
        mobile = ?,
        password = ?,
        department_id = ?
    `;

    const data = [
      full_name,
      email,
      mobile,
      hashedPassword,
      department_id,
    ];

    const [result] = await connection.query(
      query,
      data
    );

    return res.status(201).json(result);
  } catch (error) {
    console.error("Add User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET USERS =================

const getUser = async (req, res) => {
  try {
    const query = `
      SELECT
        users.*,
        departments.department_name
      FROM users

      INNER JOIN departments
        ON users.department_id =
           departments.department_id
    `;

    const [result] = await connection.query(query);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Get Users Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE USER =================

const updateUser = async (req, res) => {
  const {
    full_name,
    email,
    department_id,
    status,
  } = req.body;

  const user_id = req.query.user_id;

  try {
    const query = `
      UPDATE users
      SET
        full_name = UPPER(?),
        email = ?,
        department_id = ?,
        status = ?
      WHERE user_id = ?
    `;

    const data = [
      full_name,
      email,
      department_id,
      status,
      user_id,
    ];

    const [result] = await connection.query(
      query,
      data
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Update User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE USER =================

const deleteUser = async (req, res) => {
  const user_id = req.query.user_id;

  try {
    const query = `
      DELETE FROM users
      WHERE user_id = ?
    `;

    const [result] = await connection.query(
      query,
      [user_id]
    );

    return res.status(200).json(result);
  } catch (error) {
    console.error("Delete User Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  totalUsers,
  postUser,
  getUser,
  updateUser,
  deleteUser,
};