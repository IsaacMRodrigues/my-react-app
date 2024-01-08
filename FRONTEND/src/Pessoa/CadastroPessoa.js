import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Cadastro PESSOA</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Nome da Pessoa" variant="outlined" value={nomePessoa} onChange={(e) => setNomePessoa(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Telefone" variant="outlined" value={telefonePessoa} onChange={(e) => setTelefonePessoa(e.target.value)}  />
      <TextField type="date" style={{margin: '25px'}} id="outlined-basic" label="Data da Compra" variant="outlined" value={dataCompra} onChange={(e) => setDataCompra(e.target.value)}  />
      <TextField type="number" style={{margin: '25px'}} id="outlined-basic" label="Valor da Compra" variant="outlined" value={valorCompra} onChange={(e) => setValorCompra(e.target.value)}  />
      <TextField style={{margin: '25px'}} id="outlined-basic" label="Descrição" variant="outlined" value={descricaoCompra} onChange={(e) => setDescricaoCompra(e.target.value)}  />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Button variant="contained" type="submit">
        Cadastrar
      </Button>
      </div>
    </form>
  );
};

export default FormCadastroPessoa;
