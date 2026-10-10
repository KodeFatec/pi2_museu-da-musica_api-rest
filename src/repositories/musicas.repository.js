const { pool } = require("../config/database");
const consultaMusica = "select * from musica";

function montarMusica(linha) {
  return {
    id_musica: linha.id_musica,
    id_genero: linha.id_genero,
    titulo: linha.titulo,
    isrc: linha.isrc,
    duracao: linha.duracao,
    ano_gravacao: linha.ano_gravacao,
    descricao: linha.descricao,
    arquivo_audio: linha.arquivo_audio,
    spotify_uri: linha.spotify_uri,
    youtube_video_id: linha.youtube_video_id,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaMusica);
  return linhas.map(montarMusica);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(`${consultaMusica} WHERE id_musica = ?`, [
    id,
  ]);
  if (linhas.length === 0) {
    return null;
  }
  return montarMusica(linhas[0]);
}

async function criar(dadosMusica) {
  const musica = {
    id_genero: dadosMusica.id_genero ?? null,
    titulo: dadosMusica.titulo,
    isrc: dadosMusica.isrc ?? null,
    duracao: dadosMusica.duracao,
    ano_gravacao: dadosMusica.ano_gravacao ?? null,
    descricao: dadosMusica.descricao ?? null,
    arquivo_audio: dadosMusica.arquivo_audio ?? null,
    spotify_uri: dadosMusica.spotify_uri ?? null,
    youtube_video_id: dadosMusica.youtube_video_id ?? null,
  };
  const sql = "insert into musica SET ?";
  const [resultado] = await pool.query(sql, [musica]);
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosMusica) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    const [resultadoMusica] = await conexao.execute(
      `UPDATE musica
        SET id_genero=?, titulo=?, isrc=?, duracao=?, ano_gravacao=?,
            descricao=?, arquivo_audio=?, spotify_uri=?, youtube_video_id=?
        WHERE id_musica=?`,
      [
        dadosMusica.id_genero ?? null,
        dadosMusica.titulo,
        dadosMusica.isrc ?? null,
        dadosMusica.duracao,
        dadosMusica.ano_gravacao ?? null,
        dadosMusica.descricao ?? null,
        dadosMusica.arquivo_audio ?? null,
        dadosMusica.spotify_uri ?? null,
        dadosMusica.youtube_video_id ?? null,
        id,
      ],
    );

    if (resultadoMusica.affectedRows === 0) {
      await conexao.rollback();
      return null;
    }
    await conexao.commit();
    return buscarPorId(id);
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM musica where id_musica=?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
