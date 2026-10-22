const { body, param } = require("express-validator");
const { pool } = require("../config/database");

async function validarMusicaExistente(idMusica) {
  const [musicas] = await pool.execute(
    "SELECT id_musica FROM musica WHERE id_musica = ?",
    [idMusica],
  );

  if (musicas.length === 0) {
    throw new Error("A música informada não está cadastrada");
  }
}

const validarIdTrecho = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("O id do trecho deve ser um número inteiro positivo")
    .toInt(),
];

const validarLetraTrecho = [
  body("id_musica")
    .exists({ checkFalsy: true })
    .withMessage("O id da música é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O id da música deve ser um número inteiro positivo")
    .toInt()
    .bail()
    .custom(validarMusicaExistente),

  body("tempo_inicio")
    .exists({ checkFalsy: true })
    .withMessage("O tempo de início do trecho é obrigatório")
    .bail()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage("O tempo de início deve estar no formato HH:MM:SS"),

  body("tempo_fim")
    .exists({ checkFalsy: true })
    .withMessage("O tempo de fim do trecho é obrigatório")
    .bail()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage("O tempo de fim deve estar no formato HH:MM:SS"),

  body("ordem")
    .exists({ checkFalsy: true })
    .withMessage("A ordem de exibição é obrigatória")
    .bail()
    .isInt({ min: 1 })
    .withMessage("A ordem deve ser um número inteiro positivo")
    .toInt(),

  body("texto")
    .exists({ checkFalsy: true })
    .withMessage("O texto do trecho é obrigatório")
    .bail()
    .trim()
    .isLength({ min: 1, max: 16000 })
    .withMessage("O texto deve ter entre 1 e 16000 caracteres"),
];

module.exports = { validarLetraTrecho, validarIdTrecho };
