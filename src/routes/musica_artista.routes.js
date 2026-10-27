const express = require("express");
const musicaArtistaController = require("../controllers/musica_artista.controller");

const router = express.Router();

router.get("/", musicaArtistaController.listar);
router.post("/", musicaArtistaController.criar);
router.put(
  "/:id_musica/:id_artista",
  musicaArtistaController.atualizar,
);
router.delete(
  "/:id_musica/:id_artista",
  musicaArtistaController.remover,
);

module.exports = router;
