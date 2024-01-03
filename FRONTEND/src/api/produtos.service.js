const URL_API = "http://localhost:7000";

const apiGetProdutos = async () => {
  try {
    const resposta = await fetch(`${URL_API}/produtos`);

    if (!resposta.ok) {
      throw new Error("Falha na requisição");
    }

    return await resposta.json();
  } catch (error) {
    throw new Error("Não foi possível carregar os dados");
  }
};

const apiAddProduto = async (novoProduto) => {
  try {
    const res = await fetch(`${URL_API}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    });
    if (!res.ok) {
      throw new Error('Houve erro na adição do produto')
    }

    return await res.json();

  } catch (error) {
    console.error('Erro em apiAddProduto:', error);
    throw new Error(error.message)
  }
};

const apiAttProduto = async (novoProduto) => {
  try {
    const res = await fetch(`${URL_API}/atualizar`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoProduto),
    });
    if (!res.ok) {
      throw new Error('Houve erro na atualização do produto')
    }

    return await res.json();

  } catch (error) {
    console.error('Erro em apiAttProduto:', error);
    throw new Error(error.message)
  }
};

const apiDelProduto = async (produtoRemover) => {
  try {
    const res = await fetch(`${URL_API}/deletar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(produtoRemover),
    });
    if (!res.ok) {
      throw new Error('Houve erro na remoção do produto')
    }

    return await res.json();

  } catch (error) {
    console.error('Erro em apiDelProduto:', error);
    throw new Error(error.message)
  }
};


export {apiGetProdutos, apiAddProduto, apiAttProduto, apiDelProduto };