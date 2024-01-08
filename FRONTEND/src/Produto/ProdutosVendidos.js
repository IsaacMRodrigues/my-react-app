import { TableBody } from "@mui/material";
import React, { useState } from "react";
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';

const Vendas = ({ vendas }) => {

  let dataVenda = new Date();
  let dataAtualFormatada = dataVenda.toISOString().split('T')[0];

  const [searchTerm, setSearchTerm] = useState(dataAtualFormatada);

  const filteredProdutos = vendas.filter((venda) => {
  const vendaDate = new Date(venda.dataVenda).toISOString().split('T')[0];
    return vendaDate === searchTerm;
  });


  const calcularValorTotal = (venda) => {
    return venda.quantidadeProduto * venda.precoProduto;
  };

   const vendasDoMes = vendas.filter((venda) => {
      const dataDaVenda = new Date(venda.dataVenda);
     return dataVenda.getMonth() === dataDaVenda.getMonth();

   })

  const calcularValorMensal = () => {
    let valorMensal = 0;
     vendasDoMes.map((venda) => {
      return valorMensal += venda.quantidadeProduto * venda.precoProduto;
    })
    return valorMensal;
  }

  const calcularValorTotalGeral = () => {
    return filteredProdutos.reduce(
      (total, venda) => total + calcularValorTotal(venda),
      0
    );
  };

  return (
    <div>
      
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Vendas:</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <input
        type="date"
        placeholder="Pesquisar por nome do produto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>
       <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nome do Produto</TableCell>
            <TableCell align="center">Quantidade do Produto</TableCell>
            <TableCell align="center">Data da Venda</TableCell>
            <TableCell align="center">Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProdutos.map((venda) => (
            <TableRow
              key={venda.idProduto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {venda.idProduto}
              </TableCell>
              <TableCell align="center">{venda.nomeProduto}</TableCell>
              <TableCell align="center">{venda.quantidadeProduto}</TableCell>
              <TableCell align="center">{new Date(venda.dataVenda).toLocaleDateString()}</TableCell>
              <TableCell align="center">R$ {calcularValorTotal(venda)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {filteredProdutos.length <= 0 && (
            <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Não há vendas nessa data</h3>
          )}
    </TableContainer>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    <Button style={{margin: '25px'}} variant="contained">Valor total do dia: R$ {calcularValorTotalGeral()}</Button>
    <Button style={{margin: '25px'}}variant="contained">Valor Mensal: R$ {calcularValorMensal()}</Button>
    </div>
    </div>
  );
};

export default Vendas;
