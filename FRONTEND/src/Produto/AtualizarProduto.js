import React, { useState } from "react";

const FormAtualizarProduto = ({ atualizar, produto }) => {

  const [idProduto, setIdProduto] = useState(produto.idProduto)
  const [nomeProduto, setNomeProduto] = useState(produto.nomeProduto);
  const [quantidadeProduto, setQuantidadeProduto] = useState(produto.quantidadeProduto);
  const [precoProduto, setPrecoProduto] = useState(produto.precoProduto);

  const salvar = (event) => {
    event.preventDefault();

    if (!nomeProduto ||  precoProduto <= 0) {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
      return;
    } else {

    const novoProduto = {idProduto, nomeProduto, quantidadeProduto, precoProduto };

    
      atualizar(novoProduto);

    setNomeProduto("");
    setQuantidadeProduto("");
    setPrecoProduto("");
    }
  };

  return (
    <form id="signForm" onSubmit={salvar}>
      <h2 id="titulo">Atualizar</h2>
      <label htmlFor="nomeProduto">Nome do Produto</label>
      <input
        id="nomeProduto"
        label="Nome do Produto"
        variant="outlined"
        value={nomeProduto}
        onChange={(e) => setNomeProduto(e.target.value)}
      />
      <label htmlFor="quantidadeProduto">Quantidade</label>
      <input
        id="quantidadeProduto"
        type="number"
        label="Quantidade do Produto"
        variant="outlined"
        value={quantidadeProduto}
        onChange={(e) => setQuantidadeProduto(e.target.value)}
      />
      <label htmlFor="preco">Preço</label>
      <input
        id="preco"
        type="number"
        label="Preço do Produto"
        value={precoProduto}
        onChange={(e) => setPrecoProduto(e.target.value)}
      />

      <button type="submit" className="botoera">
        Atualizar
      </button>
    </form>
  );
};

export default FormAtualizarProduto;
