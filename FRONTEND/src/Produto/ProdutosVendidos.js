import React, { useState } from "react";

const Vendas = ({ vendas }) => {

  let dataVenda = new Date();
  let dataAtualFormatada = dataVenda.toISOString().split('T')[0];

  const [searchTerm, setSearchTerm] = useState(dataAtualFormatada);

  const filteredProdutos = vendas.filter((venda) => {
  const vendaDate = new Date(venda.dataVenda).toISOString().split('T')[0];
    return vendaDate === searchTerm;
  });


  const calcularValorTotal = (venda) => {
    return venda.quantidadeProduto * venda.precoProduto;
  };

  const calcularValorTotalGeral = () => {
    return filteredProdutos.reduce(
      (total, venda) => total + calcularValorTotal(venda),
      0
    );
  };

  return (
    <div>
      <h2>Vendas:</h2>
      <input
        type="date"
        placeholder="Pesquisar por nome do produto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome do Produto</th>
            <th scope="col">Quantidade do Produto</th>
            <th scope="col">Data da venda</th>
            <th scope="col">Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos.map((venda, index) => (
            <tr key={venda.idProduto}>
              <td>{venda.idProduto}</td>
              <td>{venda.nomeProduto}</td>
              <td>{venda.quantidadeProduto}</td>
              <td>{new Date(venda.dataVenda).toLocaleDateString()}</td>
              <td>{calcularValorTotal(venda)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      Valor total Geral: R$ {calcularValorTotalGeral()}
    </div>
  );
};

export default Vendas;
