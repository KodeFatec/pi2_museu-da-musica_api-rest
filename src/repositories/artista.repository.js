const { pool } = require("../config/database");
const consultaArtista = "select * from artista";

function montarArtista(linha) {
  return {
    id_artista: linha.id_artista,
    nome_artistico: linha.nome_artistico,
    nome_completo: linha.nome_completo,
    biografia: linha.biografia,
    data_nascimento: linha.data_nascimento,
    data_falecimento: linha.data_falecimento,
    foto_url: linha.foto_url,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaArtista);
  return linhas.map(montarArtista);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(`${consultaArtista} WHERE id_artista = ?`, [
    id,
  ]);
  if (linhas.length === 0) {
    return null;
  }
  return montarArtista(linhas[0]);
}

async function criar(dadosArtista) {
  const artista = {
    nome_artistico: dadosArtista.nome_artistico ?? null,
    nome_completo: dadosArtista.nome_completo ?? null,
    biografia: dadosArtista.biografia ?? null,
    data_nascimento: dadosArtista.data_nascimento ?? null,
    data_falecimento: dadosArtista.data_falecimento ?? null,
    foto_url: dadosArtista.foto_url ?? null,
  };
  const sql = "insert into artista SET ?";
  const [resultado] = await pool.query(sql, [artista]);
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosArtista) {
  const [resultado] = await pool.execute(
    `UPDATE artista
SET nome_artistico=?, nome_completo=?, biografia=?, data_nascimento=?,
    data_falecimento=?, foto_url=?
WHERE id_artista=?`,
    [
      dadosArtista.nome_artistico ?? null,
      dadosArtista.nome_completo ?? null,
      dadosArtista.biografia ?? null,
      dadosArtista.data_nascimento ?? null,
      dadosArtista.data_falecimento ?? null,
      dadosArtista.foto_url ?? null,
      id,
    ],
  );

  if (resultado.affectedRows === 0) {
    return null;
  }
  return buscarPorId(id);
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM artista WHERE id_artista=?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };