const express = require("express");
const controller = require("../controllers/usuarios.controller");
const validarResultado = require("../middleware/validarResultado");
const { validarUsuario, validarLogin } = require("../validators/usuarios.validator");
const { autenticarJwt } = require("../middleware/autenticacaoJwt");
const router = express.Router();

router.post("/login", validarLogin, validarResultado, controller.login);
router.post("/cadastro", validarUsuario, validarResultado, controller.criar);
router.get("/me", autenticarJwt, controller.perfil);
router.get("/", autenticarJwt, controller.listar);
router.get("/:id", autenticarJwt, controller.buscarPorId);
router.put("/:id", autenticarJwt, validarUsuario, validarResultado, controller.atualizar);
router.delete("/:id", autenticarJwt, controller.remover);

module.exports = router;
