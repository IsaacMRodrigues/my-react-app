import React from "react";

const TableGarantias = ({garantias}) => {

  const dataCompraObj = new Date();
  const dataAtual = new Date(dataCompraObj).toISOString().split('T')[0];


  // Filtra os produtos com base no termo de pesquisa
  const filteredProdutos = garantias.filter((garantia) =>
    garantia.dataGarantia > dataAtual,
  );

  return (
    <div className="m-5">
      <h1>GARANTIAS</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">Telefone</th>
            <th scope="col">Produto</th>
            <th scope="col">Garantia até</th>
          </tr>
        </thead>
        <tbody>
          {filteredProdutos.map((garantia) => (
            <tr key={garantia.idGarantia}>
              <td>{garantia.idGarantia}</td>
              <td>{garantia.nomePessoa}</td>
              <td>{garantia.telefonePessoa}</td>
              <td>{garantia.produtoPessoa}</td>
              <td>{new Date(garantia.dataGarantia).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableGarantias;
