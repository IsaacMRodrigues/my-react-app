import React, { useState } from "react";

const TableProdutos = ({ produtos, adicionarVenda, produtoParaAtualizar, produtoParaRemover}) => {


  const [searchTerm, setSearchTerm] = useState("");
  // Filtra os produtos com base no termo de pesquisa
  const filteredProdutos = produtos.filter((produto) =>
    produto.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5">

<input
        type="text"
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
            <th scope="col">Valor do Produto</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos.map((produto) => (
            <tr key={produto.idProduto}>
              <td>{produto.idProduto}</td>
              <td>{produto.nomeProduto}</td>
              <td>{produto.quantidadeProduto}</td>
              <td>R$ {produto.precoProduto}</td>
              <button onClick={() => produtoParaAtualizar(produto)}>Editar</button>
              <button onClick={() => produtoParaRemover(produto)}>Remover</button>
              <button onClick={() => adicionarVenda(produto)}>
                  Adicionar à Venda
                </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProdutos;