const express = require('express');
const produtosController = require('./controllers/produtosController');

const router = express.Router();

router.get('/produtos', produtosController.getAll);
router.post('/produtos', produtosController.inserirProduto);
router.put('/atualizar', produtosController.atualizarProduto);
router.delete('/deletar', produtosController.deletarProduto);

module.exports = router;