const URL_API = "http://localhost:7000";

const apiGetPessoas = async () => {
  try {
    const resposta = await fetch(`${URL_API}/pessoas`);

    if (!resposta.ok) {
      throw new Error("Falha na requisição das pessoas");
    }

    return await resposta.json();
  } catch (error) {
    throw new Error("Não foi possível carregar as pessoas");
  }
};

const apiAddPessoa = async (novaPessoa) => {
  try {
    const res = await fetch(`${URL_API}/pessoas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaPessoa),
    });
    if (!res.ok) {
      throw new Error("Houve erro na adição da pessoa");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiAddPessoa:", error);
    throw new Error(error.message);
  }
};

const apiAttPessoa = async (novaPessoa) => {
  try {
    const res = await fetch(`${URL_API}/attpessoa`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaPessoa),
    });
    if (!res.ok) {
      throw new Error("Houve erro na atualização da pessoa");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiAttPessoa:", error);
    throw new Error(error.message);
  }
};

export { apiGetPessoas, apiAddPessoa, apiAttPessoa };
