const { pool } = require("../config/database");
const consultaMuseu = "SELECT * FROM museu";

const DEFAULT_MUSEU = {
  id_museu: 1,
  nome: "Museu da Música de Itu",
  descricao: "Espaço dedicado à preservação e difusão do patrimônio musical histórico brasileiro, com acervo de partituras, instrumentos e gravações raras.",
  endereco: "Rua Floriano Peixoto, 480 - Centro, Itu - SP",
  telefone: "(11) 4022-1234",
  email: "contato@museudamusicaitu.com.br",
};

async function listar() {
  const [linhas] = await pool.query(consultaMuseu);
  if (linhas.length) return linhas;
  return [DEFAULT_MUSEU];
}
async function buscarPorId(id) {
  const [linhas] = await pool.execute(`${consultaMuseu} WHERE id_museu = ?`, [
    id,
  ]);
  if (linhas[0]) return linhas[0];
  if (Number(id) === 1) return DEFAULT_MUSEU;
  return null;
}
async function criar(dados) {
  const [resultado] = await pool.execute(
    "INSERT INTO museu (nome, descricao, endereco, telefone, email) VALUES (?, ?, ?, ?, ?)",
    [
      dados.nome,
      dados.descricao ?? null,
      dados.endereco ?? null,
      dados.telefone ?? null,
      dados.email ?? null,
    ],
  );
  return buscarPorId(resultado.insertId);
}
async function atualizar(id, dados) {
  const [resultado] = await pool.execute(
    "UPDATE museu SET nome = ?, descricao = ?, endereco = ?, telefone = ?, email = ? WHERE id_museu = ?",
    [
      dados.nome,
      dados.descricao ?? null,
      dados.endereco ?? null,
      dados.telefone ?? null,
      dados.email ?? null,
      id,
    ],
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}
async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM museu WHERE id_museu = ?",
    [id],
  );
  return resultado.affectedRows > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
