const clientesRepository = require("../repositories/exemplo.repository");
async function listar(req, res, next) {
  try {
    const clientes = await clientesRepository.listar();
    return res.json({
      total: clientes.length,
      dados: clientes,
    });
  } catch (erro) {
    return next(erro);
  }
}

async function buscarPorId(req, res, next) {
  try {
    const id = Number(req.params.id); //pegamos o valor do id enviado
    const cliente = await clientesRepository.buscarPorId(id);
    if (!cliente) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      });
    }
    return res.json(cliente);
  } catch (erro) {
    return next(erro);
  }
}

async function criar(req, res, next) {
  try {
    const cliente = await clientesRepository.criar(req.body);
    return res.status(201).json({
      mensagem: "Cliente cadastrado com sucesso",
      dados: cliente,
    });
  } catch (erro) {
    return next(erro); //encaminha o erro para 'frente', para o próximo
  }
}
async function remover(req, res, next) {
  try {
    const id = Number(req.params.id);
    const clienteRemovido = await clientesRepository.remover(id);
    if (!clienteRemovido) {
      return res.status(404).json({
        erro: "Cliente não encontrado",
      });
    }
    return res.status(204).send(); //No Content
  } catch (erro) {
    return next(erro);
  }
}
async function atualizar(req, res, next) {
  try {
    const id = Number(req.params.id);
    const cliente = await clientesRepository.atualizar(id, req.body);
    if (!cliente) {
      return res.status(404).json({
        erro: "Cliente não encontrado para a alteração",
      });
    }
    return res.json({
      mensagem: "Cliente atualizado com sucesso",
      dados: cliente,
    });
  } catch (erro) {
    return next(erro);
  }
}

module.exports = { listar, buscarPorId, criar, remover, atualizar };
