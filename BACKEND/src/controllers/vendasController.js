const vendasModel = require ('../models/vendasModel');

const getAll = async (req, res) => {

  const vendas = await vendasModel.getAll();
  return res.status(200).json(vendas);

};

const inserirVenda = async (req, res) => {
  try {
    await vendasModel.inserirVenda(req.body);

    return res.status(201).json({ mensagem: 'Venda inserido com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir venda:', error.message);

    return res.status(500).json({ erro: 'Erro ao inserir venda no banco de dados' });
  }
};

const atualizarVenda = async (req, res) => {
  try {
    await vendasModel.atualizarVenda(req.body);
    return res.status(201).json({ mensagem: 'Venda atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar venda:', error.message);

    return res.status(500).json({ erro: 'Erro ao atualizar venda no banco de dados'});
    
  }
};



module.exports = {
  getAll,
  inserirVenda,
  atualizarVenda
};