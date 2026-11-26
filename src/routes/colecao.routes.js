const express = require("express");
const controller = require("../controllers/colecao.controller");
const validarResultado = require("../middleware/validarResultado");
const {
  validarColecao,
  validarAssociacao,
} = require("../validators/colecao.validator");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.get("/:id/itens", controller.listarItens);
router.get("/:id/musicas", controller.listarMusicas);

router.use(autenticarJwt);

router.post(
  "/",
  validarColecao,
  validarResultado,
  controller.criar,
);
router.post(
  "/:id/itens",
  validarAssociacao,
  validarResultado,
  controller.adicionarItem,
);
router.put(
  "/:id",
  validarColecao,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);
router.delete("/:id/itens/:idItem", controller.removerItem);

module.exports = router;
