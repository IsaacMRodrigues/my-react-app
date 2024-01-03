const produtosModel = require ('../models/produtosModel');

const getAll = async (req, res) => {

  const produtos = await produtosModel.getAll();
  return res.status(200).json(produtos);

};

const inserirProduto = async (req, res) => {
  try {
    await produtosModel.inserirProduto(req.body);

    return res.status(201).json({ mensagem: 'Produto inserido com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir produto:', error.message);

    return res.status(500).json({ erro: 'Erro ao inserir produto no banco de dados' });
  }
};

const atualizarProduto = async (req, res) => {
  try {
    await produtosModel.atualizarProduto(req.body);
    return res.status(201).json({ mensagem: 'Produto atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error.message);

    return res.status(500).json({ erro: 'Erro ao atualizar produto no banco de dados' });
    
  }
};

const deletarProduto = async (req, res) => {
  try {
    await produtosModel.deletarProduto(req.body);
    return res.status(201).json({ mensagem: 'Produto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar produto:', error.message);

    return res.status(500).json({ erro: 'Erro ao deletar produto no banco de dados' });
    
  }
};





module.exports = {
  getAll,
  inserirProduto,
  atualizarProduto,
  deletarProduto
};