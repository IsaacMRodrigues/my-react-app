import { useEffect, useState } from 'react';
import FormCadastroProduto from './Produto/CadastroProduto';
import TableProdutos from './Produto/ListaProdutos';
import Vendas from './Produto/ProdutosVendidos';
import { apiAddProduto, apiGetProdutos, apiAttProduto, apiDelProduto } from './api/produtos.service';
import FormAtualizarProduto from './Produto/AtualizarProduto';
import { apiAddVenda, apiAttVenda, apiGetVendas } from './api/vendas.service';
import TablePessoas from './Pessoa/ListaPessoas';
import { apiAddPessoa, apiGetPessoas, apiAttPessoa } from './api/pessoas.service';
import FormCadastroPessoa from './Pessoa/CadastroPessoa';
import TableGarantias from './Garantia/ListaGarantias';
import { apiGetGarantias, apiAddGarantia } from './api/garantias.service';
import FormCadastroGarantia from './Garantia/CadastroGarantias';
import './App.css';

function App() {
  const [pessoas, setPessoas] = useState([]);
  const [garantias, setGarantias] = useState([]);
  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);


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

  //VENDAS
  useEffect(() => {
    const fetchVendas = async () => {
      const resultado = await apiGetVendas();
      setVendas(resultado);
    };
    fetchVendas();
    
  }, []);

  const [mostrarAtt, setMostrarAtt] = useState(false);
  const [mostrarAdd, setMostrarAdd] = useState(true);
  
  const salvar = async (novoProduto) => {
    try {
      await apiAddProduto(novoProduto);
  
      const novaListaDeProdutos = await apiGetProdutos();
      setDadosProdutos(novaListaDeProdutos);
    } catch (error) {
      console.error('Erro ao chamar apiAddProduto:', error);
    }
  }

  const salvarPessoa = async (novaPessoa) => {
    try {
      await apiAddPessoa(novaPessoa);
  
      const novaListaDePessoas = await apiGetPessoas();
      setPessoas(novaListaDePessoas);
    } catch (error) {
      console.error('Erro ao chamar apiAddProduto:', error);
    }
  }

  const salvarGarantia = async (novaGarantia) => {
    try {
      await apiAddGarantia(novaGarantia);

      const novaListaDeGarantias = await apiGetGarantias();
      setGarantias(novaListaDeGarantias);
    } catch (error) {
      console.error('Erro ao chamar apiAddProduto:', error);
    }
  }

  const atualizarProduto = async (novoProduto) => {
    try {
      setMostrarAtt(false);
      setMostrarAdd(true)
      await apiAttProduto(novoProduto);
  
      const novaListaDeProdutos = await apiGetProdutos();
      setDadosProdutos(novaListaDeProdutos);
    } catch (error) {
      console.error('Erro ao chamar apiAddProduto:', error);
    }

  }

  const [dadoProduto, setDadoProduto] = useState([]);

  const produtoParaAtualizar = (produto) => {
    setMostrarAtt(true)
    setMostrarAdd(false)
    setDadoProduto(produto);
  }

  const produtoParaRemover = async (produto) => {
    try {
      await apiDelProduto(produto);
  
      const novaListaDeProdutos = await apiGetProdutos();
      setDadosProdutos(novaListaDeProdutos);
    } catch (error) {
      console.error('Erro ao chamar apiAddProduto:', error);
    }
  }



  const adicionarVenda = async (produtoVendido) => {

    const dataAtual = new Date();
    const dataFormatada = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate()).toISOString().split('T')[0];



    const teste = vendas.find((venda) => {
      const vendaDataFormatada = new Date(venda.dataVenda).toISOString().split('T')[0];
      return venda.nomeProduto === produtoVendido.nomeProduto && vendaDataFormatada === dataFormatada;
    });


    let dataAtualFormatada = dataFormatada

    if (teste) {
        let dataVenda = new Date(teste.dataVenda);
        dataAtualFormatada = dataVenda.toISOString().split('T')[0];
      }else {
        let dataNula = new Date(1999, 0, 0)
        dataAtualFormatada = new Date(dataNula.getFullYear(), dataAtual.getMonth(), dataAtual.getDate()).toISOString().split('T')[0];;
      }
    


      //soma um na tabela vendas
    if (produtoVendido.quantidadeProduto > 0){
      console.log(dataAtualFormatada);
      console.log(dataFormatada)
      if (dataAtualFormatada === dataFormatada) {
        const vendasAtualizadas = [...vendas];
        
        const vendaCerta = vendasAtualizadas.find((vendaCerta) => {
          return vendaCerta.idVenda === teste.idVenda
        })

        await apiAttVenda({
          idVenda: teste.idVenda,
          idProduto: produtoVendido.idProduto,
          nomeProduto: produtoVendido.nomeProduto,
          quantidadeProduto: vendaCerta.quantidadeProduto + 1,
          precoProduto: produtoVendido.precoProduto,
          dataVenda: dataFormatada
        });

        const novasVendas = await apiGetVendas();
        setVendas(novasVendas);
      } else {
        await apiAddVenda({
          idProduto: produtoVendido.idProduto,
          nomeProduto: produtoVendido.nomeProduto,
          quantidadeProduto: 1,
          precoProduto: produtoVendido.precoProduto,
          dataVenda: dataFormatada
        });
        const novasVendas = await apiGetVendas();
        setVendas(novasVendas);
        //setVendas([...vendas, { ...produtoVendido, quantidadeProduto: 1, dataVenda: dataFormatada }]);
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
          quantidadeProduto: produto.quantidadeProduto - 1
        };
      } else {
        console.log("cabo ja ze")
      }
    }
      return produto;
    });
    const estoqueAtualizado = await Promise.all(promessasAtualizacao);
    
       setDadosProdutos(estoqueAtualizado)
  };

  const pessoaParaAtualizar = async (novaPessoa) => {
    try {

      await apiAttPessoa(novaPessoa);
  
      const novaListaDePessoas = await apiGetPessoas();
      setPessoas(novaListaDePessoas);
    } catch (error) {
      console.error('Erro ao chamar apiAddPessoa:', error);
    }

  }
  const [componenteAtivo, setComponenteAtivo] = useState('produto');

  const mostrarComponente = (componente) => {
    setComponenteAtivo(componente);
  };


  return (
    <>
        <div>
      {'INICIO'}
      <div className='menu-container'>
      <button onClick={() => mostrarComponente('produto')}>Produtos</button>
        <button onClick={() => mostrarComponente('vendas')}>Vendas</button>
        <button onClick={() => mostrarComponente('pessoa')}>Dinheiro a receber</button>
        <button onClick={() => mostrarComponente('garantia')}>Garantias</button>
      </div>
      </div>
      <div className='content-container'>
    {componenteAtivo === 'produto' && mostrarAdd && <FormCadastroProduto onSubmit={salvar} />}
    {componenteAtivo === 'produto' && mostrarAtt && <FormAtualizarProduto atualizar={atualizarProduto} produto={dadoProduto}/>}
    {componenteAtivo === 'produto' && <TableProdutos produtos={dadosProdutos} adicionarVenda={adicionarVenda} produtoParaAtualizar={produtoParaAtualizar} produtoParaRemover={produtoParaRemover} />}
    {componenteAtivo === 'vendas' && <Vendas vendas={vendas} />}
    {componenteAtivo === 'pessoa' && <FormCadastroPessoa onSubmit={salvarPessoa}/>}
    {componenteAtivo === 'pessoa' &&<TablePessoas pessoas={pessoas} pessoaParaAtualizar={pessoaParaAtualizar}/>}
    {componenteAtivo === 'garantia' && <FormCadastroGarantia onSubmit={salvarGarantia}/>}
    {componenteAtivo === 'garantia' && <TableGarantias garantias={garantias}/>}
    </div>

    </>
  );
}

export default App;
