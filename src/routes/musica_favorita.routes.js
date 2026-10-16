const express = require("express");
const musicaFavoritaController = require("../controllers/musica_favorita.controller");
const validarResultado = require("../middleware/validarResultado");
const {
  validarIdUsuario,
  validarMusicaFavorita,
  validarAtualizacaoMusicaFavorita,
} = require("../validators/musica_favorita.validator");

const router = express.Router();

router.get("/", musicaFavoritaController.listar);
router.get(
  "/:id_usuario",
  validarIdUsuario,
  validarResultado,
  musicaFavoritaController.buscarPorId,
);
router.post(
  "/",
  validarMusicaFavorita,
  validarResultado,
  musicaFavoritaController.criar,
);
router.put(
  "/:id_usuario",
  validarIdUsuario,
  validarAtualizacaoMusicaFavorita,
  validarResultado,
  musicaFavoritaController.atualizar,
);
router.delete(
  "/:id_usuario",
  validarIdUsuario,
  validarResultado,
  musicaFavoritaController.remover,
);

module.exports = router;