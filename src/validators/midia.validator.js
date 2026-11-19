const { body } = require("express-validator");
const validarMidia = [
  body("id_item").isInt({ min: 1 }).toInt(),
  body("tipo_midia").trim().notEmpty().isIn(["foto", "pdf", "digitalizacao", "imagem", "documento"]).withMessage("Tipo de mídia inválido"),
  body("arquivo_url").trim().notEmpty().isURL().isLength({ max: 500 }),
  body("descricao").optional({ nullable: true }).trim().isLength({ max: 255 }),
];
module.exports = { validarMidia };
