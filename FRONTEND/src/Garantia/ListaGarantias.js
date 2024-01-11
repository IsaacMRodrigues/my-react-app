import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { TableBody } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "../App.css";

const TableGarantias = ({ garantias, garantiaParaRemover }) => {
  const dataCompraObj = new Date();
  const dataAtual = new Date(dataCompraObj).toISOString().split("T")[0];
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleGeneratePDF = (garantia) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Recibo de Compra', 85, 10);

    // Adiciona informações da compra
    doc.setFontSize(12);
    doc.text(`Nome: ${garantia.nomePessoa}`, 20, 20);
    doc.text(`Garantia nº: ${garantia.idGarantia}`, 140, 20);
    doc.text(`Produto: ${garantia.produtoPessoa}`, 20, 30);
    doc.text(`Valor: R$ ${garantia.precoProduto}`, 140, 30);
    doc.text(`Data da Compra: ${new Date().toLocaleDateString()}`, 20, 40);
    doc.text(`Garantia até: ${new Date(garantia.dataGarantia).toLocaleDateString()}`, 140, 40);

    // Adiciona a tabela com detalhes
    doc.autoTable({
      startY: 60,
      head: [['Item', 'Produto', 'Quantidade', 'Preço Unitário']],
      body: [
        ['1', garantia.produtoPessoa, '1', `R$ ${garantia.precoProduto}`],
      ],
      theme: 'striped',
      styles: {
        fontSize: 10,
      },
    });

    doc.save(`recibo_compra_${garantia.nomePessoa}.pdf`);
  };

  const excluir = (garantia) => {
    const confirmarExclusao = window.confirm('Você realmente deseja excluir essa garantia ?');

    if (confirmarExclusao) {
      garantiaParaRemover(garantia)
    }
  };

  const filteredGarantias = garantias.filter(
    (garantia) =>
      garantia.dataGarantia >= dataAtual &&
      garantia.nomePessoa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const garantiasVencidas = garantias.filter(
    (garantia) =>
      garantia.dataGarantia < dataAtual &&
      mostrarTodos &&
      garantia.nomePessoa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <Box
          sx={{
            width: 1000,
            maxWidth: "100%",
            margin: "auto",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "50px",
            marginTop: "20px",
          }}
        >
          <TextField
            fullWidth
            label="Procurar"
            id="fullWidth"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon style={{ color: "gray" }} />,
            }}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table id="tabela-garantias" sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Produto</TableCell>
                <TableCell align="center">Garantia até</TableCell>
                <TableCell align="center">#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGarantias.map((garantia) => (
                <TableRow
                  key={garantia.idGarantia}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {garantia.idGarantia}
                  </TableCell>
                  <TableCell align="center">{garantia.nomePessoa}</TableCell>
                  <TableCell align="center">
                    {garantia.telefonePessoa}
                  </TableCell>
                  <TableCell align="center">{garantia.produtoPessoa}</TableCell>
                  <TableCell align="center">
                    {new Date(garantia.dataGarantia).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="error"
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => excluir(garantia)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                  <TableCell align="center"><Button variant="outlined" onClick={() => handleGeneratePDF(garantia)}>Gerar PDF</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div style={{ marginTop: "50px" }}>
        <label
          className="padrao m-25"
        >
          Mostrar Garantias Vencidas
          <input
            type="checkbox"
            checked={mostrarTodos}
            onChange={() => setMostrarTodos(!mostrarTodos)}
          />
        </label>
        {mostrarTodos &&
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Telefone</TableCell>
                <TableCell align="center">Produto</TableCell>
                <TableCell align="center">Garantia até</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {garantiasVencidas.map((garantia) => (
                <TableRow
                  key={garantia.idGarantia}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {garantia.idGarantia}
                  </TableCell>
                  <TableCell align="center">{garantia.nomePessoa}</TableCell>
                  <TableCell align="center">
                    {garantia.telefonePessoa}
                  </TableCell>
                  <TableCell align="center">{garantia.produtoPessoa}</TableCell>
                  <TableCell align="center">
                    {new Date(garantia.dataGarantia).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
}

      </div>
    </>
  );
};

export default TableGarantias;
