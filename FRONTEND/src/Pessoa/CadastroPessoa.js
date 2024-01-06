import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

const FormCadastroPessoa = ({ onSubmit }) => {
  const [nomePessoa, setNomePessoa] = useState("");
  const [telefonePessoa, setTelefonePessoa] = useState("");
  const [dataCompra, setDataCompra] = useState(new Date());
  const [valorCompra, setValorCompra] = useState(0);
  const [descricaoCompra, setDescricaoCompra] = useState("");
  const [pago, setPago] = useState(false);

  const salvar = (event) => {
    event.preventDefault();

    if (!nomePessoa || !telefonePessoa || !dataCompra || valorCompra <= 0 || !descricaoCompra) {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
      return;
    } else {
    const dataCompraObj = new Date(dataCompra);
      setDataCompra(dataCompraObj.toISOString().split('T')[0]);
      setPago(false);

      const novaPessoa = { nomePessoa, telefonePessoa, dataCompra, valorCompra, descricaoCompra, pago };

    if (onSubmit) {
      onSubmit(novaPessoa);
    }

    setNomePessoa("");
    setTelefonePessoa("");
    setDataCompra(new Date());
    setValorCompra("");
    setDescricaoCompra("");
    setPago(false);

    }
    
  };

  return (
    <form id="signForm" onSubmit={salvar}>
      <h2 id="titulo">Cadastro PESSOA</h2>
      <label htmlFor="nomepessoa">Nome da Pessoa</label>
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
      <label htmlFor="dataCompra">Data da Compra</label>
      <input
        id="dataCompra"
        type="date"
        label="Data da compra"
        value={dataCompra}
        onChange={(e) => setDataCompra(e.target.value)}
      />
     <label htmlFor="valorCompra">Valor da Compra</label>
      <input
        id="valorCompra"
        type="number"
        label="Valor da Compra"
        value={valorCompra}
        onChange={(e) => setValorCompra(e.target.value)}
      />
    <label htmlFor="descricaoCompra">Descrição da Compra</label>
      <input
        id="descricaoCompra"
        label="Descrição da Compra"
        value={descricaoCompra}
        onChange={(e) => setDescricaoCompra(e.target.value)}
      />

      <Button variant="primary" type="submit" className="botoera">
        Cadastrar
      </Button>
    </form>
  );
};

export default FormCadastroPessoa;
