import { useEffect, useState } from 'react';
import FormCadastroProduto from './Produto/CadastroProduto';
import TableProdutos from './Produto/ListaProdutos';
import Vendas from './Produto/ProdutosVendidos';
import { apiAddProduto, apiGetProdutos, apiAttProduto, apiDelProduto } from './api/produtos.service';
import FormAtualizarProduto from './Produto/AtualizarProduto';
import { apiAddVenda, apiAttVenda, apiGetVendas } from './api/vendas.service';

function App() {

  const [dadosProdutos, setDadosProdutos] = useState([]);
  const [vendas, setVendas] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const resultado = await apiGetProdutos();
      setDadosProdutos(resultado);

    };
    fetchProdutos();
    
  }, []);

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

    const index = vendas.findIndex(
      (venda) => venda.nomeProduto === produtoVendido.nomeProduto
    );

    const atual = vendas.find(
      (venda) =>  venda.nomeProduto === produtoVendido.nomeProduto
    );
    let dataVenda = new Date(atual.dataVenda);
    let dataAtualFormatada = dataVenda.toISOString().split('T')[0];


      //soma um na tabela vendas
    if (produtoVendido.quantidadeProduto > 0){
      if (index !== -1 && dataAtualFormatada === dataFormatada) {
        const vendasAtualizadas = [...vendas];
        await apiAttVenda({
          idProduto: produtoVendido.idProduto,
          nomeProduto: produtoVendido.nomeProduto,
          quantidadeProduto: vendasAtualizadas[index].quantidadeProduto + 1,
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


  return (
    <>
    {mostrarAdd && <FormCadastroProduto onSubmit={salvar} />}
    {mostrarAtt && <FormAtualizarProduto atualizar={atualizarProduto} produto={dadoProduto}/>}
    <TableProdutos produtos={dadosProdutos} adicionarVenda={adicionarVenda} produtoParaAtualizar={produtoParaAtualizar} produtoParaRemover={produtoParaRemover} />
    <Vendas vendas={vendas} />
    </>
  );
}

export default App;
