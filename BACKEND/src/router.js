const express = require('express');
const produtosController = require('./controllers/produtosController');
const vendasController = require('./controllers/vendasController');

const router = express.Router();


//LISTA PRODUTOS
router.get('/produtos', produtosController.getAll);
router.post('/produtos', produtosController.inserirProduto);
router.put('/atualizar', produtosController.atualizarProduto);
router.delete('/deletar', produtosController.deletarProduto);

//LISTA VENDAS
router.get('/vendas', vendasController.getAll);
router.post('/vendas', vendasController.inserirVenda);
router.put('/attvendas', vendasController.atualizarVenda);

module.exports = router;