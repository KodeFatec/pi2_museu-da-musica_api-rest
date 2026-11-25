const { pool } = require("../config/database");

async function listar() {
  const [linhas] = await pool.query(`
    SELECT c.*, 
           COUNT(DISTINCT p.id_musica) AS total_musicas,
           COUNT(DISTINCT ci.id_item) AS total_itens
    FROM colecao c
    LEFT JOIN colecao_item ci ON c.id_colecao = ci.id_colecao
    LEFT JOIN partitura p ON ci.id_item = p.id_item
    GROUP BY c.id_colecao
    ORDER BY c.id_colecao ASC
  `);
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
async function listarMusicas(idColecao) {
  const [linhas] = await pool.execute(`
    SELECT DISTINCT m.*, g.nome AS genero
    FROM musica m
    LEFT JOIN genero_musical g ON g.id_genero = m.id_genero
    WHERE m.id_musica IN (
      SELECT p.id_musica
      FROM colecao_item ci
      JOIN partitura p ON p.id_item = ci.id_item
      WHERE ci.id_colecao = ?
    )
    ORDER BY m.titulo ASC
  `, [idColecao]);
  return linhas;
}

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  listarItens,
  listarMusicas,
  adicionarItem,
  removerItem,
};
