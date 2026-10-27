const { pool } = require("../config/database");
const consultaMusicaFavorita = "SELECT * FROM musica_favorita";

function montarMusicaFavorita(linha) {
  return {
    id_usuario: linha.id_usuario,
    id_musica: linha.id_musica,
    data_favoritada: linha.data_favoritada,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaMusicaFavorita);
  return linhas.map(montarMusicaFavorita);
}

async function buscarPorUsuario(idUsuario) {
  const [linhas] = await pool.execute(
    `${consultaMusicaFavorita} WHERE id_usuario = ?`,
    [idUsuario],
  );
  return linhas.map(montarMusicaFavorita);
}

async function criar(dadosMusica) {
  const musicaFavorita = {
    id_usuario: dadosMusica.id_usuario,
    id_musica: dadosMusica.id_musica,
  };
  const sql = "insert into musica_favorita SET ?";
  const [resultado] = await pool.query(sql, [musicaFavorita]);
  const [linhas] = await pool.execute(
    `${consultaMusicaFavorita} WHERE id_usuario = ? AND id_musica = ?`,
    [musicaFavorita.id_usuario, musicaFavorita.id_musica],
  );
  return linhas.length ? montarMusicaFavorita(linhas[0]) : null;
}

/*async function atualizar(idUsuario, idMusica) {
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
*/

async function remover(idUsuario, idMusica) {
  const [resultado] = await pool.execute(
    idMusica === undefined
      ? "DELETE FROM musica_favorita WHERE id_usuario = ?"
      : "DELETE FROM musica_favorita WHERE id_usuario = ? AND id_musica = ?",
    idMusica === undefined ? [idUsuario] : [idUsuario, idMusica],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorUsuario, criar, remover };