const historicoMusicaRepository = require("../repositories/historico_musica.repository");

async function listar(req, res, next) {
  try {
    const historico = await historicoMusicaRepository.listar();
    return res.json({
      total: historico.length,
      dados: historico,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id);
    const registro = await historicoMusicaRepository.buscarPorId(id);
    if (!registro) {
      return res.status(404).json({
        erro: "Registro de histórico não encontrado",
      });
    }
    return res.json(registro);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const registro = await historicoMusicaRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Repodução registrada no histórico com sucesso",
      dados: registro,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const registro = await historicoMusicaRepository.atualizar(id, req.body);
    if (!registro) {
      return res.status(404).json({
        erro: "Registro de histórico não encontrado para a alteração",
      });
    }
    return res.json({
      mensagem: "Registro de histórico atualizado com sucesso",
      dados: registro,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    const removido = await historicoMusicaRepository.remover(id);
    if (!removido) {
      return res.status(404).json({
        erro: "Registro de histórico não encontrado",
      });
    }
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
