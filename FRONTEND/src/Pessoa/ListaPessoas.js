import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import { TableBody } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import "../App.css";

const TablePessoas = ({ pessoas, pessoaParaAtualizar }) => {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPessoas = pessoas.filter((pessoa) => {
    const pagoMatch =
      (mostrarTodos || pessoa.pago === 0) &&
      pessoa.nomePessoa.toLowerCase().includes(searchTerm.toLowerCase());
    return pagoMatch;
  });

  console.log(pessoas);

  const definirPago = (pessoa) => {
    const dataAtual = new Date();
    const dataFormatada = new Date(dataAtual).toISOString().split("T")[0];

    const novaPessoa = {
      idPessoa: pessoa.idPessoa,
      nomePessoa: pessoa.nomePessoa,
      telefonePessoa: pessoa.telefonePessoa,
      dataCompra: new Date(pessoa.dataCompra).toISOString().split("T")[0],
      valorCompra: pessoa.valorCompra,
      descricaoCompra: pessoa.descricaoCompra,
      pago: pessoa.pago,
      dataPagamento: dataFormatada,
    };

    pessoaParaAtualizar(novaPessoa);
  };

  return (
    <div>
      <div
        className="padrao"
      >
        <h1>Dinheiro a receber</h1>
      </div>
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
      <label
        className="padrao"
      >
        Mostrar Todos
        <input
          type="checkbox"
          checked={mostrarTodos}
          onChange={() => setMostrarTodos(!mostrarTodos)}
        />
      </label>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">Telefone</TableCell>
              <TableCell align="center">Data da Compra</TableCell>
              <TableCell align="center">Valor da Compra</TableCell>
              <TableCell align="center">Descrição</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Pagou em</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPessoas.map(
              (pessoa) => (
                console.log(pessoa.dataPagamento),
                (
                  <TableRow
                    key={pessoa.idPessoa}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {pessoa.idPessoa}
                    </TableCell>
                    <TableCell align="center">{pessoa.nomePessoa}</TableCell>
                    <TableCell align="center">
                      {pessoa.telefonePessoa}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(pessoa.dataCompra).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      R$ {pessoa.valorCompra}
                    </TableCell>
                    <TableCell align="center">
                      {pessoa.descricaoCompra}
                    </TableCell>
                    <TableCell
                      style={{ color: pessoa.pago === 0 ? "red" : "green" }}
                      align="center"
                    >
                      {pessoa.pago === 0
                        ? "PAGAMENTO PENDENTE"
                        : "PAGAMENTO CONCLUÍDO"}
                    </TableCell>
                    {pessoa.pago === 0 ? (
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          onClick={() => definirPago(pessoa)}
                        >
                          Definir como pago
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell align="center">
                        {new Date(pessoa.dataPagamento).toLocaleDateString()}
                      </TableCell>
                    )}
                  </TableRow>
                )
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TablePessoas;
