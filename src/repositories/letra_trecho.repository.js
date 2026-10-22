const { pool } = require("../config/database");
const consultaLetraTrecho = "select * from letra_trecho";

function montarLetraTrecho(linha) {
  return {
    id_trecho: linha.id_trecho,
    id_musica: linha.id_musica,
    tempo_inicio: linha.tempo_inicio,
    tempo_fim: linha.tempo_fim,
    ordem: linha.ordem,
    texto: linha.texto,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaLetraTrecho);
  return linhas.map(montarLetraTrecho);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaLetraTrecho} WHERE id_trecho = ?`,
    [id],
  );
  if (linhas.length === 0) {
    return null;
  }
  return montarLetraTrecho(linhas[0]);
}

async function criar(dadosTrecho) {
  const trecho = {
    id_musica: dadosTrecho.id_musica,
    tempo_inicio: dadosTrecho.tempo_inicio,
    tempo_fim: dadosTrecho.tempo_fim,
    ordem: dadosTrecho.ordem,
    texto: dadosTrecho.texto,
  };
  const sql = "insert into letra_trecho SET ?";
  const [resultado] = await pool.query(sql, [trecho]);
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosTrecho) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    const [resultadoTrecho] = await conexao.execute(
      `UPDATE letra_trecho
        SET id_musica=?, tempo_inicio=?, tempo_fim=?, ordem=?, texto=?
        WHERE id_trecho=?`,
      [
        dadosTrecho.id_musica,
        dadosTrecho.tempo_inicio,
        dadosTrecho.tempo_fim,
        dadosTrecho.ordem,
        dadosTrecho.texto,
        id,
      ],
    );

    if (resultadoTrecho.affectedRows === 0) {
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
    "DELETE FROM letra_trecho WHERE id_trecho=?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
