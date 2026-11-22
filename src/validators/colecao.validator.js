const { body, param } = require("express-validator");
const validarColecao = [
  body("titulo").trim().notEmpty().isLength({ max: 150 }),
  body("descricao").optional({ nullable: true }).trim(),
];
const validarAssociacao = [
  param("id").isInt({ min: 1 }).toInt(),
  body("id_item").isInt({ min: 1 }).toInt(),
];
module.exports = { validarColecao, validarAssociacao };
