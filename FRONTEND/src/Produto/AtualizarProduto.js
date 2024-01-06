import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const FormAtualizarProduto = ({ atualizar, produto }) => {

  const [idProduto ] = useState(produto.idProduto)
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
    <div className="m-5">
    <form id="signForm" onSubmit={salvar}>
    <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Editar Produto</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Nome do Produto" variant="outlined" value={nomeProduto} onChange={(e) => setNomeProduto(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Quantidade do Produto" variant="outlined" value={quantidadeProduto} onChange={(e) => setQuantidadeProduto(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Preço do Produto" variant="outlined" value={precoProduto} onChange={(e) => setPrecoProduto(e.target.value)}  />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
      <Button type="submit" variant="contained">
        Atualizar
      </Button>
      </div>
    </form>
    </div>
  );
};

export default FormAtualizarProduto;
