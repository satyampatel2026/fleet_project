const connection = require("../config/db");


const getDept = async (req, res) => {
  try {
    const query = `
      SELECT * FROM departments
    `;

    const [result] = await connection.query(query);

    return res.send(result);

  } catch (error) {
    console.error("Get Department Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


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

    return res.send(result);

  } catch (error) {
    console.error("Add Department Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};



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
      [department_name, department_id]
    );

    return res.send(result);

  } catch (error) {
    console.error("Update Department Error:", error);

    return res.status(500).send({
      success: false,
      message: error.message,
    });
  }
};


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

    return res.send(result);

  } catch (error) {
    console.error("Delete Department Error:", error);

    return res.status(500).send({
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
