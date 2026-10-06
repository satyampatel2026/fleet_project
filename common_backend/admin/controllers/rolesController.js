const connection = require("../../model/db");

const postRole = async (req, res) => {
  try {
    const query = `INSERT INTO roles SET ?`;

    const [result] = await connection.query(
      query,
      req.body
    );

    return res.send(result);

  } catch (error) {
    console.error("Add Role Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// Get Roles
const getRole = async (req, res) => {
  try {
    const query = `SELECT * FROM roles`;

    const [result] = await connection.query(query);

    return res.send(result);

  } catch (error) {
    console.error("Get Roles Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// Update Role
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

    return res.send(result);

  } catch (error) {
    console.error("Update Role Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// Delete Role
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

    return res.send(result);

  } catch (error) {
    console.error("Delete Role Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// ================= ROLE ASSIGN =================


// Get User Roles
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
      WHERE user_id = ?
    `;

    const [result] = await connection.query(
      query,
      [user_id]
    );

    return res.send(result);

  } catch (error) {
    console.error("Get User Role Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// Assign Role
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

    return res.send(result);

  } catch (error) {
    console.error("Assign Role Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


// Delete Role Assign
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

    return res.send(result);

  } catch (error) {
    console.error("Delete User Role Error:", error);

    return res.status(500).send({
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
