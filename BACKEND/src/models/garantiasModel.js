const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM garantias');

  const produtos = rows.map((row) => ({
    idGarantia: row.idGarantia,
    nomePessoa: row.nomePessoa,
    telefonePessoa: row.telefonePessoa,
    produtoPessoa: row.produtoPessoa,
    dataGarantia: row.dataGarantia
  }));

  return produtos;
};

const inserirGarantia = async (garantiaData) => {
  try {
    const { nomePessoa, telefonePessoa, produtoPessoa, dataGarantia } = garantiaData;
    const query = 'INSERT INTO garantias (nomePessoa, telefonePessoa, produtoPessoa, dataGarantia) VALUES (?, ?, ?, ?)';
    const values = [nomePessoa, telefonePessoa, produtoPessoa, dataGarantia];
    const [result] = await connection.execute(query, values);

    // Recupere o ID do novo produto inserido, se necessário
    const novoProdutoId = result.insertId;

    // Recupere o novo produto inserido, se necessário
    const [novoProduto] = await connection.execute('SELECT * FROM teste WHERE idProduto = ?', [novoProdutoId]);

    return novoProduto;
  } catch (error) {
    console.error('Erro ao inserir produto no banco de dados:', error);
    throw new Error('Erro ao inserir produto no banco de dados');
  }
};

const deletarGarantia = async (garantiaData) => {
  try {
    // Lógica para deletar o produto no banco de dados
    const query = 'DELETE FROM garantias WHERE idGarantia = ?';
    const values = [garantiaData.idGarantia];
    await connection.execute(query, values);

    console.log('Garantia removida com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar produto no banco de dados:', error);
    throw new Error('Erro ao deletar produto no banco de dados');
  }
};




module.exports = {
  getAll,
  inserirGarantia,
  deletarGarantia
};
