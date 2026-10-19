require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/api", (req, res) => {
  res.json({
    mensagem: "API REST Museu",
    versao: "1.0.0",
  });
});

app.use("/api/artistas", require("./routes/artista.routes"));
app.use("/api/musicas", require("./routes/musicas.routes"));
app.use("/api/partituras", require("./routes/partituras.routes"));
app.use("/api/musicas-favoritas", require("./routes/musica_favorita.routes"));
app.use("/api/letra_trecho", require("./routes/letra_trecho.routes"));
app.use("/api/historico_musica", require("./routes/historico_musica.routes"));

app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
  });
});

module.exports = app;
