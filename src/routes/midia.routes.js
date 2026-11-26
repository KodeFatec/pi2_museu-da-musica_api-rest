const express = require("express");
const controller = require("../controllers/midia.controller");
const { validarMidia } = require("../validators/midia.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarMidia,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  validarMidia,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);

module.exports = router;
