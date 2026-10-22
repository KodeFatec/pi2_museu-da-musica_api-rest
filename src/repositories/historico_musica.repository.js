const { pool } = require("../config/database");
const consultaHistorico = "select * from historico_musicas";

function montarHistorico(linha) {
  return {
    id_historico: linha.id_historico,
    id_usuario: linha.id_usuario,
    id_musica: linha.id_musica,
    data_reproducao: linha.data_reproducao,
    progresso: linha.progresso,
  };
}

async function listar() {
  const [linhas] = await pool.query(consultaHistorico);
  return linhas.map(montarHistorico);
}

async function buscarPorId(id) {
  const [linhas] = await pool.query(
    `${consultaHistorico} WHERE id_historico = ?`,
    [id],
  );
  if (linhas.length === 0) {
    return null;
  }
  return montarHistorico(linhas[0]);
}

async function criar(dadosHistorico) {
  const historico = {
    id_usuario: dadosHistorico.id_usuario,
    id_musica: dadosHistorico.id_musica,
    progresso: dadosHistorico.progresso ?? null,
  };
  const sql = "insert into historico_musicas SET ?";
  const [resultado] = await pool.query(sql, [historico]);
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosHistorico) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    const [resultadoHistorico] = await conexao.execute(
      `UPDATE historico_musicas
        SET id_usuario=?, id_musica=?, progresso=?
        WHERE id_historico=?`,
      [
        dadosHistorico.id_usuario,
        dadosHistorico.id_musica,
        dadosHistorico.progresso ?? null,
        id,
      ],
    );

    if (resultadoHistorico.affectedRows === 0) {
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
    "DELETE FROM historico_musicas WHERE id_historico=?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
