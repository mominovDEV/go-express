const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addcurrency_type = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newcurrency_type = await pool.query(
      `
        INSERT INTO currency_type (name,description)
        values($1, $2) RETURNING *
        `,
      [name, description]
    );
    console.log(newcurrency_type);
    res.status(200).json(newcurrency_type.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getcurrency_type = async (req, res) => {
  try {
    const currency_type = await pool.query(`select * from currency_type`);
    res.status(200).send(currency_type.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getcurrency_typeById = async (req, res) => {
  try {
    const id = req.params.id;
    const currency_type = await pool.query(
      `
          select * from currency_type where id = $1
        `,
      [id]
    );
    if (currency_type.rows.length == 0) {
      return res.status(400).json("Id is not found");
    }
    res.status(200).send(currency_type.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const updatecurrency_type = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const newcurrency_type = await pool.query(
      `
            UPDATE currency_type set name = $1,description = $2 WHERE id=$3
            RETURNING *
        `,
      [name, description, id]
    );
     if (newcurrency_type.rows.length == 0) {
       return res.status(400).json("Id is not found");
     }
    console.log(newcurrency_type);
    res.status(200).json(newcurrency_type.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const deletecurrency_type = async (req, res) => {
  try {
    const id = req.params.id;
    const currency_type = await pool.query(
      `DELETE FROM currency_type WHERE id = $1 returning *`,
      [id]
    );
    if (currency_type.rows.length == 0) {
      return res.status(400).json("Uchirish muvoffaqqiyatsiz yakunlandi!");
    }
    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addcurrency_type,
  getcurrency_type,
  getcurrency_typeById,
  updatecurrency_type,
  deletecurrency_type,
};
