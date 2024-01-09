



import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "../App.css";


const TableServicos = ({adicionarVenda}) => {

  const venda = (formatacao) => {
    const confirmarVenda = window.confirm('Você realmente deseja adicionar esse serviço em vendas ?');

    if (confirmarVenda) {
      adicionarVenda(formatacao)
    }
  };


    const formatacao = { 
        idProduto: 1,
        nomeProduto: "Formatação", 
        quantidadeProduto: 1,
        precoProduto: 100 };

        console.log(formatacao);

  return (
    <div>
      <h2 className="padrao">Serviços</h2>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nome do Serviço</TableCell>
            <TableCell align="center">Valor do Serviço</TableCell>
            <TableCell align="center">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            <TableRow
              key={formatacao.idProduto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {formatacao.idProduto}
              </TableCell>
              <TableCell align="center">{formatacao.nomeProduto}</TableCell>
              <TableCell align="center">R$ {formatacao.precoProduto}</TableCell>
              <TableCell align="center"><Button variant="outlined" startIcon={<AddShoppingCartIcon/>} onClick={() => venda(formatacao)}>Adicionar à Venda</Button></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    
  );
};

export default TableServicos;