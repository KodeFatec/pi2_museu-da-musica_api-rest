const { body } = require("express-validator");

const validarArtista = [
  body("nome_artistico")
    .optional()
    .trim()
    .isLength({ min: 1, max: 150 })
    .withMessage("O nome artístico deve ter entre 1 e 150 caracteres"),

  body("nome_completo")
    .optional()
    .trim()
    .isLength({ min: 1, max: 200 })
    .withMessage("O nome completo deve ter entre 1 e 200 caracteres"),

  body("biografia")
    .optional()
    .isString()
    .withMessage("A biografia deve ser um texto")
    .bail()
    .isLength({ max: 65535 })
    .withMessage("A biografia excede o tamanho máximo permitido"),

  body("data_nascimento")
    .optional()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Use uma data válida no formato AAAA-MM-DD"),

  body("data_falecimento")
    .optional()
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage("Use uma data válida no formato AAAA-MM-DD")
    .bail(),

  body("foto_url")
    .optional()
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("A URL ou caminho da foto deve ter até 500 caracteres"),
];

module.exports = { validarArtista };