const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM servicos');

  const servicos = rows.map((row) => ({
    idProduto: row.idProduto,
    nomeProduto: row.nomeProduto,
    quantidadeProduto: row.quantidadeProduto,
    precoProduto: row.precoProduto,
  }));

  return servicos;
};

const inserirServico = async (servicoData) => {
  try {
    const { nomeProduto, quantidadeProduto, precoProduto } = servicoData;
    const query =
      'INSERT INTO servicos (nomeProduto, quantidadeProduto, precoProduto) VALUES (?, ?, ?)';
    const values = [nomeProduto, quantidadeProduto, precoProduto];
    await connection.execute(query, values);
  } catch (error) {
    console.error('Erro ao inserir serviço no banco de dados:', error);
    throw new Error('Erro ao inserir serviço no banco de dados');
  }
};

const atualizarServico = async (servicoData) => {
  try {
    const { idProduto, nomeProduto, quantidadeProduto, precoProduto } =
    servicoData;

    if (
      !idProduto ||
      !nomeProduto ||
      quantidadeProduto === undefined ||
      precoProduto === undefined
    ) {
      throw new Error('Dados do serviço incompletos ou inválidos.');
    }

    const query =
      'UPDATE servicos SET nomeProduto = ?, quantidadeProduto = ?, precoProduto = ? WHERE idProduto = ?';
    const values = [nomeProduto, quantidadeProduto, precoProduto, idProduto];
    await connection.execute(query, values);

    console.log('Serviço atualizado com sucesso:');
  } catch (error) {
    console.error('Erro ao atualizar serviço no banco de dados:', error);
    throw new Error('Erro ao atualizar serviço no banco de dados');
  }
};

const deletarServico = async (servicoData) => {
  try {
    const query = 'DELETE FROM servicos WHERE idProduto = ?';
    const values = [servicoData.idProduto];
    await connection.execute(query, values);

    console.log('Serviço removido com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar serviço no banco de dados:', error);
    throw new Error('Erro ao deletar serviço no banco de dados');
  }
};

module.exports = {
  getAll,
  inserirServico,
  atualizarServico,
  deletarServico,
};
