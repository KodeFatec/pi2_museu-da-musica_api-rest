const express = require("express");
const controller = require("../controllers/item_acervo.controller");
const { validarItemAcervo } = require("../validators/item_acervo.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");
const router = express.Router();
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post(
  "/",
  autenticarJwt,
  validarItemAcervo,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarItemAcervo,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", autenticarJwt, controller.remover);
module.exports = router;
