import { useEffect, useState } from 'react';
import FormCadastroProduto from './Produto/CadastroProduto';
import TableProdutos from './Produto/ListaProdutos';
import Vendas from './Produto/ProdutosVendidos';
import { apiAddProduto, apiGetProdutos, apiAttProduto, apiDelProduto } from './api/produtos.service';
import FormAtualizarProduto from './Produto/AtualizarProduto';

function App() {

  const [dadosProdutos, setDadosProdutos] = useState([]);

  useEffect(() => {
    const fetchPessoas = async () => {
      const resultado = await apiGetProdutos();
      setDadosProdutos(resultado);

    };
    fetchPessoas();
    
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

  //passar o array vendas inteiro para o banco de dados
  const [vendas, setVendas] = useState([]);

  const adicionarVenda = async (produtoVendido) => {

    const index = vendas.findIndex(
      (venda) => venda.nomeProduto === produtoVendido.nomeProduto
    );

    if (produtoVendido.quantidadeProduto > 0){
      if (index !== -1) {
        // Se o produto já existe, atualiza a quantidade
        const vendasAtualizadas = [...vendas];
        vendasAtualizadas[index] = {
          ...vendasAtualizadas[index],
          quantidadeProduto:
            Number(vendasAtualizadas[index].quantidadeProduto) +
            1,
        };
        setVendas(vendasAtualizadas);
      } else {
        setVendas([...vendas, { ...produtoVendido, quantidadeProduto: 1 }]);
      }
    }

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
  
      const novaListaDeProdutos = await apiGetProdutos();
       setDadosProdutos(novaListaDeProdutos);
    
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
