const express = require('express')
const artistaController = require('../controllers/artista.controller')
const { validarArtista } = require('../validators/artista.validator')
const validarResultado = require('../middleware/validarResultado')

const router = express.Router()

router.get('/', artistaController.listar)
router.get('/:id', artistaController.buscarPorId)
router.post('/', validarArtista, validarResultado, artistaController.criar)
router.put('/:id', validarArtista, validarResultado, artistaController.atualizar)
router.delete('/:id', artistaController.remover)

module.exports = router