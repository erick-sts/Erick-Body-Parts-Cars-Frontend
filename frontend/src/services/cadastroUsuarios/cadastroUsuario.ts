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

// Adicione outras funções de serviço aqui conforme necessário
