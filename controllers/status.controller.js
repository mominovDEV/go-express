const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addstatus = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newstatus = await pool.query(
      `
        INSERT INTO status (name,description)
        values($1, $2) RETURNING *
        `,
      [name, description]
    );
    console.log(newstatus);
    res.status(200).json(newstatus.rows);
  } catch (error) {
    res.status(500).json("Serverda xatolik");
    console.log(error);
    errorHandler(res, error);
  }
};

const getstatus = async (req, res) => {
  try {
    const status = await pool.query(`select * from status`);
    res.status(200).send(status.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getstatusById = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await pool.query(
      `
          select * from status where id = $1
        `,
      [id]
    );
    if (status.rows.length == 0) {
      return res.status(400).json("Id is not found");
    }
    res.status(200).send(status.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const updatestatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, description } = req.body;

    const newstatus = await pool.query(
      `
            UPDATE status set name = $1, description = $2 where id = $3
            RETURNING *
        `,
      [name, description, id]
    );
    if (newstatus.rows.length == 0) {
      return res.status(400).json("Id is not found");
    }
    res.status(200).json(newstatus.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const deletestatus = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await pool.query(
      `DELETE FROM status WHERE id = $1 returning *`,
      [id]
    );
    if (status.rows.length == 0) {
      return res.status(400).json("Uchirish muvoffaqqiyatsiz yakunlandi!");
    }

    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addstatus,
  getstatus,
  getstatusById,
  updatestatus,
  deletestatus,
};
