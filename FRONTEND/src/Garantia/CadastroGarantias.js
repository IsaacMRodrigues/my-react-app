import React, { useState } from "react";

const FormCadastroGarantia = ({ onSubmit }) => {
  const [nomePessoa, setNomePessoa] = useState("");
  const [telefonePessoa, setTelefonePessoa] = useState("");
  const [produtoPessoa, setProdutoPessoa] = useState("");
  const [mesesGarantia, setMesesGarantia] = useState(0);

  const salvar = (event) => {
    event.preventDefault();

    if (!nomePessoa || !telefonePessoa || !produtoPessoa || !mesesGarantia) {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
      return;
    } else {

      const dataAtual = new Date();
      dataAtual.setMonth(dataAtual.getMonth() + mesesGarantia);
      const dataCompraObj = new Date(dataAtual);
      const dataFormatada = new Date(dataCompraObj).toISOString().split('T')[0];


      const novaGarantia = {
        nomePessoa,
        telefonePessoa,
        produtoPessoa,
        dataGarantia: dataFormatada,
      };

      if (onSubmit) {
        onSubmit(novaGarantia);
      }

      setNomePessoa("");
      setTelefonePessoa("");
      setProdutoPessoa("");
      setMesesGarantia(new Date());
    }
  };

  return (
    <form id="signForm" onSubmit={salvar}>
      <h2 id="titulo">Cadastro</h2>
      <label htmlFor="nomeProduto">Nome da Pessoa</label>
      <input
        id="nomePessoa"
        label="Nome da Pessoa"
        variant="outlined"
        value={nomePessoa}
        onChange={(e) => setNomePessoa(e.target.value)}
      />
      <label htmlFor="telefonePessoa">Telefone</label>
      <input
        id="telefonePessoa"
        label="Telefone"
        variant="outlined"
        value={telefonePessoa}
        onChange={(e) => setTelefonePessoa(e.target.value)}
      />
      <label htmlFor="produtoPessoa">Produto</label>
      <input
        id="produtoPessoa"
        label="Produto"
        value={produtoPessoa}
        onChange={(e) => setProdutoPessoa(e.target.value)}
      />
      <label htmlFor="mesesGarantia">Garantia em meses</label>
      <input
        id="mesesGarantia"
        type="number"
        label="Meses de Garantia"
        value={mesesGarantia}
        onChange={(e) => setMesesGarantia(e.target.value)}
      />

      <button type="submit" className="botoera">
        Cadastrar
      </button>
    </form>
  );
};

export default FormCadastroGarantia;
