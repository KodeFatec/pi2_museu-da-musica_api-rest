const { pool } = require("../config/database");
const consultaMidia = "SELECT * FROM midia";

async function listar() {
  const [linhas] = await pool.query(consultaMidia);
  return linhas;
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(`${consultaMidia} WHERE id_midia = ?`, [id]);
  return linhas[0] ?? null;
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO midia (id_item, tipo_midia, arquivo_url, descricao) VALUES (?, ?, ?, ?)",
    [dados.id_item, dados.tipo_midia, dados.arquivo_url, dados.descricao ?? null],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE midia SET id_item = ?, tipo_midia = ?, arquivo_url = ?, descricao = ? WHERE id_midia = ?",
    [dados.id_item, dados.tipo_midia, dados.arquivo_url, dados.descricao ?? null, id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute("DELETE FROM midia WHERE id_midia = ?", [id]);
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
