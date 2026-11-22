const express = require("express");
const musicasController = require("../controllers/musicas.controller");
const { validarMusica } = require("../validators/musicas.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", musicasController.listar);
router.get("/:id", musicasController.buscarPorId);
router.post(
  "/",
  autenticarJwt,
  validarMusica,
  validarResultado,
  musicasController.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarMusica,
  validarResultado,
  musicasController.atualizar,
);
router.delete("/:id", autenticarJwt, musicasController.remover);

module.exports = router;
