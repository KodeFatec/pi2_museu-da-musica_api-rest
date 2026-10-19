const express = require("express");
const historicoMusicaController = require("../controllers/historico_musica.controller");
const {
  validarHistoricoMusica,
} = require("../validators/historico_musica.validator");
const validarResultado = require("../middleware/validarResultado");

const router = express.Router();

router.get("/", historicoMusicaController.listar);
router.get("/:id", historicoMusicaController.buscarPorId);
router.post(
  "/",
  validarHistoricoMusica,
  validarResultado,
  historicoMusicaController.criar,
);
router.put(
  "/:id",
  validarHistoricoMusica,
  validarResultado,
  historicoMusicaController.atualizar,
);
router.delete("/:id", historicoMusicaController.remover);

module.exports = router;
