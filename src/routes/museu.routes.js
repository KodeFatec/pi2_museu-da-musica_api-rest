const express = require("express");
const controller = require("../controllers/museu.controller");
// const { validarMuseu } = require("../validators/museu.validator");
// const validarResultado = require("../middleware/validarResultado");
// const { autenticarJwt } = require("../middleware/autenticacaoJwt");

const router = express.Router();

router.get("/1", (req, res, next) => {
  req.params.id = 1;
  return controller.buscarPorId(req, res, next);
});
// router.get("/", (req, res, next) => {
//   if (req.baseUrl && req.baseUrl.endsWith("/museu")) {
//     req.params.id = 1;
//     return controller.buscarPorId(req, res, next);
//   }
//   return controller.listar(req, res, next);
// });
// router.get("/:id", controller.buscarPorId);
// router.post(
//   "/",
//   autenticarJwt,
//   validarMuseu,
//   validarResultado,
//   controller.criar,
// );
// router.put(
//   "/:id",
//   autenticarJwt,
//   validarMuseu,
//   validarResultado,
//   controller.atualizar,
// );
// router.delete("/:id", autenticarJwt, controller.remover);

module.exports = router;
