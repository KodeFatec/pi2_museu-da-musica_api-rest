const { body } = require("express-validator");
const validarLocalizacao = [
  body("id_sala").isInt({ min: 1 }).toInt(),
  body("data_inicio").optional({ nullable: true }).isISO8601(),
];
module.exports = { validarLocalizacao };
