const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM teste');

  // Mapeie os resultados e retorne os objetos desejados
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
    const query = 'INSERT INTO teste (nomeProduto, quantidadeProduto, precoProduto) VALUES (?, ?, ?)';
    const values = [nomeProduto, quantidadeProduto, precoProduto];
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

const atualizarProduto = async (produtoData) => {
  try {
    const { idProduto, nomeProduto, quantidadeProduto, precoProduto } = produtoData;

    // Valide os dados antes de realizar a atualização (se necessário)
    if (!idProduto || !nomeProduto || quantidadeProduto === undefined || precoProduto === undefined) {
      throw new Error('Dados do produto incompletos ou inválidos.');
    }

    // Lógica para atualizar o produto no banco de dados
    const query = 'UPDATE teste SET nomeProduto = ?, quantidadeProduto = ?, precoProduto = ? WHERE idProduto = ?';
    const values = [nomeProduto, quantidadeProduto, precoProduto, idProduto];
    await connection.execute(query, values);

    // Recupere o produto atualizado, se necessário
    // const [produtoAtualizado] = await connection.execute('SELECT * FROM teste WHERE idProduto = ?', [idProduto]);

    console.log('Produto atualizado com sucesso:');
    // return produtoAtualizado;
  } catch (error) {
    console.error('Erro ao atualizar produto no banco de dados:', error);
    throw new Error('Erro ao atualizar produto no banco de dados');
  }

};

const deletarProduto = async (produtoData) => {
  try {
    // Lógica para deletar o produto no banco de dados
    const query = 'DELETE FROM teste WHERE idProduto = ?';
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
  deletarProduto
};
