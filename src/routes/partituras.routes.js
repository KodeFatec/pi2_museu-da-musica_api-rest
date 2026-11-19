const express = require("express");
const partiturasController = require("../controllers/partituras.controller");
const { validarPartitura } = require("../validators/partituras.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", partiturasController.listar);
router.get("/:id", partiturasController.buscarPorId);
router.post("/", autenticarJwt, validarPartitura, validarResultado, partiturasController.criar);
router.put(
  "/:id",
  autenticarJwt,
  validarPartitura,
  validarResultado,
  partiturasController.atualizar,
);
router.delete("/:id", autenticarJwt, partiturasController.remover);

module.exports = router;
