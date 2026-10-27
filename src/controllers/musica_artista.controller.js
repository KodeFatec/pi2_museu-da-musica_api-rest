const musicaArtistaRepository = require("../repositories/musica_artista.repository");

async function listar(req, res, next) {
  try {
    const valorIdMusica = req.query.id_musica;
    const idMusica = valorIdMusica === undefined
      ? undefined
      : Number(valorIdMusica);

    if (
      idMusica !== undefined
      && (!Number.isInteger(idMusica) || idMusica < 1)
    ) {
      return res.status(400).json({
        erro: "O id da música deve ser um número inteiro positivo",
      });
    }

    const relacoes = await musicaArtistaRepository.listar(idMusica);
    return res.json({
      total: relacoes.length,
      dados: relacoes,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const relacao = await musicaArtistaRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Relação entre música e artista cadastrada com sucesso",
      dados: relacao,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const idMusica = Number(req.params.id_musica);
    const idArtista = Number(req.params.id_artista);
    const relacao = await musicaArtistaRepository.atualizar(
      idMusica,
      idArtista,
      req.body,
    );
    if (!relacao) {
      return res.status(404).json({
        erro: "Relação entre música e artista não encontrada para a alteração",
      });
    }
    return res.json({
      mensagem: "Relação entre música e artista atualizada com sucesso",
      dados: relacao,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const idMusica = Number(req.params.id_musica);
    const idArtista = Number(req.params.id_artista);
    const removida = await musicaArtistaRepository.remover(idMusica, idArtista);
    if (!removida) {
      return res.status(404).json({
        erro: "Relação entre música e artista não encontrada",
      });
    }
    return res.status(204).send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, criar, atualizar, remover };
