import { useEffect, useState } from "react";
import FormCadastroProduto from "./Produto/CadastroProduto";
import TableProdutos from "./Produto/ListaProdutos";
import Vendas from "./Produto/ProdutosVendidos";
import {
  apiAddProduto,
  apiGetProdutos,
  apiAttProduto,
  apiDelProduto,
} from "./api/produtos.service";
import FormAtualizarProduto from "./Produto/AtualizarProduto";
import { apiAddVenda, apiAttVenda, apiGetVendas } from "./api/vendas.service";
import TablePessoas from "./Pessoa/ListaPessoas";
import {
  apiAddPessoa,
  apiGetPessoas,
  apiAttPessoa,
} from "./api/pessoas.service";
import FormCadastroPessoa from "./Pessoa/CadastroPessoa";
import TableGarantias from "./Garantia/ListaGarantias";
import {
  apiGetGarantias,
  apiAddGarantia,
  apiDelGarantia,
} from "./api/garantias.service";
import FormCadastroGarantia from "./Garantia/CadastroGarantias";
import "./App.css";
import TableServicos from "./Servicos/ListaServicos";
import FormCadastroServico from "./Servicos/CadastroServico";
import {
  apiGetServicos,
  apiAddServico,
  apiAttServico,
  apiDelServico,
} from "./api/servicos.service";
import FormAtualizarServico from "./Servicos/AtualizarServico";
import Button from '@mui/material/Button';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [servicos, setServicos] = useState([]);
  const [garantias, setGarantias] = useState([]);
  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [dadoProduto, setDadoProduto] = useState([]);
  const [dadoServico, setDadoServico] = useState([]);
  const [mostrarAtt, setMostrarAtt] = useState(false);
  const [mostrarAttS, setMostrarAttS] = useState(false);
  const [mostrarAddS, setMostrarAddS] = useState(true);
  const [mostrarAdd, setMostrarAdd] = useState(true);
  const [componenteAtivo, setComponenteAtivo] = useState("produto");

  //GARANTIAS
  useEffect(() => {
    const fetchGarantias = async () => {
      const resultado = await apiGetGarantias();
      setGarantias(resultado);
    };
    fetchGarantias();
  }, []);

  //PAGAMENTOS
  useEffect(() => {
    const fetchPessoas = async () => {
      const resultado = await apiGetPessoas();
      setPessoas(resultado);
    };
    fetchPessoas();
  }, []);

  //PRODUTOS
  useEffect(() => {
    const fetchProdutos = async () => {
      const resultado = await apiGetProdutos();
      setDadosProdutos(resultado);
    };
    fetchProdutos();
  }, []);

  //SERVIÇOS
  useEffect(() => {
    const fetchServicos = async () => {
      const resultado = await apiGetServicos();
      setServicos(resultado);
    };
    fetchServicos();
  }, []);

  //VENDAS
  useEffect(() => {
    const fetchVendas = async () => {
      const resultado = await apiGetVendas();
      setVendas(resultado);
    };
    fetchVendas();
  }, []);

  const salvar = async (novoProduto) => {
    try {
      await apiAddProduto(novoProduto);

      const novaListaDeProdutos = await apiGetProdutos();
      setDadosProdutos(novaListaDeProdutos);
    } catch (error) {
      console.error("Erro ao chamar apiAddProduto:", error);
    }
  };

  const salvarServico = async (novoServico) => {
    try {
      await apiAddServico(novoServico);

      const novaListaDeServicos = await apiGetServicos();
      setServicos(novaListaDeServicos);
    } catch (error) {
      console.error("Erro ao chamar apiAddServicos:", error);
    }
  };

  const atualizarServico = async (novoServico) => {
    try {
      setMostrarAttS(false);
      setMostrarAddS(true);
      await apiAttServico(novoServico);

      const novaListaDeServicos = await apiGetServicos();
      setServicos(novaListaDeServicos);
    } catch (error) {
      console.error("Erro ao chamar apiAttServicos:", error);
    }
  };

  const servicoParaRemover = async (servico) => {
    try {
      await apiDelServico(servico);

      const novaListaDeServicos = await apiGetServicos();
      setServicos(novaListaDeServicos);
    } catch (error) {
      console.error("Erro ao chamar apiDelServico:", error);
    }
  };

  const atualizarProduto = async (novoProduto) => {
    try {
      setMostrarAtt(false);
      setMostrarAdd(true);
      await apiAttProduto(novoProduto);

      const novaListaDeProdutos = await apiGetProdutos();
      setDadosProdutos(novaListaDeProdutos);
    } catch (error) {
      console.error("Erro ao chamar apiAttProduto:", error);
    }
  };

  const servicoParaAtualizar = (servico) => {
    setMostrarAttS(true);
    setMostrarAddS(false);
    setDadoServico(servico);
  };

  const produtoParaAtualizar = (produto) => {
    setMostrarAtt(true);
    setMostrarAdd(false);
    setDadoProduto(produto);
  };

  const produtoParaRemover = async (produto) => {
    try {
      await apiDelProduto(produto);

      const novaListaDeProdutos = await apiGetProdutos();
      setDadosProdutos(novaListaDeProdutos);
    } catch (error) {
      console.error("Erro ao chamar apiDelProduto:", error);
    }
  };

  const salvarPessoa = async (novaPessoa) => {
    try {
      await apiAddPessoa(novaPessoa);

      const novaListaDePessoas = await apiGetPessoas();
      setPessoas(novaListaDePessoas);
    } catch (error) {
      console.error("Erro ao chamar apiAddPessoa:", error);
    }
  };

  const pessoaParaAtualizar = async (novaPessoa) => {
    try {
      await apiAttPessoa(novaPessoa);

      const novaListaDePessoas = await apiGetPessoas();
      setPessoas(novaListaDePessoas);
    } catch (error) {
      console.error("Erro ao chamar apiAttPessoa:", error);
    }
  };

  const salvarGarantia = async (novaGarantia) => {
    console.log("teste");
    try {
      await apiAddGarantia(novaGarantia);

      const novaListaDeGarantias = await apiGetGarantias();
      setGarantias(novaListaDeGarantias);
    } catch (error) {
      console.error("Erro ao chamar apiAddGarantia:", error);
    }
  };

  const garantiaParaRemover = async (garantia) => {
    try {
      await apiDelGarantia(garantia);

      const novaListaDeProdutos = await apiGetGarantias();
      setGarantias(novaListaDeProdutos);
    } catch (error) {
      console.error("Erro ao chamar apiDelGarantia:", error);
    }
  };

  const adicionarVenda = async (produtoVendido) => {
    const dataAtual = new Date();
    const dataFormatada = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      dataAtual.getDate()
    )
      .toISOString()
      .split("T")[0];

    const filteredVendas = vendas.find((venda) => {
      const vendaDataFormatada = new Date(venda.dataVenda)
        .toISOString()
        .split("T")[0];
      return (
        venda.nomeProduto === produtoVendido.nomeProduto &&
        vendaDataFormatada === dataFormatada
      );
    });

    let dataAtualFormatada = dataFormatada;

    if (filteredVendas) {
      let dataVenda = new Date(filteredVendas.dataVenda);
      dataAtualFormatada = dataVenda.toISOString().split("T")[0];
    } else {
      let dataNula = new Date(1999, 0, 0);
      dataAtualFormatada = new Date(
        dataNula.getFullYear(),
        dataAtual.getMonth(),
        dataAtual.getDate()
      )
        .toISOString()
        .split("T")[0];
    }

    //soma um na tabela vendas
    if (produtoVendido.quantidadeProduto > 0) {
      if (dataAtualFormatada === dataFormatada) {
        const vendasAtualizadas = [...vendas];

        const vendaCerta = vendasAtualizadas.find((vendaCerta) => {
          return vendaCerta.idVenda === filteredVendas.idVenda;
        });

        await apiAttVenda({
          idVenda: filteredVendas.idVenda,
          idProduto: produtoVendido.idProduto,
          nomeProduto: produtoVendido.nomeProduto,
          quantidadeProduto: vendaCerta.quantidadeProduto + 1,
          precoProduto: produtoVendido.precoProduto,
          dataVenda: dataFormatada,
        });

        const novasVendas = await apiGetVendas();
        setVendas(novasVendas);
      } else {
        await apiAddVenda({
          idProduto: produtoVendido.idProduto,
          nomeProduto: produtoVendido.nomeProduto,
          quantidadeProduto: 1,
          precoProduto: produtoVendido.precoProduto,
          dataVenda: dataFormatada,
        });
        const novasVendas = await apiGetVendas();
        setVendas(novasVendas);
      }
    }

    // tira um na tabela produtos
    const promessasAtualizacao = dadosProdutos.map(async (produto) => {
      if (produto.nomeProduto === produtoVendido.nomeProduto) {
        if (produto.quantidadeProduto > 0) {
          await apiAttProduto({
            ...produtoVendido,
            quantidadeProduto: produto.quantidadeProduto - 1,
          });
          return {
            ...produto,
            quantidadeProduto: produto.quantidadeProduto - 1,
          };
        } else {
          alert("Estoque esgotado");
        }
      }
      return produto;
    });
    const estoqueAtualizado = await Promise.all(promessasAtualizacao);

    setDadosProdutos(estoqueAtualizado);
  };

  const mostrarComponente = (componente) => {
    setComponenteAtivo(componente);
  };

  return (
    <>
      <div>
        {"INICIO"}
        <div className="menu-container">
          <Button variant="contained" onClick={() => mostrarComponente("produto")}>Produtos</Button>
          <Button variant="contained" onClick={() => mostrarComponente("servico")}>Serviços</Button>
          <Button variant="contained" onClick={() => mostrarComponente("vendas")}>Vendas</Button>
          <Button variant="contained" onClick={() => mostrarComponente("pessoa")}>
            Dinheiro a receber
          </Button>
          <Button variant="contained" onClick={() => mostrarComponente("garantia")}>
            Garantias
          </Button>
        </div>
      </div>
      <div className="content-container">
        {componenteAtivo === "produto" && mostrarAdd && (
          <FormCadastroProduto onSubmit={salvar} />
        )}
        {componenteAtivo === "produto" && mostrarAtt && (
          <FormAtualizarProduto
            atualizar={atualizarProduto}
            produto={dadoProduto}
          />
        )}
        {componenteAtivo === "produto" && (
          <TableProdutos
            produtos={dadosProdutos}
            adicionarVenda={adicionarVenda}
            produtoParaAtualizar={produtoParaAtualizar}
            produtoParaRemover={produtoParaRemover}
          />
        )}
        {componenteAtivo === "servico" && mostrarAttS && (
          <FormAtualizarServico
            atualizar={atualizarServico}
            servico={dadoServico}
          />
        )}
        {componenteAtivo === "servico" && mostrarAddS && (
          <FormCadastroServico onSubmit={salvarServico} />
        )}

        {componenteAtivo === "servico" && (
          <TableServicos
            servicos={servicos}
            adicionarVenda={adicionarVenda}
            servicoParaAtualizar={servicoParaAtualizar}
            servicoParaRemover={servicoParaRemover}
          />
        )}

        {componenteAtivo === "vendas" && <Vendas vendas={vendas} />}
        {componenteAtivo === "pessoa" && (
          <FormCadastroPessoa onSubmit={salvarPessoa} />
        )}
        {componenteAtivo === "pessoa" && (
          <TablePessoas
            pessoas={pessoas}
            pessoaParaAtualizar={pessoaParaAtualizar}
          />
        )}
        {componenteAtivo === "garantia" && (
          <FormCadastroGarantia onSubmit={salvarGarantia} />
        )}
        {componenteAtivo === "garantia" && (
          <TableGarantias
            garantias={garantias}
            garantiaParaRemover={garantiaParaRemover}
          />
        )}
      </div>
    </>
  );
}

export default App;
