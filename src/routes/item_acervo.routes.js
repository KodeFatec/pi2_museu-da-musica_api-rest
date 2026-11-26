const express = require("express");
const controller = require("../controllers/item_acervo.controller");
const { validarItemAcervo } = require("../validators/item_acervo.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarItemAcervo,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  validarItemAcervo,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);

module.exports = router;
