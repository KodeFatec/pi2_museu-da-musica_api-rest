const instrumentoRepository = require("../repositories/instrumento.repository");

async function listar(req, res, next) {
  try {
    const instrumentos = await instrumentoRepository.listar();
    return res.json({ total: instrumentos.length, dados: instrumentos });
  } catch (erro) { return next(erro); }
}
async function buscarPorId(req, res, next) {
  try {
    const instrumento = await instrumentoRepository.buscarPorId(req.params.id);
    if (!instrumento) return res.status(404).json({ erro: "Instrumento não encontrado" });
    return res.json(instrumento);
  } catch (erro) { return next(erro); }
}
async function criar(req, res, next) {
  try {
    const instrumento = await instrumentoRepository.criar(req.body);
    return res.status(201).json({ mensagem: "Instrumento cadastrado com sucesso", dados: instrumento });
  } catch (erro) { return next(erro); }
}
async function atualizar(req, res, next) {
  try {
    const instrumento = await instrumentoRepository.atualizar(req.params.id, req.body);
    if (!instrumento) return res.status(404).json({ erro: "Instrumento não encontrado" });
    return res.json({ mensagem: "Instrumento atualizado com sucesso", dados: instrumento });
  } catch (erro) { return next(erro); }
}
async function remover(req, res, next) {
  try {
    const removido = await instrumentoRepository.remover(req.params.id);
    if (!removido) return res.status(404).json({ erro: "Instrumento não encontrado" });
    return res.status(204).send();
  } catch (erro) { return next(erro); }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
