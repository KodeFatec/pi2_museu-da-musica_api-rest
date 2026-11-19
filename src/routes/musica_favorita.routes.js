const express = require("express");
const musicaFavoritaController = require("../controllers/musica_favorita.controller");
const validarResultado = require("../middleware/validarResultado");
const { validarMusicaFavorita } = require("../validators/musica_favorita.validator");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", autenticarJwt, musicaFavoritaController.listar);
router.post(
  "/",
  autenticarJwt,
  validarMusicaFavorita,
  validarResultado,
  musicaFavoritaController.criar,
);
/*router.put(
  "/:id_usuario",
  validarIdUsuario,
  validarAtualizacaoMusicaFavorita,
  validarResultado,
  musicaFavoritaController.atualizar,
);*/
router.delete(
  "/:id_musica",
  autenticarJwt,
  musicaFavoritaController.remover,
);

module.exports = router;