const { body } = require("express-validator");
const validarMuseu = [
  body("nome").trim().notEmpty().isLength({ max: 150 }),
  body("descricao").optional({ nullable: true }).trim(),
  body("endereco").optional({ nullable: true }).trim().isLength({ max: 255 }),
  body("telefone").optional({ nullable: true }).trim().isLength({ max: 20 }),
  body("email").optional({ nullable: true }).trim().isEmail(),
];
module.exports = { validarMuseu };
