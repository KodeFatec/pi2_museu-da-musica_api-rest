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
app.use("/api/musica-artista", require("./routes/musica_artista.routes"));
app.use("/api/partituras", require("./routes/partituras.routes"));
app.use("/api/musicas-favoritas", require("./routes/musica_favorita.routes"));
app.use("/api/letra_trecho", require("./routes/letra_trecho.routes"));
app.use("/api/historico_musica", require("./routes/historico_musica.routes"));
app.use("/api/generos-musicais", require("./routes/genero_musical.routes"));
app.use("/api/instrumentos", require("./routes/instrumento.routes"));
app.use("/api/itens-acervo", require("./routes/item_acervo.routes"));
app.use("/api/categorias", require("./routes/categoria.routes"));
app.use("/api/midias", require("./routes/midia.routes"));
app.use("/api/colecoes", require("./routes/colecao.routes"));
app.use("/api/itens-acervo", require("./routes/item_localizacao.routes"));
app.use("/api/usuarios", require("./routes/usuarios.routes"));
app.use("/api/museus", require("./routes/museu.routes"));
app.use("/api/salas", require("./routes/sala.routes"));

app.use("/generos-musicais", require("./routes/genero_musical.routes"));
app.use("/instrumentos", require("./routes/instrumento.routes"));
app.use("/itens-acervo", require("./routes/item_acervo.routes"));
app.use("/categorias", require("./routes/categoria.routes"));
app.use("/midias", require("./routes/midia.routes"));
app.use("/colecoes", require("./routes/colecao.routes"));
app.use("/itens-acervo", require("./routes/item_localizacao.routes"));
app.use("/usuarios", require("./routes/usuarios.routes"));
app.use("/museus", require("./routes/museu.routes"));
app.use("/salas", require("./routes/sala.routes"));

app.use((req, res) => {
  res.status(404).json({
    erro: "Rota não encontrada",
  });
});

app.use((erro, req, res, next) => {
  if (erro?.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ erro: "Já existe um registro com estes dados" });
  }
  if (erro?.code === "ER_NO_REFERENCED_ROW_2" || erro?.code === "ER_ROW_IS_REFERENCED_2") {
    return res.status(400).json({ erro: "Existem referências inválidas ou dependências que impedem esta operação" });
  }
  console.error(erro);
  return res.status(500).json({ erro: "Erro interno do servidor" });
});

module.exports = app;
