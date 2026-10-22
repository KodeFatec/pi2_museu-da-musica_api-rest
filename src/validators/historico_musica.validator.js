const { body } = require("express-validator");
const { pool } = require("../config/database");

async function validarUsuarioExistente(idUsuario) {
  const [usuarios] = await pool.execute(
    "SELECT id_usuario FROM usuario WHERE id_usuario = ?",
    [idUsuario],
  );

  if (usuarios.length === 0) {
    throw new Error("O usuário informado não está cadastrado");
  }
}

async function validarMusicaExistente(idMusica) {
  const [musicas] = await pool.execute(
    "SELECT id_musica FROM musica WHERE id_musica = ?",
    [idMusica],
  );

  if (musicas.length === 0) {
    throw new Error("A música informada não está cadastrada");
  }
}

const validarHistoricoMusica = [
  body("id_usuario")
    .exists({ checkFalsy: true })
    .withMessage("O id do usuário é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O id do usuário deve ser um número inteiro positivo")
    .toInt()
    .bail()
    .custom(validarUsuarioExistente),

  body("id_musica")
    .exists({ checkFalsy: true })
    .withMessage("O id da música é obrigatório")
    .bail()
    .isInt({ min: 1 })
    .withMessage("O id da música deve ser um número inteiro positivo")
    .toInt()
    .bail()
    .custom(validarMusicaExistente),

  body("progresso")
    .optional()
    .matches(/^\d{2}:\d{2}:\d{2}$/)
    .withMessage("O progresso deve estar no formato HH:MM:SS"),
];

module.exports = { validarHistoricoMusica };
