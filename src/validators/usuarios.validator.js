const { body } = require("express-validator");

const validarUsuario = [
  body("nome").trim().notEmpty().isLength({ max: 150 }).withMessage("Nome obrigatório"),
  body("email").trim().isEmail().isLength({ max: 150 }).normalizeEmail(),
  body("senha").optional({ checkFalsy: true }).isLength({ min: 6, max: 72 }),
  body("cpf").optional({ nullable: true }).trim().isLength({ min: 11, max: 11 }).isNumeric(),
  body("telefone").optional({ nullable: true }).trim().isLength({ max: 20 }),
];
const validarLogin = [
  body("email").trim().isEmail().withMessage("E-mail inválido"),
  body("senha").notEmpty().withMessage("Senha obrigatória"),
];
module.exports = { validarUsuario, validarLogin };
