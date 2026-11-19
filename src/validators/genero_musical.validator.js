const { body } = require("express-validator");

const validarGenero = [
  body("nome").trim().notEmpty().isLength({ max: 80 }).withMessage("Nome do gênero é obrigatório"),
  body("descricao").optional({ nullable: true }).trim().isLength({ max: 16000 }),
];
module.exports = { validarGenero };
