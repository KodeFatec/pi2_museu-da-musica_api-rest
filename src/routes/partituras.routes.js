const express = require("express");
const partiturasController = require("../controllers/partituras.controller");
const { validarPartitura } = require("../validators/partituras.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", partiturasController.listar);
router.get("/:id", partiturasController.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarPartitura,
  validarResultado,
  partiturasController.criar,
);
router.put(
  "/:id",
  validarPartitura,
  validarResultado,
  partiturasController.atualizar,
);
router.delete("/:id", partiturasController.remover);

module.exports = router;
