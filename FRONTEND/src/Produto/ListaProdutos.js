import React, { useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import "../App.css";

const TableProdutos = ({ produtos, adicionarVenda, produtoParaAtualizar, produtoParaRemover}) => {

  const remover = (produto) => {
    const confirmarExclusao = window.confirm('Você realmente deseja excluir este produto?');

    if (confirmarExclusao) {
      produtoParaRemover(produto)
    }
  };
  const venda = (produto) => {
    const confirmarVenda = window.confirm('Você realmente deseja adicionar esse produto em vendas ?');

    if (confirmarVenda) {
      adicionarVenda(produto)
    }
  };


  const [searchTerm, setSearchTerm] = useState("");
  // Filtra os produtos com base no termo de pesquisa
  const filteredProdutos = produtos.filter((produto) =>
    produto.nomeProduto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="m-5">
      <Box
      sx={{
        width: 1000,
        maxWidth: '100%',
        margin: 'auto',
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '50px',
        marginTop: '20px'

      }}
    >
      <TextField fullWidth label="Procurar" id="fullWidth" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{
        startAdornment: (
          <SearchIcon style={{ color: 'gray' }} />
        ),
      }} />
    </Box>


      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">Nome do Produto</TableCell>
            <TableCell align="center">Quantidade do Produto</TableCell>
            <TableCell align="center">Valor do Produto</TableCell>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProdutos.map((produto) => (
            <TableRow
              key={produto.idProduto}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {produto.idProduto}
              </TableCell>
              <TableCell align="center">{produto.nomeProduto}</TableCell>
              <TableCell align="center">{produto.quantidadeProduto}</TableCell>
              <TableCell align="center">R$ {produto.precoProduto}</TableCell>
              <TableCell align="center"><Button variant="outlined" startIcon={<EditIcon/>} onClick={() => produtoParaAtualizar(produto)}>Editar</Button></TableCell>
              <TableCell align="center"><Button color="error" variant="outlined" startIcon={<DeleteIcon />} onClick={() => remover(produto)}>Excluir</Button></TableCell>
              <TableCell align="center"><Button variant="outlined" startIcon={<AddShoppingCartIcon/>} onClick={() => venda(produto)}>Adicionar à Venda</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>

    
  );
};

export default TableProdutos;