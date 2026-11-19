const { pool } = require("../config/database");
const consultaCategoria = "SELECT * FROM categoria";

async function listar() {
  const [linhas] = await pool.query(consultaCategoria);
  return linhas;
}

async function buscarPorId(id) {
  const [linhas] = await pool.execute(
    `${consultaCategoria} WHERE id_categoria = ?`,
    [id],
  );
  return linhas[0] ?? null;
}

async function criar(dadosCategoria) {
  const [resultado] = await pool.execute(
    "INSERT INTO categoria (nome, descricao) VALUES (?, ?)",
    [dadosCategoria.nome, dadosCategoria.descricao ?? null],
  );
  return buscarPorId(resultado.insertId);
}

async function atualizar(id, dadosCategoria) {
  const [resultado] = await pool.execute(
    "UPDATE categoria SET nome = ?, descricao = ? WHERE id_categoria = ?",
    [dadosCategoria.nome, dadosCategoria.descricao ?? null, id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM categoria WHERE id_categoria = ?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
