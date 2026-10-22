const { body } = require("express-validator");
const { pool } = require("../config/database");

async function validarIsrcUnico(isrc, { req }) {
  const idMusica = req.params.id;

  const [musicas] = await pool.execute(
    "SELECT id_musica FROM musica WHERE isrc = ? AND (? IS NULL OR id_musica <> ?)",
    [isrc, idMusica, idMusica],
  );

  if (musicas.length > 0) {
    throw new Error("O ISRC já está cadastrado");
  }
}

async function validarSpotifyUriUnico(spotifyUri, { req }) {
  const idMusica = req.params.id;

  const [musicas] = await pool.execute(
    "SELECT id_musica FROM musica WHERE spotify_uri = ? AND (? IS NULL OR id_musica <> ?)",
    [spotifyUri, idMusica, idMusica],
  );

  if (musicas.length > 0) {
    throw new Error("O URI do Spotify já está cadastrado");
  }
}

async function validarYoutubeVideoIdUnico(youtubeVideoId, { req }) {
  const idMusica = req.params.id;

  const [musicas] = await pool.execute(
    "SELECT id_musica FROM musica WHERE youtube_video_id = ? AND (? IS NULL OR id_musica <> ?)",
    [youtubeVideoId, idMusica, idMusica],
  );

  if (musicas.length > 0) {
    throw new Error("O ID do vídeo do YouTube já está cadastrado");
  }
}

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
    .withMessage("O ISRC deve ter exatamente 12 caracteres, sem os traços")
    .bail()
    .matches(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/)
    .withMessage(
      "O ISRC deve estar no formato correto: 2 letras maiúsculas, 3 letras ou números, e 7 dígitos",
    )
    .bail()
    .custom(validarIsrcUnico),

  body("duracao")
    .exists({ checkFalsy: true })
    .withMessage("A duração da música é obrigatória")
    .bail()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage("A duração deve estar no formato HH:MM:SS"),

  body("ano_gravacao")
    .optional()
    .isInt({ min: 1860, max: anoAtual })
    .withMessage(
      "O ano de gravação deve ser um número inteiro entre 1860 e o ano atual",
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
    )
    .bail()
    .isURL()
    .withMessage("O arquivo da partitura deve ser uma URL válida"),

  body("spotify_uri")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage("O URI do Spotify deve ter no máximo 255 caracteres")
    .bail()
    .custom(validarSpotifyUriUnico),

  body("youtube_video_id")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("O ID do vídeo do YouTube deve ter no máximo 100 caracteres")
    .bail()
    .custom(validarYoutubeVideoIdUnico),
];

module.exports = { validarMusica };
