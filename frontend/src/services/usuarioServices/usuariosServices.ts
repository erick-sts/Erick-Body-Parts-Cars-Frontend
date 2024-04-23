import axios from 'axios';

const BASE_URL = 'http://localhost:8800';

export const inserirUsuario = async (userData: any) => {
  try {
    const response = await axios.post(`${BASE_URL}/usuarios/cadastrar`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (formData: any) => {
  try {
    // Faça a chamada para a API de login, enviando os dados do formulário
    const response = await axios.post('http://localhost:8800/usuarios/login', formData);
    // Se o login for bem-sucedido, você pode retornar os dados do usuário ou apenas uma mensagem de sucesso
    return response.data;
  } catch (error) {
    // Se ocorrer um erro durante o login, você pode lançar uma exceção para lidar com ele no componente de login
    console.log(error);
    throw error;
  }
};



export const fetchUsuario = async () => {
  try {
    // Aqui você pode fazer uma chamada à API para buscar o nome do usuário
    const response = await axios.get(`${BASE_URL}/usuarios/nome`); 
    return response.data.nome; // Retorna o nome do usuário da resposta da API
  } catch (error) {
    console.error(`Erro ao buscar o nome do usuário: ${Error}`);
    throw error;
  }
};