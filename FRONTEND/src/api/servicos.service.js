const URL_API = "http://localhost:7000";

const apiGetServicos = async () => {
  try {
    const resposta = await fetch(`${URL_API}/servicos`);

    if (!resposta.ok) {
      throw new Error("Falha na requisição");
    }

    return await resposta.json();
  } catch (error) {
    throw new Error("Não foi possível carregar os dados");
  }
};

const apiAddServico = async (novoServico) => {
  try {
    const res = await fetch(`${URL_API}/servicos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoServico),
    });
    if (!res.ok) {
      throw new Error("Houve erro na adição do serviço");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiAddServicos:", error);
    throw new Error(error.message);
  }
};

const apiAttServico = async (novoServico) => {
  try {
    const res = await fetch(`${URL_API}/atualizars`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoServico),
    });
    if (!res.ok) {
      throw new Error("Houve erro na atualização do serviço");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiAttServicos:", error);
    throw new Error(error.message);
  }
};

const apiDelServico = async (servicoRemover) => {
  try {
    const res = await fetch(`${URL_API}/deletars`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servicoRemover),
    });
    if (!res.ok) {
      throw new Error("Houve erro na remoção do serviço");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiDelServicos:", error);
    throw new Error(error.message);
  }
};

export { apiGetServicos, apiAddServico, apiAttServico, apiDelServico };
