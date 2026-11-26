const categoriaRepository = require("../repositories/categoria.repository");

async function listar(req, res, next) {
  try {
    const categorias = await categoriaRepository.listar();
    return res.json({ total: categorias.length, dados: categorias });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const categoria = await categoriaRepository.buscarPorId(req.params.id);
    if (!categoria) {
      return res.status(404)
        .json({ erro: "Categoria não encontrada" });
    }
    return res.json(categoria);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const categoria = await categoriaRepository.criar(req.body);
    return res.status(201)
      .json({
        mensagem: "Categoria cadastrada com sucesso",
        dados: categoria,
      });
  } catch (erro) {
    return next(erro);
  }
}

async function atualizar(req, res, next) {
  try {
    const categoria = await categoriaRepository.atualizar(
      req.params.id,
      req.body,
    );
    if (!categoria) {
      return res.status(404)
        .json({ erro: "Categoria não encontrada" });
    }
    return res.json({
      mensagem: "Categoria atualizada com sucesso",
      dados: categoria,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function remover(req, res, next) {
  try {
    const removida = await categoriaRepository.remover(req.params.id);
    if (!removida) {
      return res.status(404)
        .json({ erro: "Categoria não encontrada" });
    }
    return res.status(204)
      .send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
