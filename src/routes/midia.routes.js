const express = require("express");
const controller = require("../controllers/midia.controller");
const { validarMidia } = require("../validators/midia.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");
const router = express.Router();
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post(
  "/",
  autenticarJwt,
  validarMidia,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarMidia,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", autenticarJwt, controller.remover);
module.exports = router;
