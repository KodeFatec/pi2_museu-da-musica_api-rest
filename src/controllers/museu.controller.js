const museuRepository = require("../repositories/museu.repository");

async function listar(req, res, next) {
  try {
    const museus = await museuRepository.listar();
    return res.json({ total: museus.length, dados: museus });
  } catch (erro) { return next(erro); }
}
async function buscarPorId(req, res, next) {
  try {
    const museu = await museuRepository.buscarPorId(req.params.id);
    if (!museu) return res.status(404).json({ erro: "Museu não encontrado" });
    return res.json(museu);
  } catch (erro) { return next(erro); }
}
async function criar(req, res, next) {
  try {
    const museu = await museuRepository.criar(req.body);
    return res.status(201).json({ mensagem: "Museu cadastrado com sucesso", dados: museu });
  } catch (erro) { return next(erro); }
}
async function atualizar(req, res, next) {
  try {
    const museu = await museuRepository.atualizar(req.params.id, req.body);
    if (!museu) return res.status(404).json({ erro: "Museu não encontrado" });
    return res.json({ mensagem: "Museu atualizado com sucesso", dados: museu });
  } catch (erro) { return next(erro); }
}
async function remover(req, res, next) {
  try {
    const removido = await museuRepository.remover(req.params.id);
    if (!removido) return res.status(404).json({ erro: "Museu não encontrado" });
    return res.status(204).send();
  } catch (erro) { return next(erro); }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
