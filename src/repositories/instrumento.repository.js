const { pool } = require("../config/database");

async function listar() {
  const [linhas] = await pool.query(
    `SELECT i.*, ia.titulo, ia.estado_conservacao, ia.descricao AS item_descricao,
            m.id_midia, m.tipo_midia, m.arquivo_url, m.descricao AS midia_descricao
     FROM instrumento i
     JOIN item_acervo ia ON ia.id_item = i.id_item
     LEFT JOIN midia m ON m.id_item = ia.id_item`,
  );
  return agrupar(linhas);
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(
    `SELECT i.*, ia.titulo, ia.estado_conservacao, ia.descricao AS item_descricao,
            m.id_midia, m.tipo_midia, m.arquivo_url, m.descricao AS midia_descricao
     FROM instrumento i
     JOIN item_acervo ia ON ia.id_item = i.id_item
     LEFT JOIN midia m ON m.id_item = ia.id_item
     WHERE i.id_item = ?`,
    [id],
  );
  return agrupar(linhas)[0] ?? null;
}
function agrupar(linhas) {
  const mapa = new Map();
  for (const linha of linhas) {
    if (!mapa.has(linha.id_item)) {
      mapa.set(linha.id_item, {
        id_item: linha.id_item,
        tipo_instrumento: linha.tipo_instrumento,
        fabricante: linha.fabricante,
        ano_fabricacao: linha.ano_fabricacao,
        antigo_dono: linha.antigo_dono,
        titulo: linha.titulo,
        estado_conservacao: linha.estado_conservacao,
        descricao: linha.item_descricao,
        fotos: [],
      });
    }
    if (linha.id_midia) {
      mapa.get(linha.id_item).fotos.push({
        id_midia: linha.id_midia,
        tipo_midia: linha.tipo_midia,
        arquivo_url: linha.arquivo_url,
        descricao: linha.midia_descricao,
      });
    }
  }
  return [...mapa.values()];
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO instrumento (id_item, tipo_instrumento, fabricante, ano_fabricacao, antigo_dono) VALUES (?, ?, ?, ?, ?)",
    [dados.id_item, dados.tipo_instrumento ?? null, dados.fabricante ?? null, dados.ano_fabricacao ?? null, dados.antigo_dono ?? null],
  );
  return buscarPorId(dados.id_item);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE instrumento SET tipo_instrumento = ?, fabricante = ?, ano_fabricacao = ?, antigo_dono = ? WHERE id_item = ?",
    [dados.tipo_instrumento ?? null, dados.fabricante ?? null, dados.ano_fabricacao ?? null, dados.antigo_dono ?? null, id],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute("DELETE FROM instrumento WHERE id_item = ?", [id]);
  return resultado.affectedRows > 0;
}
module.exports = { listar, buscarPorId, criar, atualizar, remover };
