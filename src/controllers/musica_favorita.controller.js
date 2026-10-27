const musicaFavoritaRepository = require("../repositories/musica_favorita.repository");
async function listar(req, res, next) {
  try {
    const musicasFavoritas = await musicaFavoritaRepository.listar();
    return res.json({
      total: musicasFavoritas.length,
      dados: musicasFavoritas,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const idUsuario = Number(req.params.id_usuario);
    const musicasFavoritas = await musicaFavoritaRepository.buscarPorUsuario(idUsuario);
    if (musicasFavoritas.length === 0) {
      return res.status(404).json({
        erro: "Música favorita não encontrada para este usuário",
      });
    }
    return res.json({
      total: musicasFavoritas.length,
      dados: musicasFavoritas,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const musicaFavorita = await musicaFavoritaRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Música adicionada aos favoritos com sucesso",
      dados: musicaFavorita,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const idUsuario = Number(req.params.id_usuario);
    const idMusica = Number(req.params.id_musica);
    const removida = await musicaFavoritaRepository.remover(idUsuario, idMusica);
    if (!removida) {
      return res.status(404).json({
        erro: "Música favorita não encontrada para este usuário",
      });
    }
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

/*async function atualizar(req, res, next) {
  try {
    const idUsuario = Number(req.params.id_usuario);
    const musicaFavorita = await musicaFavoritaRepository.atualizar(
      idUsuario,
      req.body.id_musica,
    );
    if (!musicaFavorita) {
      return res.status(404).json({
        erro: "Música favorita não encontrada para este usuário",
      });
    }
    return res.json({
      mensagem: "Música favorita atualizada com sucesso",
      dados: musicaFavorita,
    });
  } catch (erro) {
    return next(erro);
  }
}
  */

module.exports = { listar, buscarPorId, criar, remover };
