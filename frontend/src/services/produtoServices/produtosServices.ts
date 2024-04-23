import axios from "axios";

const BASE_URL = 'http://localhost:8800';

export const getProdutos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/produtos/`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
};

export const inserirProduto = async (formData: any) => {
    try {
        const response = await axios.post(`${BASE_URL}/produtos/cadastrar`, formData);
        return response.data;
    } catch (error) {
        console.error('Erro ao inserir produto:', error);
        throw error;
    }
};

export const deletarProduto = async (productId: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}/produtos/deletar/${productId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir produto:', error);
        throw error;
    }
};


