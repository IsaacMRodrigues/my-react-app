import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../App.css";

const FormAtualizarServico = ({ atualizar, servico }) => {

  const [idProduto ] = useState(servico.idProduto)
  const [nomeProduto, setNomeProduto] = useState(servico.nomeProduto);
  const [quantidadeProduto] = useState(servico.quantidadeProduto);
  const [precoProduto, setPrecoProduto] = useState(servico.precoProduto);

  const salvar = (event) => {
    event.preventDefault();

    if (!nomeProduto ||  precoProduto <= 0) {
      alert("Por favor, preencha todos os campos antes de cadastrar.");
      return;
    } else {

    const novoProduto = {idProduto, nomeProduto, quantidadeProduto, precoProduto };

    
      atualizar(novoProduto);

    setNomeProduto("");
    setPrecoProduto("");
    }
  };

  return (
    <div className="m-5">
    <form id="signForm" onSubmit={salvar}>
    <h2 className="padrao">Editar Serviço</h2>
      <div className="padrao">
      
      <TextField style={{margin: '15px'}} id="outlined-basic" label="Nome do Produto" variant="outlined" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}  />
      <TextField style={{margin: '15px'}} id="outlined-basic" label="Preço do Produto" variant="outlined" value={precoProduto} onChange={(e) => setPrecoProduto(e.target.value)}  />
      </div>
      <div className="padrao m-25" >
      <Button type="submit" variant="contained">
        Atualizar
      </Button>
      </div>
    </form>
    </div>
  );
};

export default FormAtualizarServico;
