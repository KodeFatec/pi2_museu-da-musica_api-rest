const artistaRepository = require("../repositories/artista.repository");

async function listar(req, res, next) {
  try {
    const artistas = await artistaRepository.listar();
    return res.json({
      total: artistas.length,
      dados: artistas,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const artista = await artistaRepository.buscarPorId(id);
    if (!artista) {
      return res.status(404).json({
        erro: "Artista não encontrado",
      });
    }
    return res.json(artista);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const artista = await artistaRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Artista cadastrado com sucesso",
      dados: artista,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const artista = await artistaRepository.atualizar(id, req.body);
    if (!artista) {
      return res.status(404).json({
        erro: "Artista não encontrado para a alteração",
      });
    }
    return res.json({
      mensagem: "Artista atualizado com sucesso",
      dados: artista,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    const artistaRemovido = await artistaRepository.remover(id);
    if (!artistaRemovido) {
      return res.status(404).json({
        erro: "Artista não encontrado",
      });
    }
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };