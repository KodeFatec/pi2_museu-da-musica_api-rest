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

async function validarFavoritoNaoCadastrado(idMusica, { req }) {
  const [favoritos] = await pool.execute(
    "SELECT id_usuario FROM musica_favorita WHERE id_usuario = ? AND id_musica = ?",
    [req.body.id_usuario, idMusica],
  );

  if (favoritos.length > 0) {
    throw new Error("Esta música já está cadastrada como favorita");
  }
}

const validarMusicaFavorita = [
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
    .custom(validarMusicaExistente)
    .bail()
    .custom(validarFavoritoNaoCadastrado),
];

module.exports = { validarMusicaFavorita };