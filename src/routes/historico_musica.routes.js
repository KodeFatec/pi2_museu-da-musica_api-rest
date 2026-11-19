const express = require("express");
const historicoMusicaController = require("../controllers/historico_musica.controller");
const {
  validarHistoricoMusica,
} = require("../validators/historico_musica.validator");
const validarResultado = require("../middleware/validarResultado");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", autenticarJwt, historicoMusicaController.listar);
router.get("/:id", autenticarJwt, historicoMusicaController.buscarPorId);
router.post(
  "/",
  autenticarJwt,
  validarHistoricoMusica,
  validarResultado,
  historicoMusicaController.criar,
);
router.put(
  "/:id",
  autenticarJwt,
  validarHistoricoMusica,
  validarResultado,
  historicoMusicaController.atualizar,
);
router.delete("/:id", autenticarJwt, historicoMusicaController.remover);

module.exports = router;
