const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM produtos');

  const produtos = rows.map((row) => ({
    idProduto: row.idProduto,
    nomeProduto: row.nomeProduto,
    quantidadeProduto: row.quantidadeProduto,
    precoProduto: row.precoProduto,
  }));

  return produtos;
};

const inserirProduto = async (produtoData) => {
  try {
    const { nomeProduto, quantidadeProduto, precoProduto } = produtoData;
    const query =
      'INSERT INTO produtos (nomeProduto, quantidadeProduto, precoProduto) VALUES (?, ?, ?)';
    const values = [nomeProduto, quantidadeProduto, precoProduto];
    await connection.execute(query, values);
  } catch (error) {
    console.error('Erro ao inserir produto no banco de dados:', error);
    throw new Error('Erro ao inserir produto no banco de dados');
  }
};

const atualizarProduto = async (produtoData) => {
  try {
    const { idProduto, nomeProduto, quantidadeProduto, precoProduto } =
      produtoData;

    if (
      !idProduto ||
      !nomeProduto ||
      quantidadeProduto === undefined ||
      precoProduto === undefined
    ) {
      throw new Error('Dados do produto incompletos ou inválidos.');
    }

    const query =
      'UPDATE produtos SET nomeProduto = ?, quantidadeProduto = ?, precoProduto = ? WHERE idProduto = ?';
    const values = [nomeProduto, quantidadeProduto, precoProduto, idProduto];
    await connection.execute(query, values);

    console.log('Produto atualizado com sucesso:');
  } catch (error) {
    console.error('Erro ao atualizar produto no banco de dados:', error);
    throw new Error('Erro ao atualizar produto no banco de dados');
  }
};

const deletarProduto = async (produtoData) => {
  try {
    const query = 'DELETE FROM produtos WHERE idProduto = ?';
    const values = [produtoData.idProduto];
    await connection.execute(query, values);

    console.log('Produto removido com sucesso.');
  } catch (error) {
    console.error('Erro ao deletar produto no banco de dados:', error);
    throw new Error('Erro ao deletar produto no banco de dados');
  }
};

module.exports = {
  getAll,
  inserirProduto,
  atualizarProduto,
  deletarProduto,
};
