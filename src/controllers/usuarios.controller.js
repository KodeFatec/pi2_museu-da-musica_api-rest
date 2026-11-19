const jwt = require("jsonwebtoken");
const repository = require("../repositories/usuarios.repository");

async function listar(req, res, next) {
  try { const dados = await repository.listar(); return res.json({ total: dados.length, dados }); }
  catch (erro) { return next(erro); }
}
async function buscarPorId(req, res, next) {
  try { const dado = await repository.buscarPorId(req.params.id); if (!dado) return res.status(404).json({ erro: "Usuário não encontrado" }); return res.json(dado); }
  catch (erro) { return next(erro); }
}
async function criar(req, res, next) {
  try { return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso", dados: await repository.criar(req.body) }); }
  catch (erro) { return next(erro); }
}
async function atualizar(req, res, next) {
  try { const dado = await repository.atualizar(req.params.id, req.body); if (!dado) return res.status(404).json({ erro: "Usuário não encontrado" }); return res.json({ mensagem: "Usuário atualizado com sucesso", dados: dado }); }
  catch (erro) { return next(erro); }
}
async function remover(req, res, next) {
  try { if (!await repository.remover(req.params.id)) return res.status(404).json({ erro: "Usuário não encontrado" }); return res.status(204).send(); }
  catch (erro) { return next(erro); }
}
async function login(req, res, next) {
  try {
    const usuario = await repository.buscarPorEmail(req.body.email);
    if (!usuario || !await repository.verificarSenha(req.body.senha, usuario)) {
      return res.status(401).json({ erro: "E-mail ou senha inválidos" });
    }
    const token = jwt.sign({ email: usuario.email }, process.env.JWT_SECRET, {
      subject: String(usuario.id_usuario),
      expiresIn: process.env.JWT_EXPIRES_IN || "8h",
      algorithm: "HS256",
    });
    return res.json({
      token,
      usuario: await repository.buscarPorId(usuario.id_usuario),
    });
  } catch (erro) { return next(erro); }
}
async function perfil(req, res) {
  return res.json(req.usuario);
}

module.exports = { listar, buscarPorId, criar, atualizar, remover, login, perfil };
