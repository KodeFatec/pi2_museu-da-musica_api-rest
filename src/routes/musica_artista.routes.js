const express = require("express");
const musicaArtistaController = require("../controllers/musica_artista.controller");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/", musicaArtistaController.listar);
router.post("/", autenticarJwt, musicaArtistaController.criar);
router.put(
  "/:id_musica/:id_artista",
  autenticarJwt,
  musicaArtistaController.atualizar,
);
router.delete(
  "/:id_musica/:id_artista",
  autenticarJwt,
  musicaArtistaController.remover,
);

module.exports = router;
