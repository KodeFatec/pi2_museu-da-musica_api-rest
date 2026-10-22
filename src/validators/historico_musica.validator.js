const { body } = require("express-validator");

const validarHistoricoMusica = [
  body("id_usuario")
    .exists({ checkFalsy: true })
    .withMessage("O id do usuário é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O id do usuário deve ser um número inteiro positivo")
    .toInt(),

  body("id_musica")
    .exists({ checkFalsy: true })
    .withMessage("O id da música é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O id da música deve ser um número inteiro positivo")
    .toInt(),

  body("progresso")
    .optional()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage("O progresso deve estar no formato HH:MM:SS"),
];

module.exports = { validarHistoricoMusica };
