const URL_API = "http://localhost:7000";

const apiGetGarantias = async () => {
  try {
    const resposta = await fetch(`${URL_API}/garantias`);

    if (!resposta.ok) {
      throw new Error("Falha na requisição das garantias");
    }

    return await resposta.json();
  } catch (error) {
    throw new Error("Não foi possível carregar as garantias");
  }
};

const apiAddGarantia = async (novaGarantia) => {
  console.log("teste");
  console.log(JSON.stringify(novaGarantia))
  try {
    const res = await fetch(`${URL_API}/garantias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novaGarantia),
    });
    if (!res.ok) {
      throw new Error("Não foi possível adicionar a garantia");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiAddGarantia:", error);
    throw new Error(error.message);
  }
};

const apiDelGarantia = async (garantiaRemover) => {
  try {
    const res = await fetch(`${URL_API}/deletarg`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(garantiaRemover),
    });
    if (!res.ok) {
      throw new Error("Houve erro na remoção da garantia");
    }

    return await res.json();
  } catch (error) {
    console.error("Erro em apiDelGarantia:", error);
    throw new Error(error.message);
  }
};

export { apiGetGarantias, apiAddGarantia, apiDelGarantia };
