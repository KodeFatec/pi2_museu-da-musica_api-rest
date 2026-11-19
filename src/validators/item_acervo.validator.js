const { body } = require("express-validator");
const validarItemAcervo = [
  body("id_categoria").isInt({ min: 1 }).toInt(),
  body("titulo").trim().notEmpty().isLength({ max: 200 }),
  body("descricao").optional({ nullable: true }).trim(),
  body("origem").optional({ nullable: true }).trim().isLength({ max: 200 }),
  body("data_aquisicao").optional({ nullable: true }).isISO8601(),
  body("estado_conservacao").optional({ nullable: true }).trim().isLength({ max: 50 }),
];
module.exports = { validarItemAcervo };
