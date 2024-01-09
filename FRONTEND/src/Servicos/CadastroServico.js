import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../App.css";


const FormCadastroServico = ({ onSubmit }) => {
  const [nomeProduto, setNomeProduto] = useState("");
  const [precoProduto, setPrecoProduto] = useState(0);

  const salvar = (event) => {
    event.preventDefault();

    if (!nomeProduto || precoProduto <= 0) {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
      return;
    } else {

      const novoProduto = { nomeProduto, quantidadeProduto: 1, precoProduto };

    if (onSubmit) {
      onSubmit(novoProduto);
    }

    setNomeProduto("");
    setPrecoProduto("");

    }

    
  };

  return (
    <div className="m-5">
    <form id="signForm" onSubmit={salvar}>
    <h2 className="padrao">Cadastrar Serviço</h2>
      <div className="padrao">
      
      <TextField style={{margin: '15px'}} id="outlined-basic" label="Nome do Serviço" variant="outlined" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}  />
      <TextField type="number" style={{margin: '15px'}} id="outlined-basic" label="Preço do Serviço" variant="outlined" value={precoProduto} onChange={(e) => setPrecoProduto(e.target.value)}  />
      </div>
      <div className="padrao m-25" >
      <Button type="submit" variant="contained">
        Cadastrar
      </Button>
      </div>
    </form>
    </div>  
  );
};

export default FormCadastroServico;
