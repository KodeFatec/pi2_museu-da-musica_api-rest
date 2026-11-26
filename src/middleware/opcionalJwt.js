const jwt = require("jsonwebtoken");

function opcionalJwt(req, res, next) {
  const partes = (req.get("Authorization") || "").split(" ");
  if (partes.length !== 2 || partes[0].toLowerCase() !== "bearer") {
    req.usuario = null;
    return next();
  }
  try {
    const payload = jwt.verify(partes[1], process.env.JWT_SECRET, {
      algorithms: ["HS256"],
    });
    req.usuarioIdVisitante = payload.sub;
  } catch {
    req.usuarioIdVisitante = null;
  }
  req.usuario = null;
  return next();
}

module.exports = { opcionalJwt };
