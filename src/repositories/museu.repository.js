const { pool } = require("../config/database");
const consultaMuseu = "SELECT * FROM museu";

async function listar() {
  const [linhas] = await pool.query(consultaMuseu);
  return linhas;
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(`${consultaMuseu} WHERE id_museu = ?`, [id]);
  return linhas[0] ?? null;
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO museu (nome, descricao, endereco, telefone, email) VALUES (?, ?, ?, ?, ?)",
    [dados.nome, dados.descricao ?? null, dados.endereco ?? null, dados.telefone ?? null, dados.email ?? null],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE museu SET nome = ?, descricao = ?, endereco = ?, telefone = ?, email = ? WHERE id_museu = ?",
    [dados.nome, dados.descricao ?? null, dados.endereco ?? null, dados.telefone ?? null, dados.email ?? null, id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute("DELETE FROM museu WHERE id_museu = ?", [id]);
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
