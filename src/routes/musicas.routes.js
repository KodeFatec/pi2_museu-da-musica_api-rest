const express = require("express");
const musicasController = require("../controllers/musicas.controller");
const { validarMusica } = require("../validators/musicas.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", musicasController.listar);
router.get("/:id", musicasController.buscarPorId);
router.post("/", validarMusica, validarResultado, musicasController.criar);
router.put(
  "/:id",
  validarMusica,
  validarResultado,
  musicasController.atualizar,
);
router.delete("/:id", musicasController.remover);

module.exports = router;
