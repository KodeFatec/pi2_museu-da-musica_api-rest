const { pool } = require("../config/database");

async function listar() {
  const [linhas] = await pool.query("SELECT * FROM genero_musical");
  return linhas;
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(
    "SELECT * FROM genero_musical WHERE id_genero = ?",
    [id],
  );
  return linhas[0] ?? null;
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO genero_musical (nome, descricao) VALUES (?, ?)",
    [dados.nome, dados.descricao ?? null],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE genero_musical SET nome = ?, descricao = ? WHERE id_genero = ?",
    [dados.nome, dados.descricao ?? null, id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM genero_musical WHERE id_genero = ?",
    [id],
  );
  return resultado.affectedRows > 0;
}
module.exports = { listar, buscarPorId, criar, atualizar, remover };
