const musicasRepository = require("../repositories/musicas.repository");
async function listar(req, res, next) {
  try {
    const musicas = await musicasRepository.listar();
    return res.json({
      total: musicas.length,
      dados: musicas,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id_musica);
    const musica = await musicasRepository.buscarPorId(id);
    if (!musica) {
      return res.status(404).json({
        erro: "Música não encontrada",
      });
    }
    return res.json(musica);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const musica = await musicasRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Música cadastrada com sucesso",
      dados: musica,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id_musica);
    const musicaRemovida = await musicasRepository.remover(id);
    if (!musicaRemovida) {
      return res.status(404).json({
        erro: "Música não encontrada",
      });
    }
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id_musica);
    const musica = await musicasRepository.atualizar(id, req.body);
    if (!musica) {
      return res.status(404).json({
        erro: "Música não encontrada para a alteração",
      });
    }
    return res.json({
      mensagem: "Música atualizada com sucesso",
      dados: musica,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, remover, atualizar };
