const connection = require('./connection');

const getAll = async () => {
  const [rows] = await connection.execute('SELECT * FROM pessoas');

  const produtos = rows.map((row) => ({
    idPessoa: row.idPessoa,
    nomePessoa: row.nomePessoa,
    telefonePessoa: row.telefonePessoa,
    dataCompra: row.dataCompra,
    valorCompra: row.valorCompra,
    descricaoCompra: row.descricaoCompra,
    pago: row.pago,
    dataPagamento: row.dataPagamento,
  }));
  return produtos;
};

const inserirPessoa = async (pessoaData) => {
  try {
    let {
      nomePessoa,
      telefonePessoa,
      dataCompra,
      valorCompra,
      descricaoCompra,
      pago,
    } = pessoaData;

    if (pago === false) {
      pago = 0;
    } else {
      pago = 1;
    }

    const query =
      'INSERT INTO pessoas (nomePessoa, telefonePessoa, dataCompra, valorCompra, descricaoCompra, pago) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [
      nomePessoa,
      telefonePessoa,
      dataCompra,
      valorCompra,
      descricaoCompra,
      pago,
    ];
    await connection.execute(query, values);
  } catch (error) {
    console.error('Erro ao inserir pessoa no banco de dados:', error);
    throw new Error('Erro ao inserir pessoa no banco de dados');
  }
};

const atualizarPessoa = async (vendaData) => {
  try {
    const { idPessoa, dataPagamento } = vendaData;

    const query =
      'UPDATE pessoas SET pago = ?, dataPagamento = ? WHERE idPessoa = ?';
    const values = [1, dataPagamento, idPessoa];
    await connection.execute(query, values);

    console.log('Pessoa atualizada com sucesso:');
  } catch (error) {
    console.error('Erro ao atualizar pessoa no banco de dados: ', error);
    throw new Error('Erro ao atualizar pessoa no banco de dados');
  }
};

module.exports = {
  getAll,
  inserirPessoa,
  atualizarPessoa,
};
