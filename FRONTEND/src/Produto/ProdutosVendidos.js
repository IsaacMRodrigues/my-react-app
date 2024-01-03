import React from "react";

const Vendas = ({ vendas }) => {


    const calcularValorTotal = (venda) => {
        return venda.quantidadeProduto * venda.precoProduto;
      };

      const calcularValorTotalGeral = () => {
        return vendas.reduce((total, venda) => total + calcularValorTotal(venda), 0);
      };

  return (
    <div>
      <h2>Vendas:</h2>
      <ul>
        {vendas.map((venda, index) => (
          <li key={index}>
            Nome do Produto: {venda.nomeProduto} ----  
            Quantidade vendida: {venda.quantidadeProduto} ----  
            Valor Total: R$ {calcularValorTotal(venda)}
          </li>
        ))}
      </ul>
      Valor total Geral: R$ {calcularValorTotalGeral()}
    </div>
  );
};

export default Vendas;