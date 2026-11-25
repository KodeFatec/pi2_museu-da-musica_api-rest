const midiaRepository = require("../repositories/midia.repository");

async function listar(req, res, next) {
  try {
    const midias = await midiaRepository.listar();
    return res.json({ total: midias.length, dados: midias });
  } catch (erro) {
    return next(erro);
  }
}
async function buscarPorId(req, res, next) {
  try {
    const midia = await midiaRepository.buscarPorId(req.params.id);
    if (!midia) return res.status(404)
      .json({ erro: "Mídia não encontrada" });
    return res.json(midia);
  } catch (erro) {
    return next(erro);
  }
}
async function criar(req, res, next) {
  try {
    const midia = await midiaRepository.criar(req.body);
    return res
      .status(201)
      .json({ mensagem: "Mídia cadastrada com sucesso", dados: midia });
  } catch (erro) {
    return next(erro);
  }
}
async function atualizar(req, res, next) {
  try {
    const midia = await midiaRepository.atualizar(req.params.id, req.body);
    if (!midia) return res.status(404)
      .json({ erro: "Mídia não encontrada" });
    return res.json({ mensagem: "Mídia atualizada com sucesso", dados: midia });
  } catch (erro) {
    return next(erro);
  }
}
async function remover(req, res, next) {
  try {
    const removida = await midiaRepository.remover(req.params.id);
    if (!removida)
      return res.status(404)
        .json({ erro: "Mídia não encontrada" });
    return res.status(204)
      .send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
