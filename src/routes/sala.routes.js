const express = require("express");
const controller = require("../controllers/sala.controller");
const { validarSala } = require("../validators/sala.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarSala,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  validarSala,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);
module.exports = router;
