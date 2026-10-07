const connection = require("../model/db");


// ================= GET DEPARTMENTS =================

const getDept = async (req, res) => {
  try {
    const query = `
      SELECT * FROM departments
    `;

    const [result] = await connection.query(query);

    return res.status(200).json(result);

  } catch (error) {
    console.error("Get Department Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= ADD DEPARTMENT =================

const postDept = async (req, res) => {
  const { department_name } = req.body;

  try {
    const query = `
      INSERT INTO departments
      SET department_name = UPPER(?)
    `;

    const [result] = await connection.query(
      query,
      [department_name]
    );

    return res.status(201).json(result);

  } catch (error) {
    console.error("Add Department Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= UPDATE DEPARTMENT =================

const updateDept = async (req, res) => {
  const { department_name } = req.body;
  const department_id = req.query.department_id;

  try {
    const query = `
      UPDATE departments
      SET department_name = UPPER(?)
      WHERE department_id = ?
    `;

    const [result] = await connection.query(
      query,
      [
        department_name,
        department_id,
      ]
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error("Update Department Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================= DELETE DEPARTMENT =================

const deleteDept = async (req, res) => {
  const department_id = req.query.department_id;

  try {
    const query = `
      DELETE FROM departments
      WHERE department_id = ?
    `;

    const [result] = await connection.query(
      query,
      [department_id]
    );

    return res.status(200).json(result);

  } catch (error) {
    console.error("Delete Department Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  getDept,
  postDept,
  updateDept,
  deleteDept,
};