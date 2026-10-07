const app = require("./app");
const port = Number(process.env.PORT) || 3001;

async function iniciarServidor() {
  app.listen(port, () => {
    console.log(`🚀Servidor REST rodando em ${port}`);
  });
}
iniciarServidor();
