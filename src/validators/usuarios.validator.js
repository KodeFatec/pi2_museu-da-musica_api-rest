const { body } = require("express-validator");

const validarUsuario = [
  body("nome")
    .trim()
    .notEmpty()
    .isLength({ max: 150 })
    .withMessage("Nome obrigatório"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("E-mail inválido")
    .isLength({ max: 150 })
    .normalizeEmail(),
  body("senha")
    .optional({ checkFalsy: true })
    .isLength({ min: 6, max: 72 })
    .withMessage("Senha deve ter entre 6 e 72 caracteres"),
  body("cpf")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 11, max: 11 })
    .withMessage("CPF deve ter 11 dígitos")
    .isNumeric()
    .withMessage("CPF deve conter apenas números"),
  body("telefone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage("Telefone deve ter no máximo 20 caracteres"),
];

const validarCadastro = [
  body("nome")
    .trim()
    .notEmpty()
    .isLength({ max: 150 })
    .withMessage("Nome obrigatório"),
  body("email")
    .trim()
    .isEmail()
    .withMessage("E-mail inválido")
    .isLength({ max: 150 })
    .normalizeEmail(),
  body("senha")
    .notEmpty()
    .withMessage("Senha obrigatória")
    .isLength({ min: 6, max: 72 })
    .withMessage("Senha deve ter entre 6 e 72 caracteres"),
  body("cpf")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 11, max: 11 })
    .withMessage("CPF deve ter 11 dígitos")
    .isNumeric()
    .withMessage("CPF deve conter apenas números"),
  body("telefone")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage("Telefone deve ter no máximo 20 caracteres"),
];

const validarLogin = [
  body()
    .custom((_, { req }) => {
      const identificador = req.body.login || req.body.email;
      if (
        !identificador ||
        typeof identificador !== "string" ||
        !identificador.trim()
      ) {
        throw new Error("Informe o e-mail ou CPF");
      }
      return true;
    }),
  body("senha")
    .notEmpty()
    .withMessage("Senha obrigatória"),
];

module.exports = { validarUsuario, validarCadastro, validarLogin };
