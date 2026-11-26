const { pool } = require("../config/database");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

function montarUsuario(linha) {
  if (!linha) return null;
  return {
    id_usuario: linha.id_usuario,
    nome: linha.nome,
    cpf: linha.cpf,
    email: linha.email,
    telefone: linha.telefone,
    data_cadastro: linha.data_cadastro,
  };
}

async function listar() {
  const [linhas] = await pool.query(
    "SELECT id_usuario, nome, cpf, email, telefone, data_cadastro FROM usuario",
  );
  return linhas.map(montarUsuario);
}

async function buscarPorId(id) {
  const [linhas] = await pool.execute(
    "SELECT id_usuario, nome, cpf, email, telefone, data_cadastro FROM usuario WHERE id_usuario = ?",
    [id],
  );
  return linhas.length ? montarUsuario(linhas[0]) : null;
}

async function buscarPorEmail(email) {
  const [linhas] = await pool.execute("SELECT * FROM usuario WHERE email = ?", [
    email,
  ]);
  return linhas.length ? linhas[0] : null;
}

async function buscarPorEmailOuCpf(identificador) {
  if (!identificador) return null;
  const limpo = String(identificador).trim();
  const apenasDigitos = limpo.replace(/\D/g, "");

  if (apenasDigitos.length === 11) {
    const [porCpf] = await pool.execute(
      "SELECT * FROM usuario WHERE cpf = ? OR email = ?",
      [apenasDigitos, limpo.toLowerCase()],
    );
    if (porCpf.length) return porCpf[0];
  }

  const [porEmail] = await pool.execute(
    "SELECT * FROM usuario WHERE email = ?",
    [limpo.toLowerCase()],
  );
  return porEmail.length ? porEmail[0] : null;
}

async function criar(dados) {
  const senhaHash = dados.senha
    ? await bcrypt.hash(dados.senha, 10)
    : (dados.senha_hash ?? null);
  const idUsuario = crypto.randomUUID();
  const [resultado] = await pool.execute(
    "INSERT INTO usuario (id_usuario, nome, cpf, email, senha_hash, telefone) VALUES (?, ?, ?, ?, ?, ?)",
    [
      idUsuario,
      dados.nome,
      dados.cpf ?? null,
      dados.email,
      senhaHash,
      dados.telefone ?? null,
    ],
  );
  return resultado.affectedRows ? buscarPorId(idUsuario) : null;
}

async function atualizar(id, dados) {
  const campos = [];
  const valores = [];
  for (const [coluna, valor] of [
    ["nome", dados.nome],
    ["cpf", dados.cpf ?? null],
    ["email", dados.email],
    ["telefone", dados.telefone ?? null],
  ]) {
    if (valor !== undefined) {
      campos.push(`${coluna} = ?`);
      valores.push(valor);
    }
  }
  if (dados.senha) {
    campos.push("senha_hash = ?");
    valores.push(await bcrypt.hash(dados.senha, 10));
  }
  if (!campos.length) return buscarPorId(id);
  valores.push(id);
  const [resultado] = await pool.execute(
    `UPDATE usuario SET ${campos.join(", ")} WHERE id_usuario = ?`,
    valores,
  );
  return resultado.affectedRows ? buscarPorId(id) : null;
}

async function remover(id) {
  const [resultado] = await pool.execute(
    "DELETE FROM usuario WHERE id_usuario = ?",
    [id],
  );
  return resultado.affectedRows > 0;
}

async function verificarSenha(senha, usuario) {
  if (!usuario?.senha_hash) return false;
  return bcrypt.compare(senha, usuario.senha_hash);
}

module.exports = {
  listar,
  buscarPorId,
  buscarPorEmail,
  buscarPorEmailOuCpf,
  criar,
  atualizar,
  remover,
  verificarSenha,
};
