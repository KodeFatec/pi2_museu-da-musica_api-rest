const { pool } = require("../config/database");

async function listarPorItem(idItem, somenteAtual = false) {
  const sql = somenteAtual
    ? `SELECT l.*, s.nome AS sala, s.id_museu
       FROM item_localizacao l JOIN sala s ON s.id_sala = l.id_sala
       WHERE l.id_item = ? AND l.data_fim IS NULL
       ORDER BY l.data_inicio DESC`
    : `SELECT l.*, s.nome AS sala, s.id_museu
       FROM item_localizacao l JOIN sala s ON s.id_sala = l.id_sala
       WHERE l.id_item = ? ORDER BY l.data_inicio DESC`;
  const [linhas] = await pool.execute(sql, [idItem]);
  return linhas;
}
async function registrar(idItem, dados) {
  const conexao = await pool.getConnection();
  try {
    await conexao.beginTransaction();
    await conexao.execute(
      "UPDATE item_localizacao SET data_fim = NOW() WHERE id_item = ? AND data_fim IS NULL",
      [idItem],
    );
    const [resultado] = await conexao.execute(
      "INSERT INTO item_localizacao (id_item, id_sala, data_inicio, data_fim) VALUES (?, ?, COALESCE(?, NOW()), NULL)",
      [idItem, dados.id_sala, dados.data_inicio ?? null],
    );
    await conexao.commit();
    const [linhas] = await pool.execute("SELECT * FROM item_localizacao WHERE id_localizacao = ?", [resultado.insertId]);
    return linhas[0] ?? null;
  } catch (erro) {
    await conexao.rollback();
    throw erro;
  } finally {
    conexao.release();
  }
}
async function encerrar(idItem) {
  const [resultado] = await pool.execute(
    "UPDATE item_localizacao SET data_fim = NOW() WHERE id_item = ? AND data_fim IS NULL",
    [idItem],
  );
  return resultado.affectedRows > 0;
}
module.exports = { listarPorItem, registrar, encerrar };
