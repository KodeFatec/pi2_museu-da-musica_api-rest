const letraTrechoRepository = require("../repositories/letra_trecho.repository");
async function listar(req, res, next) {
  try {
    const trechos = await letraTrechoRepository.listar();
    return res.json({
      total: trechos.length,
      dados: trechos,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const trecho = await letraTrechoRepository.buscarPorId(id);
    if (!trecho) {
      return res.status(404).json({
        erro: "Trecho de letra não encontrado",
      });
    }
    return res.json(trecho);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const trecho = await letraTrechoRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Trecho de letra cadastrado com sucesso",
      dados: trecho,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    const trechoRemovido = await letraTrechoRepository.remover(id);
    if (!trechoRemovido) {
      return res.status(404).json({
        erro: "Trecho de letra não encontrado",
      });
    }
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const trecho = await letraTrechoRepository.atualizar(id, req.body);
    if (!trecho) {
      return res.status(404).json({
        erro: "Trecho de letra não encontrado para a alteração",
      });
    }
    return res.json({
      mensagem: "Trecho de letra atualizado com sucesso",
      dados: trecho,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, remover, atualizar };
