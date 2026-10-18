const { pool } = require("../config/database");
const consultaMusicaFavorita =  "SELECT * FROM musica_favorita";

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

async function buscarPorId(idUsuario) {
  const [linhas] = await pool.execute(
    `${consultaMusicaFavorita} WHERE id_usuario = ?`,
    [idUsuario],
  );
  if (linhas.length === 0) {
    return null;
  }
  return montarMusicaFavorita(linhas[0]);
}

async function criar(dadosMusica) {
  const musicaFavorita = {
    id_usuario: dadosMusica.id_usuario,
    id_musica: dadosMusica.id_musica,
  };
  const sql = "insert into musica_favorita SET ?";
  const [resultado] = await pool.query(sql, [musicaFavorita]);
  return buscarPorId(resultado.insertId);
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

async function remover(idUsuario) {
  const [resultado] = await pool.execute(
    "DELETE FROM musica_favorita WHERE id_usuario = ?",
    [idUsuario],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, remover };