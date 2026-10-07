const express = require('express')
const clientesController = require('../controllers/exemplo.controller')
const { validarCliente} = require('../validators/exemplo.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', clientesController.listar)
router.get('/:id', clientesController.buscarPorId)
router.post('/', validarCliente, validarResultado, clientesController.criar)
router.put('/:id', validarCliente, validarResultado, clientesController.atualizar)
router.delete('/:id', clientesController.remover)

module.exports = router