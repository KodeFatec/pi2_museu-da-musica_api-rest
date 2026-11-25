const salaRepository = require("../repositories/sala.repository");

async function listar(req, res, next) {
  try {
    const salas = await salaRepository.listar();
    return res.json({ total: salas.length, dados: salas });
  } catch (erro) {
    return next(erro);
  }
}
async function buscarPorId(req, res, next) {
  try {
    const sala = await salaRepository.buscarPorId(req.params.id);
    if (!sala) return res.status(404)
      .json({ erro: "Sala não encontrada" });
    return res.json(sala);
  } catch (erro) {
    return next(erro);
  }
}
async function criar(req, res, next) {
  try {
    const sala = await salaRepository.criar(req.body);
    return res
      .status(201)
      .json({ mensagem: "Sala cadastrada com sucesso", dados: sala });
  } catch (erro) {
    return next(erro);
  }
}
async function atualizar(req, res, next) {
  try {
    const sala = await salaRepository.atualizar(req.params.id, req.body);
    if (!sala) return res.status(404)
      .json({ erro: "Sala não encontrada" });
    return res.json({ mensagem: "Sala atualizada com sucesso", dados: sala });
  } catch (erro) {
    return next(erro);
  }
}
async function remover(req, res, next) {
  try {
    const removida = await salaRepository.remover(req.params.id);
    if (!removida) return res.status(404)
      .json({ erro: "Sala não encontrada" });
    return res.status(204)
      .send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
