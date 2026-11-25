const repository = require("../repositories/genero_musical.repository");

async function listar(req, res, next) {
  try {
    const dados = await repository.listar();
    return res.json({ total: dados.length, dados });
  } catch (erro) {
    return next(erro);
  }
}
async function buscarPorId(req, res, next) {
  try {
    const dado = await repository.buscarPorId(req.params.id);
    if (!dado)
      return res.status(404)
        .json({ erro: "Gênero musical não encontrado" });
    return res.json(dado);
  } catch (erro) {
    return next(erro);
  }
}
async function criar(req, res, next) {
  try {
    return res
      .status(201)
      .json({
        mensagem: "Gênero musical cadastrado com sucesso",
        dados: await repository.criar(req.body),
      });
  } catch (erro) {
    return next(erro);
  }
}
async function atualizar(req, res, next) {
  try {
    const dado = await repository.atualizar(req.params.id, req.body);
    if (!dado)
      return res.status(404)
        .json({ erro: "Gênero musical não encontrado" });
    return res.json({
      mensagem: "Gênero musical atualizado com sucesso",
      dados: dado,
    });
  } catch (erro) {
    return next(erro);
  }
}
async function remover(req, res, next) {
  try {
    if (!(await repository.remover(req.params.id)))
      return res.status(404)
        .json({ erro: "Gênero musical não encontrado" });
    return res.status(204)
      .send();
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
