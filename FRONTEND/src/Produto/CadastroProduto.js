import React, { useState } from "react";

const FormCadastroProduto = ({ onSubmit }) => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [quantidadeProduto, setQuantidadeProduto] = useState(0);
  const [precoProduto, setPrecoProduto] = useState(0);

  const salvar = (event) => {
    event.preventDefault();

    const novoProduto = { nomeProduto, quantidadeProduto, precoProduto };

    if (onSubmit) {
      onSubmit(novoProduto);
    }

    setNomeProduto("");
    setQuantidadeProduto("");
    setPrecoProduto("");
  };

  return (
    <form id="signForm" onSubmit={salvar}>
      <h2 id="titulo">Cadastro</h2>
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
        Cadastrar
      </button>
    </form>
  );
};

export default FormCadastroProduto;
