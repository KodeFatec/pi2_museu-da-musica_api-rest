const express = require("express");
const artistaController = require("../controllers/artista.controller");
const { validarArtista } = require("../validators/artista.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", artistaController.listar);
router.get("/:id", artistaController.buscarPorId);
router.post(
  "/",
  autenticarJwt,
  validarArtista,
  validarResultado,
  artistaController.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarArtista,
  validarResultado,
  artistaController.atualizar,
);
router.delete("/:id", autenticarJwt, artistaController.remover);

module.exports = router;
