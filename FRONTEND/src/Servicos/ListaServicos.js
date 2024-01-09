import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import "../App.css";


const TableServicos = ({servicos, adicionarVenda, servicoParaAtualizar, servicoParaRemover}) => {

  const venda = (formatacao) => {
    const confirmarVenda = window.confirm('Você realmente deseja adicionar esse serviço em vendas ?');

    if (confirmarVenda) {
      adicionarVenda(formatacao)
    }
  };

  const remover = (produto) => {
    const confirmarExclusao = window.confirm('Você realmente deseja excluir este Serviço?');

    if (confirmarExclusao) {
      servicoParaRemover(produto)
    }
  };


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
            <TableCell align="center">#</TableCell>
            <TableCell align="center">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {servicos.map((servico) => (
            <TableRow
              key={servico.idProduto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {servico.idProduto}
              </TableCell>
              <TableCell align="center">{servico.nomeProduto}</TableCell>
              <TableCell align="center">R$ {servico.precoProduto}</TableCell>
              <TableCell align="center"><Button variant="outlined" startIcon={<EditIcon/>} onClick={() => servicoParaAtualizar(servico)}>Editar</Button></TableCell>
              <TableCell align="center"><Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => remover(servico)}>Excluir</Button></TableCell>
              <TableCell align="center"><Button variant="outlined" startIcon={<AddShoppingCartIcon/>} onClick={() => venda(servico)}>Adicionar à Venda</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    
  );
};

export default TableServicos;