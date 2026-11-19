const { body } = require("express-validator");
const validarSala = [
  body("id_museu").isInt({ min: 1 }).toInt(),
  body("nome").trim().notEmpty().isLength({ max: 100 }),
  body("descricao").optional({ nullable: true }).trim(),
  body("capacidade").optional({ nullable: true }).isInt({ min: 0 }).toInt(),
];
module.exports = { validarSala };
