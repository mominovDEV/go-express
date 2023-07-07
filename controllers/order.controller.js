const pool = require("../config/db");
const uuid = require("uuid");
const { errorHandler } = require("../helpers/error_handler");

const addorders = async (req, res) => {
  try {
    const {
      full_name,
      phone_number,
      product_link,
      summa,
      currency_type_id,
      truck,
      email,
      description,
    } = req.body;
    const neworders = await pool.query(
      `
        INSERT INTO orders (order_unique_id, full_name, phone_number, product_link, summa,currency_type_id,truck,email,description)
        values($1, $2, $3, $4,$5,$6,$7,$8,$9) RETURNING *
        `,
      [
        uuid.v4(),
        full_name,
        phone_number,
        product_link,
        summa,
        currency_type_id,
        truck,
        email,
        description,
      ]
    );
    console.log(neworders);
    res.status(200).json(neworders.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getorders = async (req, res) => {
  try {
    const orders = await pool.query(`select * from orders`);
    res.status(200).send(orders.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getordersById = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await pool.query(
      `
          select * from orders where id = $1
        `,
      [id]
    );
       if (orders.rows.length == 0) {
         return res.status(400).json("Id is not found");
       }
    res.status(200).send(orders.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const updateorders = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      full_name,
      phone_number,
      product_link,
      summa,
      truck,
      email,
      description,
    } = req.body;

    const neworders = await pool.query(
      `
            UPDATE orders set order_unique_id = $1,full_name = $2,phone_number = $3,product_link = $4,summa=$5, truck=$6,email=$7,description = $8 where id =$9
            RETURNING *
        `,
      [
        uuid.v4(),
        full_name,
        phone_number,
        product_link,
        summa,
        truck,
        email,
        description,
        id,
      ]
    );
       if (neworders.rows.length == 0) {
         return res.status(400).json("Id is not found");
       }
    res.status(200).json(neworders.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const deleteorders = async (req, res) => {
  try {
    const id = req.params.id;
    const orders = await pool.query(
      `DELETE FROM orders WHERE id = $1 returning *`,
      [id]
    );
    if (orders.rows.length == 0) {
      return res.status(400).send({ massage: "Uchirishda hotolik!!!" });
    }
    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addorders,
  getorders,
  getordersById,
  updateorders,
  deleteorders,
};
