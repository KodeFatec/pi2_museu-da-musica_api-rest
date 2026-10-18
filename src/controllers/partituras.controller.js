const partiturasRepository = require("../repositories/partituras.repository");
async function listar(req, res, next) {
  try {
    const partituras = await partiturasRepository.listar();
    return res.json({
      total: partituras.length,
      dados: partituras,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const partitura = await partiturasRepository.buscarPorId(id);
    if (!partitura) {
      return res.status(404).json({
        erro: "Partitura não encontrada",
      });
    }
    return res.json(partitura);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const partitura = await partiturasRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Partitura cadastrada com sucesso",
      dados: partitura,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    const partituraRemovida = await partiturasRepository.remover(id);
    if (!partituraRemovida) {
      return res.status(404).json({
        erro: "Partitura não encontrada",
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
    const partitura = await partiturasRepository.atualizar(id, req.body);
    if (!partitura) {
      return res.status(404).json({
        erro: "Partitura não encontrada para a alteração",
      });
    }
    return res.json({
      mensagem: "Partitura atualizada com sucesso",
      dados: partitura,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, remover, atualizar };
