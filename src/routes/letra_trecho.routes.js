const express = require("express");
const letraTrechoController = require("../controllers/letra_trecho.controller");
const {
  validarLetraTrecho,
  validarIdTrecho,
} = require("../validators/letra_trecho.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", validarResultado, letraTrechoController.listar);
router.get(
  "/:id",
  validarIdTrecho,
  validarResultado,
  letraTrechoController.buscarPorId,
);
router.post(
  "/",
  autenticarJwt,
  validarLetraTrecho,
  validarResultado,
  letraTrechoController.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarIdTrecho,
  validarLetraTrecho,
  validarResultado,
  letraTrechoController.atualizar,
);
router.delete(
  "/:id",
  autenticarJwt,
  validarIdTrecho,
  validarResultado,
  letraTrechoController.remover,
);

module.exports = router;
