const URL_API = "http://localhost:7000";

const apiGetVendas = async () => {
  try {
    const resposta = await fetch(`${URL_API}/vendas`);

    if (!resposta.ok) {
      throw new Error("Falha na requisição");
    }

    return await resposta.json();
  } catch (error) {
    throw new Error("Não foi possível carregar os dados");
  }
};

const apiAddVenda = async (vendaProduto) => {
  try {
    const res = await fetch(`${URL_API}/vendas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendaProduto),
    });
    if (!res.ok) {
      throw new Error('Houve erro na adição da venda')
    }

    return await res.json();

  } catch (error) {
    console.error('Erro em apiAddVenda:', error);
    throw new Error(error.message)
  }
};

const apiAttVenda = async (vendaProduto) => {
  console.log(JSON.stringify(vendaProduto))
  try {
    const res = await fetch(`${URL_API}/attvendas`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendaProduto),
    });
    if (!res.ok) {
      throw new Error('Houve erro na atualização da venda')
    }

    return await res.json();

  } catch (error) {
    console.error('Erro em apiAttVenda:', error);
    throw new Error(error.message)
  }
};

export { apiGetVendas, apiAddVenda, apiAttVenda};