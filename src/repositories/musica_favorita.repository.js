const { pool } = require("../config/database");

const consultaMusicaFavorita =
  "SELECT id_usuario, id_musica, data_curtida FROM musica_favorita";

async function listar() {
  const [linhas] = await pool.query(consultaMusicaFavorita);
  return linhas;
}

async function buscarPorId(idUsuario) {
  const [linhas] = await pool.execute(
    `${consultaMusicaFavorita} WHERE id_usuario = ?`,
    [idUsuario],
  );
  return linhas[0] ?? null;
}

async function criar(dados) {
  await pool.execute(
    "INSERT INTO musica_favorita (id_usuario, id_musica) VALUES (?, ?)",
    [dados.id_usuario, dados.id_musica],
  );
  return buscarPorId(dados.id_usuario);
}

async function atualizar(idUsuario, idMusica) {
  const existente = await buscarPorId(idUsuario);
  if (!existente) {
    return null;
  }

  await pool.execute(
    `UPDATE musica_favorita
      SET id_musica = ?, data_curtida = CURRENT_TIMESTAMP
      WHERE id_usuario = ?`,
    [idMusica, idUsuario],
  );
  return buscarPorId(idUsuario);
}

async function remover(idUsuario) {
  const [resultado] = await pool.execute(
    "DELETE FROM musica_favorita WHERE id_usuario = ?",
    [idUsuario],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };