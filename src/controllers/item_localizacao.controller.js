const repository = require("../repositories/item_localizacao.repository");
async function listar(req, res, next) {
  try {
    const atual = req.query.atual === "true";
    const dados = await repository.listarPorItem(req.params.id, atual);
    return res.json({ total: dados.length, dados });
  } catch (erro) {
    return next(erro);
  }
}
async function registrar(req, res, next) {
  try {
    const dado = await repository.registrar(req.params.id, req.body);
    return res
      .status(201)
      .json({ mensagem: "Localização registrada com sucesso", dados: dado });
  } catch (erro) {
    return next(erro);
  }
}
async function encerrar(req, res, next) {
  try {
    return (await repository.encerrar(req.params.id))
      ? res.status(204)
        .send()
      : res.status(404)
        .json({ erro: "Nenhuma localização ativa encontrada" });
  } catch (erro) {
    return next(erro);
  }
}
module.exports = { listar, registrar, encerrar };
