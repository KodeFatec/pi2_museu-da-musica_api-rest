const express = require("express");
const controller = require("../controllers/genero_musical.controller");
const { validarGenero } = require("../validators/genero_musical.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarGenero,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  validarGenero,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);

module.exports = router;
