const express = require("express");
const controller = require("../controllers/usuarios.controller");
const validarResultado = require("../middleware/validarResultado");
const {
  validarUsuario,
  validarCadastro,
  validarLogin,
} = require("../validators/usuarios.validator");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");
const router = express.Router();

router.post("/login", validarLogin, validarResultado, controller.login);
router.post("/cadastro", validarCadastro, validarResultado, controller.criar);
router.post("/register", validarCadastro, validarResultado, controller.criar);

router.use(autenticarJwt);

router.get("/me", controller.perfil);
router.get("/perfis", controller.listarPerfis);
router.get("/:id/perfis", controller.listarPerfis);
router.get("/", controller.listar);
router.get("/:id", controller.buscarPorId);
router.put(
  "/:id",
  validarUsuario,
  validarResultado,
  controller.atualizar,
);
router.delete("/:id", controller.remover);

module.exports = router;
