const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("Token não fornecido");
    }

    // Pega só o token, removendo a palavra "Bearer "
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json("Token inválido");
    }

    // Verifica token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json("Token inválido");
  }
};