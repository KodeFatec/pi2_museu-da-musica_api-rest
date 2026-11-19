const { pool } = require("../config/database");

async function listar() {
  const [linhas] = await pool.query(
    `SELECT ia.*, c.nome AS categoria
     FROM item_acervo ia
     JOIN categoria c ON c.id_categoria = ia.id_categoria`,
  );
  return linhas;
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(
    `SELECT ia.*, c.nome AS categoria
     FROM item_acervo ia
     JOIN categoria c ON c.id_categoria = ia.id_categoria
     WHERE ia.id_item = ?`,
    [id],
  );
  return linhas[0] ?? null;
}
async function criar(dados, usuario) {
  const [resultado] = await pool.execute(
    `INSERT INTO item_acervo
      (id_categoria, titulo, descricao, origem, data_aquisicao, estado_conservacao, id_usuario_cadastro)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      dados.id_categoria,
      dados.titulo,
      dados.descricao ?? null,
      dados.origem ?? null,
      dados.data_aquisicao ?? null,
      dados.estado_conservacao ?? null,
      usuario?.id_usuario ?? dados.id_usuario_cadastro ?? null,
    ],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const campos = [
    ["id_categoria", dados.id_categoria],
    ["titulo", dados.titulo],
    ["descricao", dados.descricao ?? null],
    ["origem", dados.origem ?? null],
    ["data_aquisicao", dados.data_aquisicao ?? null],
    ["estado_conservacao", dados.estado_conservacao ?? null],
  ];
  const presentes = campos.filter(([, valor]) => valor !== undefined);
  if (!presentes.length) return buscarPorId(id);
  const [resultado] = await pool.execute(
    `UPDATE item_acervo SET ${presentes.map(([campo]) => `${campo} = ?`).join(", ")} WHERE id_item = ?`,
    [...presentes.map(([, valor]) => valor), id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute("DELETE FROM item_acervo WHERE id_item = ?", [id]);
  return resultado.affectedRows > 0;
}
module.exports = { listar, buscarPorId, criar, atualizar, remover };
