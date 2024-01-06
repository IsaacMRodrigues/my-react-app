import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

const TablePessoas = ({ pessoas, pessoaParaAtualizar }) => {
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const filteredPessoas = pessoas.filter((pessoa) => {
    const pagoMatch = mostrarTodos || pessoa.pago === 0;
    return pagoMatch;
  });

  return (
    <div className="m-5">
      <h1>COMPRAS FIADAS</h1>
      <label>
        Mostrar Todos
        <input
          type="checkbox"
          checked={mostrarTodos}
          onChange={() => setMostrarTodos(!mostrarTodos)}
        />
      </label>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Data da Compra</th>
            <th scope="col">Valor da Compra</th>
            <th scope="col">Descrição</th>
            <th scope="col">PAGO</th>
          </tr>
        </thead>
        <tbody>
          {filteredPessoas.map((pessoa) => (
            <tr key={pessoa.idPessoa}>
              <td>{pessoa.idPessoa}</td>
              <td>{pessoa.nomePessoa}</td>
              <td>{pessoa.telefonePessoa}</td>
              <td>{new Date(pessoa.dataCompra).toLocaleDateString()}</td>
              <td>R$ {pessoa.valorCompra}</td>
              <td>{pessoa.descricaoCompra}</td>
              <td style={{ color: pessoa.pago === 0 ? "red" : "green" }}>
                {pessoa.pago === 0
                  ? "PAGAMENTO PENDENTE"
                  : "PAGAMENTO CONCLUÍDO"}
              </td>
              {pessoa.pago === 0 && (
                <td>
                  <Button variant="primary" onClick={() => pessoaParaAtualizar(pessoa)}>
                    Pagou
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePessoas;
