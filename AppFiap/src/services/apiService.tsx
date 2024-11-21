import AsyncStorage from "@react-native-async-storage/async-storage";

const fetchProtectedData = async (url: string) => {
  try {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado. Faça login novamente.");
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Adiciona o token ao cabeçalho
      },
    });

    if (!response.ok) {
      throw new Error("Falha na requisição");
    }

    return await response.json(); // Retorna os dados
  } catch (error) {
    throw new Error(error.message); // Retorna erro
  }
};

export default fetchProtectedData;
