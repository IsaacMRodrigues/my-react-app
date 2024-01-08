const garantiasModel = require('../models/garantiasModel');

const getAll = async (req, res) => {
  const garantias = await garantiasModel.getAll();
  return res.status(200).json(garantias);
};

const inserirGarantia = async (req, res) => {
  try {
    await garantiasModel.inserirGarantia(req.body);

    return res.status(201).json({ mensagem: 'Garantia inserida com sucesso' });
  } catch (error) {
    console.error('Erro ao inserir Garantia:', error.message);

    return res
      .status(500)
      .json({ erro: 'Erro ao inserir Garantia no banco de dados' });
  }
};

const deletarGarantia = async (req, res) => {
  try {
    await garantiasModel.deletarGarantia(req.body);
    return res.status(201).json({ mensagem: 'Garantia deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar garantia:', error.message);

    return res
      .status(500)
      .json({ erro: 'Erro ao deletar garantia no banco de dados' });
  }
};

module.exports = {
  getAll,
  inserirGarantia,
  deletarGarantia,
};
