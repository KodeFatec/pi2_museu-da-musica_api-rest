const express = require("express");
const controller = require("../controllers/categoria.controller");
const { validarCategoria } = require("../validators/categoria.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);

router.use(autenticarJwt);

router.post(
  "/",
  validarCategoria,
  validarResultado,
  controller.criar,
);
router.put(
  "/:id",
  validarCategoria,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);

module.exports = router;
