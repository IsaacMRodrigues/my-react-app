const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM vendas');

  // Mapeie os resultados e retorne os objetos desejados
  const vendas = rows.map((row) => ({
    idProduto: row.idProduto,
    nomeProduto: row.nomeProduto,
    quantidadeProduto: row.quantidadeProduto,
    precoProduto: row.precoProduto,
    dataVenda: row.dataVenda
  }));

  return vendas ;
};

const inserirVenda = async (vendaData) => {
  console.log('Chegou aqui' + vendaData);
  try {
    const {idProduto, nomeProduto, quantidadeProduto, precoProduto, dataVenda } = vendaData;
    const query = 'INSERT INTO vendas (idProduto, nomeProduto, quantidadeProduto, precoProduto, dataVenda) VALUES (?, ?, ?, ?, ?)';
    const values = [idProduto, nomeProduto, quantidadeProduto, precoProduto, dataVenda];
    await connection.execute(query, values);


  } catch (error) {
    console.error('Erro ao inserir venda no banco de dados:', error);
    throw new Error('Erro ao inserir venda no banco de dados');
  }
};

const atualizarVenda = async (vendaData) => {
  try {
    const { idProduto, nomeProduto, quantidadeProduto, precoProduto, dataVenda } = vendaData;

    // Lógica para atualizar o produto no banco de dados
    const query = 'UPDATE vendas SET nomeProduto = ?, quantidadeProduto = ?, precoProduto = ?, dataVenda = ? WHERE idProduto = ?';
    const values = [nomeProduto, quantidadeProduto, precoProduto, dataVenda, idProduto];
    await connection.execute(query, values);

    // Recupere o produto atualizado, se necessário
    // const [produtoAtualizado] = await connection.execute('SELECT * FROM teste WHERE idProduto = ?', [idProduto]);

    console.log('Venda atualizado com sucesso:');
    // return produtoAtualizado;
  } catch (error) {
    console.error('Erro ao atualizar Venda no banco de dados:', error);
    throw new Error('Erro ao atualizar Venda no banco de dados');
  }

};

module.exports = {
  getAll,
  inserirVenda,
  atualizarVenda
};
