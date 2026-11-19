const itemAcervoRepository = require("../repositories/item_acervo.repository");

async function listar(req, res, next) {
  try {
    const itens = await itemAcervoRepository.listar();
    return res.json({ total: itens.length, dados: itens });
  } catch (erro) { return next(erro); }
}
async function buscarPorId(req, res, next) {
  try {
    const item = await itemAcervoRepository.buscarPorId(req.params.id);
    if (!item) return res.status(404).json({ erro: "Item do acervo não encontrado" });
    return res.json(item);
  } catch (erro) { return next(erro); }
}
async function criar(req, res, next) {
  try {
    const item = await itemAcervoRepository.criar(req.body, req.usuario);
    return res.status(201).json({ mensagem: "Item do acervo cadastrado com sucesso", dados: item });
  } catch (erro) { return next(erro); }
}
async function atualizar(req, res, next) {
  try {
    const item = await itemAcervoRepository.atualizar(req.params.id, req.body);
    if (!item) return res.status(404).json({ erro: "Item do acervo não encontrado" });
    return res.json({ mensagem: "Item do acervo atualizado com sucesso", dados: item });
  } catch (erro) { return next(erro); }
}
async function remover(req, res, next) {
  try {
    const removido = await itemAcervoRepository.remover(req.params.id);
    if (!removido) return res.status(404).json({ erro: "Item do acervo não encontrado" });
    return res.status(204).send();
  } catch (erro) { return next(erro); }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
