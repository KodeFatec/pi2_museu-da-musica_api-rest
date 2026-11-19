const { body } = require("express-validator");
const validarCategoria = [
  body("nome").trim().notEmpty().isLength({ max: 100 }),
  body("descricao").optional({ nullable: true }).trim(),
];
module.exports = { validarCategoria };
