const express = require("express");
const musicaFavoritaController = require("../controllers/musica_favorita.controller");
const validarResultado = require("../middleware/validarResultado");
const {
  validarMusicaFavorita,
} = require("../validators/musica_favorita.validator");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.use(autenticarJwt);

router.get("/", musicaFavoritaController.listar);
router.post(
  "/",
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
router.delete("/:id_musica", musicaFavoritaController.remover);

module.exports = router;
