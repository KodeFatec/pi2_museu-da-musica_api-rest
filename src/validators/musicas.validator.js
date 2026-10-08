const { body, param } = require("express-validator");

const validarMusica = [
  body("id_genero")
    .optional()
    .isInt({ min: 1 })
    .withMessage("O id do gênero deve ser um número inteiro positivo")
    .toInt(),

  body("titulo")
    .exists({ checkFalsy: true })
    .withMessage("O título da música é obrigatório")
    .bail()
    .trim()
    .isLength({ min: 1, max: 150 })
    .withMessage("O título deve ter entre 1 e 150 caracteres"),

  body("isrc")
    .optional()
    .trim()
    .isLength({ min: 12, max: 12 })
    .withMessage("O ISRC deve ter exatamente 12 caracteres, sem os traços"),

  body("duracao")
    .exists({ checkFalsy: true })
    .withMessage("A duração da música é obrigatória")
    .bail()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage("A duração deve estar no formato HH:MM:SS"),

  body("ano_gravacao")
    .optional()
    .isInt({ min: 1860, max: 2026 }) // sinto que aqui é bom colocar o ano atual...
    .withMessage(
      "O ano de gravação deve ser um número inteiro entre 1860 e 2026",
    )
    .toInt(),

  body("descricao")
    .optional()
    .trim()
    .isLength({ max: 16000 })
    .withMessage(
      "A descrição deve ter no máximo 16000 caracteres, mais do que isso é exagero né?",
    ),

  body("arquivo_audio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "O caminho do arquivo de áudio deve ter no máximo 500 caracteres",
    ),

  body("spotify_uri")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("O URI do Spotify deve ter no máximo 255 caracteres"),

  body("youtube_video_id")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("O ID do vídeo do YouTube deve ter no máximo 100 caracteres"),
];

module.exports = { validarMusica };
