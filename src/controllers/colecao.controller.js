const repository = require("../repositories/colecao.repository");
async function listar(req, res, next) {
  try {
    const dados = await repository.listar();
    return res.json({ total: dados.length, dados });
  } catch (e) {
    return next(e);
  }
}
async function buscarPorId(req, res, next) {
  try {
    const dado = await repository.buscarPorId(req.params.id);
    return dado
      ? res.json(dado)
      : res.status(404)
        .json({ erro: "Coleção não encontrada" });
  } catch (e) {
    return next(e);
  }
}
async function criar(req, res, next) {
  try {
    return res
      .status(201)
      .json({
        mensagem: "Coleção cadastrada com sucesso",
        dados: await repository.criar(req.body),
      });
  } catch (e) {
    return next(e);
  }
}
async function atualizar(req, res, next) {
  try {
    const dado = await repository.atualizar(req.params.id, req.body);
    return dado
      ? res.json({ mensagem: "Coleção atualizada com sucesso", dados: dado })
      : res.status(404)
        .json({ erro: "Coleção não encontrada" });
  } catch (e) {
    return next(e);
  }
}
async function remover(req, res, next) {
  try {
    return (await repository.remover(req.params.id))
      ? res.status(204)
        .send()
      : res.status(404)
        .json({ erro: "Coleção não encontrada" });
  } catch (e) {
    return next(e);
  }
}
async function listarItens(req, res, next) {
  try {
    const dados = await repository.listarItens(req.params.id);
    return res.json({ total: dados.length, dados });
  } catch (e) {
    return next(e);
  }
}
async function listarMusicas(req, res, next) {
  try {
    const dados = await repository.listarMusicas(req.params.id);
    return res.json({ total: dados.length, dados });
  } catch (e) {
    return next(e);
  }
}
async function adicionarItem(req, res, next) {
  try {
    const dados = await repository.adicionarItem(
      req.params.id,
      req.body.id_item,
    );
    return res
      .status(201)
      .json({ mensagem: "Item associado à coleção", dados });
  } catch (e) {
    return next(e);
  }
}
async function removerItem(req, res, next) {
  try {
    return (await repository.removerItem(req.params.id, req.params.idItem))
      ? res.status(204)
        .send()
      : res.status(404)
        .json({ erro: "Associação não encontrada" });
  } catch (e) {
    return next(e);
  }
}
module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  listarItens,
  listarMusicas,
  adicionarItem,
  removerItem,
};
