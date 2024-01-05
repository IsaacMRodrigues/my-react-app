const pessoasModel = require('../models/pessoasModel');

const getAll = async (req, res) => {
  const pessoas = await pessoasModel.getAll();
  return res.status(200).json(pessoas);
};

const inserirPessoa = async (req, res) => {
  try {
    await pessoasModel.inserirPessoa(req.body);

    return res.status(201).json({ mensagem: 'Pessoa inserida com sucesso'});
  } catch (error) {
    console.error('Erro ao inserir Pessoa:', error.message);

    return res
      .status(500)
      .json({ erro: 'Erro ao inserir Pessoa no banco de dados' });
  }
};

const atualizarPessoa = async (req, res) => {
  try {
    await pessoasModel.atualizarPessoa(req.body);
    return res.status(201).json({ mensagem: 'Pessoa atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar pessoa:', error.message);
  
    return res.status(500).json({ erro: 'Erro ao atualizar pessoa no banco de dados' });
      
  }
};

module.exports = {
  getAll,
  inserirPessoa,
  atualizarPessoa
};
