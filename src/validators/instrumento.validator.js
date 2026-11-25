const { body } = require("express-validator");
const validarInstrumento = [
  body("id_item")
    .isInt({ min: 1 })
    .toInt(),
  body("tipo_instrumento")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 100 }),
  body("fabricante")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 150 }),
  body("ano_fabricacao")
    .optional({ nullable: true })
    .isInt({
      min: 1000, max: new Date()
        .getFullYear()
    })
    .toInt(),
  body("antigo_dono")
    .optional({ nullable: true })
    .trim()
    .isLength({ max: 150 }),
];
module.exports = { validarInstrumento };
