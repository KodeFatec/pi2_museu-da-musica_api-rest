const { pool } = require("../config/database");
const consultaSala = "SELECT * FROM sala";

async function listar() {
  const [linhas] = await pool.query(consultaSala);
  if (linhas.length) return linhas;
  return [
    { id_sala: 1, id_museu: 1, nome: "Sala Maestro Elias Lobo", descricao: "Acervo de partituras e manuscritos", capacidade: 30 },
    { id_sala: 2, id_museu: 1, nome: "Sala Tradição Caipira & Viola", descricao: "Instrumentos de corda e história da música regional", capacidade: 25 },
    { id_sala: 3, id_museu: 1, nome: "Auditório Som & Alma", descricao: "Espaço para audições, recitais e palestras", capacidade: 60 },
    { id_sala: 4, id_museu: 1, nome: "Espaço Bossa & Choro", descricao: "Gravações históricas e escuta orientada", capacidade: 20 },
  ];
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
