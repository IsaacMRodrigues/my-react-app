import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Cadastro</h2>
<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Nome da Pessoa" variant="outlined" value={nomePessoa} onChange={(e) => setNomePessoa(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Telefone" variant="outlined" value={telefonePessoa} onChange={(e) => setTelefonePessoa(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Produto" variant="outlined" value={produtoPessoa} onChange={(e) => setProdutoPessoa(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Garantia em meses" variant="outlined" value={mesesGarantia} onChange={(e) => setMesesGarantia(e.target.value)}  />
      </div>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button variant="contained" type="submit">
        Cadastrar
      </Button>
      </div>
    </form>
  );
};

export default FormCadastroGarantia;
