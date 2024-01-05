const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM pessoas');

  // Mapeie os resultados e retorne os objetos desejados
  const produtos = rows.map((row) => ({
    idPessoa: row.idPessoa,
    nomePessoa: row.nomePessoa,
    telefonePessoa: row.telefonePessoa,
    dataCompra: row.dataCompra,
    valorCompra: row.valorCompra,
    descricaoCompra: row.descricaoCompra,
    pago: row.pago,
  }));
  return produtos;
};

const inserirPessoa = async (pessoaData) => {
  try {
    let { nomePessoa, telefonePessoa, dataCompra, valorCompra, descricaoCompra, pago } = pessoaData;

    if (pago === false){
      pago = 0;
    } else {
      pago = 1;
    }

    const query =
      'INSERT INTO pessoas (nomePessoa, telefonePessoa, dataCompra, valorCompra, descricaoCompra, pago) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [nomePessoa, telefonePessoa, dataCompra, valorCompra, descricaoCompra, pago];
    const [result] = await connection.execute(query, values);

    // Recupere o ID do novo produto inserido, se necessário
    const novoProdutoId = result.insertId;

    // Recupere o novo produto inserido, se necessário
    const [novoProduto] = await connection.execute(
      'SELECT * FROM teste WHERE idProduto = ?',
      [novoProdutoId]
    );

    return novoProduto;
  } catch (error) {
    console.error('Erro ao inserir produto no banco de dados: aq', error);
    throw new Error('Erro ao inserir produto no banco de dados');
  }
};

const atualizarPessoa = async (vendaData) => {
  try {
    const { idPessoa } = vendaData;
    
    // Lógica para atualizar o produto no banco de dados
    const query = 'UPDATE pessoas SET pago = ? WHERE idPessoa = ?';
    const values = [1, idPessoa];
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
  inserirPessoa,
  atualizarPessoa
};
