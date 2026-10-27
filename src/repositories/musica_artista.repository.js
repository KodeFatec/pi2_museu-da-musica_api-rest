const { pool } = require("../config/database");

function montarMusicaArtista(linha) {
  return {
    id_musica: linha.id_musica,
    id_artista: linha.id_artista,
    tipo_participacao: linha.tipo_participacao,
  };
}

async function listar(idMusica) {
  const [linhas] = await pool.query(
    idMusica === undefined
      ? "SELECT id_musica, id_artista, tipo_participacao FROM musica_artista"
      : "SELECT id_musica, id_artista, tipo_participacao FROM musica_artista WHERE id_musica = ?",
    idMusica === undefined ? [] : [idMusica],
  );
  return linhas.map(montarMusicaArtista);
}

async function buscarPorId(idMusica, idArtista) {
  const [linhas] = await pool.query(
    `SELECT id_musica, id_artista, tipo_participacao
     FROM musica_artista
     WHERE id_musica = ? AND id_artista = ?`,
    [idMusica, idArtista],
  );
  return linhas.length ? montarMusicaArtista(linhas[0]) : null;
}

async function criar(dadosMusicaArtista) {
  const relacao = {
    id_musica: dadosMusicaArtista.id_musica,
    id_artista: dadosMusicaArtista.id_artista,
    tipo_participacao: dadosMusicaArtista.tipo_participacao ?? null,
  };
  await pool.query("INSERT INTO musica_artista SET ?", [relacao]);
  return buscarPorId(relacao.id_musica, relacao.id_artista);
}

async function atualizar(idMusica, idArtista, dadosMusicaArtista) {
  const existente = await buscarPorId(idMusica, idArtista);
  if (!existente) {
    return null;
  }

  await pool.execute(
    `UPDATE musica_artista
     SET tipo_participacao = ?
     WHERE id_musica = ? AND id_artista = ?`,
    [
      dadosMusicaArtista.tipo_participacao ?? null,
      idMusica,
      idArtista,
    ],
  );

  return buscarPorId(idMusica, idArtista);
}

async function remover(idMusica, idArtista) {
  const [resultado] = await pool.execute(
    "DELETE FROM musica_artista WHERE id_musica = ? AND id_artista = ?",
    [idMusica, idArtista],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
