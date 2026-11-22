const express = require("express");
const controller = require("../controllers/sala.controller");
const { validarSala } = require("../validators/sala.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");
const router = express.Router();
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.post(
  "/",
  autenticarJwt,
  validarSala,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarSala,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", autenticarJwt, controller.remover);
module.exports = router;
