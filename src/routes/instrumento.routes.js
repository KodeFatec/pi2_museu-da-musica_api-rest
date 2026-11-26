const express = require("express");
const controller = require("../controllers/instrumento.controller");
const { validarInstrumento } = require("../validators/instrumento.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarInstrumento,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  validarInstrumento,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);

module.exports = router;
