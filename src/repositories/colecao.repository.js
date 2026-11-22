const { pool } = require("../config/database");

async function listar() {
  const [linhas] = await pool.query("SELECT * FROM colecao");
  return linhas;
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(
    "SELECT * FROM colecao WHERE id_colecao = ?",
    [id],
  );
  return linhas[0] ?? null;
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO colecao (titulo, descricao) VALUES (?, ?)",
    [dados.titulo, dados.descricao ?? null],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE colecao SET titulo = ?, descricao = ? WHERE id_colecao = ?",
    [dados.titulo, dados.descricao ?? null, id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM colecao WHERE id_colecao = ?",
    [id],
  );
  return resultado.affectedRows > 0;
}
async function listarItens(idColecao) {
  const [linhas] = await pool.execute(
    `SELECT ia.*, c.nome AS categoria
     FROM colecao_item ci
     JOIN item_acervo ia ON ia.id_item = ci.id_item
     JOIN categoria c ON c.id_categoria = ia.id_categoria
     WHERE ci.id_colecao = ?`,
    [idColecao],
  );
  return linhas;
}
async function adicionarItem(idColecao, idItem) {
  await pool.execute(
    "INSERT IGNORE INTO colecao_item (id_colecao, id_item) VALUES (?, ?)",
    [idColecao, idItem],
  );
  return listarItens(idColecao);
}
async function removerItem(idColecao, idItem) {
  const [resultado] = await pool.execute(
    "DELETE FROM colecao_item WHERE id_colecao = ? AND id_item = ?",
    [idColecao, idItem],
  );
  return resultado.affectedRows > 0;
}
module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  listarItens,
  adicionarItem,
  removerItem,
};
