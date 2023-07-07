const pool = require("../config/db");
const myJwt = require("../services/JwtService");
const config = require("config");

module.exports = async function (req, res, next) {
  if (req.method == "OPTIONS") {
    next();
  }
  try {
    const authorization = req.headers.authorization;
    console.log(authorization);
    if (!authorization) {
      return res.status(403).json({ message: "Admin ro'yxatdan o'tmagan!" });
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer != "Bearer" || !token) {
      return res.status(403).json({
        message: "Admin ro'yhatdan o'tmagan(token berilmagan)",
      });
    }

    const [error, decodedtoken] = await to(myJwt.verifyAccess(token));

    console.log(decodedtoken);

    if (error) {
      return res.status(403).json({ message: error.message });
    }
    if (!decodedtoken.is_active) {
      return res.status(400).json({ massage: error.message });
    }
    next();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ message: "Admin ro'yhatdan o'tmagan(token notog'ri)" });
  }
};
async function to(promise) {
  return promise.then((response) => [null, response]).catch((error) => [error]);
}