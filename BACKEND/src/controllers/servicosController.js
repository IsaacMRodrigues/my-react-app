const servicosModel = require('../models/servicosModel');

const getAll = async (req, res) => {
  const servico = await servicosModel.getAll();
  return res.status(200).json(servico);
};

const inserirServico = async (req, res) => {
  try {
    await servicosModel.inserirServico(req.body);

    return res.status(201).json({ mensagem: 'Serviço inserido com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir serviço:', error.message);

    return res
      .status(500)
      .json({ erro: 'Erro ao inserir serviço no banco de dados' });
  }
};

const atualizarServico = async (req, res) => {
  try {
    await servicosModel.atualizarServico(req.body);
    return res.status(201).json({ mensagem: 'Serviço atualizado com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error.message);

    return res
      .status(500)
      .json({ erro: 'Erro ao atualizar serviço no banco de dados' });
  }
};

const deletarServico = async (req, res) => {
  try {
    await servicosModel.deletarServico(req.body);
    return res.status(201).json({ mensagem: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error.message);

    return res
      .status(500)
      .json({ erro: 'Erro ao deletar serviço no banco de dados' });
  }
};

module.exports = {
  getAll,
  inserirServico,
  atualizarServico,
  deletarServico,
};
