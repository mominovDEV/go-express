const pool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { errorHandler } = require("../helpers/error_handler");

const config = require("config");

const generateAccessToken = (id, is_active) => {
  const payload = {
    id,
    is_active,
  };
  return jwt.sign(payload, config.get("access_key"), { expiresIn: "1h" });
};

const refreshToken = (id, is_active) => {
  const payload = {
    id,
    is_active,
  };
  return jwt.sign(payload, config.get("refresh_key"), { expiresIn: "1h" });
};

const loginadmin = async (req, res) => {
  try {
    console.log(1);
    const { email, hashed_password } = req.body;

    const admin = await pool.query("SELECT * FROM admin WHERE email = $1 ", [
      email,
    ]);

    if (admin.rows.length === 0) {
      return res.status(400).send({ message: "Invalid email!" });
    }

    const validEmail = bcrypt.compareSync(
      hashed_password,
      admin.rows[0].hashed_password
    );

    if (!validEmail) {
      return res.status(400).send({ message: "Invalid Password!" });
    }

    const payload = {
      id: admin.rows[0].id,
      is_creator: admin.rows[0].is_creator,
    };

    const tokens = {
      accessToken: generateAccessToken(payload.id, payload.is_creator),
      refreshToken: refreshToken(payload.id, payload.is_creator),
    };

    await pool.query("UPDATE admin SET hashed_token = $1 WHERE id = $2", [
      tokens.refreshToken,
      payload.id,
    ]);

    res.cookie("adminRefreshToken", tokens.refreshToken, {
      maxAge: config.get("refresh_ms"),
      httpOnly: true,
    });

    res.status(200).send({ tokens });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

async function logoutAdmin(req, res) {
  try {
    const { adminRefreshToken } = req.cookies;
    console.log(adminRefreshToken);
    if (!adminRefreshToken) {
      return res.status(403).send({ message: "Token is not given" });
    }
    const admin = await admin.findOneAndUpdate(
      { admin_token: adminRefreshToken },
      { admin_token: "" },
      { new: true }
    );
    if (!admin) {
      return res.status(403).send({ message: "Token is not given" });
    }
    res.clearCookie("adminRefreshToken");
    res.send({ message: "Logged out" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
}

const addAdmin = async (req, res) => {
  try {
    const {
      full_name,
      user_name,
      hashed_password,
      phone_number,
      email,
      tg_link,
      description,
    } = req.body;

    const adminHashedPassword = bcrypt.hashSync(hashed_password, 7);

    const admin = await pool.query(`select * from admin`);

    const token = generateAccessToken(admin.id, admin.is_active, [
      "READ",
      "WRITE",
      "UPDATE",
      "DELETE",
    ]);
    console.log(token);
    const newAdmin = await pool.query(
      `
        INSERT INTO admin (full_name,user_name, hashed_password,phone_number,email,tg_link,hashed_token,description)
        values($1, $2, $3, $4, $5, $6, $7,$8) RETURNING *
        `,
      [
        full_name,
        user_name,
        adminHashedPassword,
        phone_number,
        email,
        tg_link,
        token,
        description,
      ]
    );
    console.log(newAdmin);
    res.status(200).json(newAdmin.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await pool.query(`select * from admin`);
    res.status(200).send(admin.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const getAdminById = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await pool.query(
      `
          select * from admin where id = $1
        `,
      [id]
    );
    if (admin.rows.length == 0) {
      return res.status(400).json("Id is not found");
    }
    res.status(200).send(admin.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const updateAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const { full_name, user_name, phone_number, email, description } = req.body;

    const newAdmin = await pool.query(
      `
            UPDATE admin set full_name = $1,user_name = $2,phone_number = $3,email = $4, description = $5 WHERE id = $6
            RETURNING *
        `,
      [full_name, user_name, phone_number, email, description, id]
    );
    if (newAdmin.rows.length == 0) {
      return res.status(400).json("Id is not found");
    }
    res.status(200).json(newAdmin.rows);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await pool.query(
      `DELETE FROM admin WHERE id = $1 returning *`,
      [id]
    );
    if (admin.rows.length == 0) {
      return res.status(400).json("Uchirish muvoffaqqiyatsiz yakunlandi!");
    }
    res.status(200).json("Successfully deleted");
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addAdmin,
  getAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginadmin,
  logoutAdmin,
};
