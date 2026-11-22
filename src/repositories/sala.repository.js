const { pool } = require("../config/database");
const consultaSala = "SELECT * FROM sala";

async function listar() {
  const [linhas] = await pool.query(consultaSala);
  return linhas;
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(`${consultaSala} WHERE id_sala = ?`, [
    id,
  ]);
  return linhas[0] ?? null;
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO sala (id_museu, nome, descricao, capacidade) VALUES (?, ?, ?, ?)",
    [
      dados.id_museu,
      dados.nome,
      dados.descricao ?? null,
      dados.capacidade ?? null,
    ],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE sala SET id_museu = ?, nome = ?, descricao = ?, capacidade = ? WHERE id_sala = ?",
    [
      dados.id_museu,
      dados.nome,
      dados.descricao ?? null,
      dados.capacidade ?? null,
      id,
    ],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute("DELETE FROM sala WHERE id_sala = ?", [
    id,
  ]);
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
