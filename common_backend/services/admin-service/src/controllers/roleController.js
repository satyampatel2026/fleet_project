const connection = require("../model/db");


// ================= ADD ROLE =================

const postRole = async (req, res) => {
  try {
    const query = `
      INSERT INTO roles
      SET ?
    `;

    const [result] = await connection.query(
      query,
      req.body
    );

    return res.status(201).json(result);

  } catch (error) {
    console.error("Add Role Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET ROLES =================

const getRole = async (req, res) => {
  try {
    const query = `
      SELECT * FROM roles
    `;

    const [result] = await connection.query(query);

    return res.status(200).json(result);

  } catch (error) {
    console.error("Get Roles Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE ROLE =================

const updateRole = async (req, res) => {
  const { role_name } = req.body;
  const role_id = req.query.role_id;

  try {
    const query = `
      UPDATE roles
      SET role_name = UPPER(?)
      WHERE role_id = ?
    `;

    const [result] = await connection.query(
      query,
      [role_name, role_id]
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error("Update Role Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE ROLE =================

const deleteRole = async (req, res) => {
  const role_id = req.query.role_id;

  try {
    const query = `
      DELETE FROM roles
      WHERE role_id = ?
    `;

    const [result] = await connection.query(
      query,
      [role_id]
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error("Delete Role Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= GET USER ROLES =================

const getUserRole = async (req, res) => {
  const user_id = req.query.user_id;

  try {
    const query = `
      SELECT
        roles.role_id,
        roles.role_name
      FROM role_assign

      INNER JOIN roles
        ON role_assign.role_id = roles.role_id

      WHERE role_assign.user_id = ?
    `;

    const [result] = await connection.query(
      query,
      [user_id]
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error("Get User Role Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= ASSIGN ROLE =================

const postUserRole = async (req, res) => {
  try {
    const query = `
      INSERT INTO role_assign
      SET ?
    `;

    const [result] = await connection.query(
      query,
      req.body
    );

    return res.status(201).json(result);

  } catch (error) {
    console.error("Assign Role Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= REMOVE USER ROLE =================

const deleteUserRole = async (req, res) => {
  const user_id = req.query.user_id;
  const role_id = req.query.role_id;

  try {
    const query = `
      DELETE FROM role_assign
      WHERE user_id = ?
      AND role_id = ?
    `;

    const [result] = await connection.query(
      query,
      [user_id, role_id]
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error("Delete User Role Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  postRole,
  getRole,
  updateRole,
  deleteRole,
  getUserRole,
  postUserRole,
  deleteUserRole,
};