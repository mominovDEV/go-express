const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addoperation = async (req, res) => {
  try {
    const { order_id, status_id, operation_date, admin_id, description } =
      req.body;

    const newoperation = await pool.query(
      `
        INSERT INTO operation (order_id,status_id,operation_date,admin_id,description)
        values($1, $2, $3, $4, $5) RETURNING *
        `,
      [order_id, status_id, operation_date, admin_id, description]
    );
    console.log(newoperation);
    res.status(200).json(newoperation.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getoperation = async (req, res) => {
  try {
    const operation = await pool.query(`select * from operation`);
    res.status(200).send(operation.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getoperationById = async (req, res) => {
  try {
    const id = req.params.id;
    const operation = await pool.query(
      `
          select * from operation where id = $1
        `,
      [id]
    );
       if (operation.rows.length == 0) {
         return res.status(400).json("Id is not found");
       }
    res.status(200).send(operation.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const updateoperation = async (req, res) => {
  try {
    const id = req.params.id;
    const { order_id, status_id, operation_date, admin_id, description } =
      req.body;

    const newoperation = await pool.query(
      `
            UPDATE operation set order_id = $1,status_id = $2,operation_date = $3,admin_id = $4, description = $5
            RETURNING *
        `,
      [order_id, status_id, operation_date, admin_id, description]
    );
     if (newoperation.rows.length == 0) {
       return res.status(400).json("Id is not found");
     }
    res.status(200).json(newoperation.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const deleteoperation = async (req, res) => {
  try {
    const id = req.params.id;
    const operation = await pool.query(`DELETE FROM operation WHERE id = $1`, [
      id,
    ]);
    if (operation.lenth == 0) {
      return res
        .status(400)
        .send({ massage: "Uchirish muvoffaqqiyatsiz yakunlandi!" });
    }
    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addoperation,
  getoperation,
  getoperationById,
  updateoperation,
  deleteoperation,
};
