const express = require('express');
const produtosController = require('./controllers/produtosController');
const vendasController = require('./controllers/vendasController');
const pessoasController = require('./controllers/pessoasController');
const garantiasController = require('./controllers/garantiasController');
const servicosController = require('./controllers/servicosController');

const router = express.Router();


//LISTA PRODUTOS
router.get('/produtos', produtosController.getAll);
router.post('/produtos', produtosController.inserirProduto);
router.put('/atualizar', produtosController.atualizarProduto);
router.delete('/deletar', produtosController.deletarProduto);

//LISTA SERVIÇOS
router.get('/servicos', servicosController.getAll);
router.post('/servicos', servicosController.inserirServico);
router.put('/atualizars', servicosController.atualizarServico);
router.delete('/deletars', servicosController.deletarServico);

//LISTA VENDAS
router.get('/vendas', vendasController.getAll);
router.post('/vendas', vendasController.inserirVenda);
router.put('/attvendas', vendasController.atualizarVenda);

//COMPRAS FIADAS
router.get('/pessoas', pessoasController.getAll);
router.post('/pessoas', pessoasController.inserirPessoa);
router.put('/attpessoa', pessoasController.atualizarPessoa);

//GARANTIA
router.get('/garantias', garantiasController.getAll);
router.post('/garantias', garantiasController.inserirGarantia);
router.delete('/deletarg', garantiasController.deletarGarantia);

module.exports = router;