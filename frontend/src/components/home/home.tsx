import React, { useState, useEffect } from 'react';
import { getProdutos, deletarProduto } from '../../services/produtoServices/produtosServices';
import { useNavigate } from 'react-router-dom';
import { fetchUsuario } from '../../services/usuarioServices/usuariosServices';

const Home: React.FC = () => {
    const [usuario, setUsuario] = useState<string>('');

    const [produtos, setProdutos] = useState<any[]>([]);
    const navigate = useNavigate();

    const fetchProdutos = async () => {
        try {
            const produtosData = await getProdutos();
            setProdutos(produtosData);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    useEffect(() => {
        fetchProdutos();
        fetchUsuarioName(); // Chama a função fetchUsuarioName no useEffect
    }, []); 

    const fetchUsuarioName = async () => {
        try {
            // Chama a função para buscar o nome do usuário
            const nomeUsuario = await fetchUsuario();
            setUsuario(nomeUsuario);
        } catch (error) {
            console.error('Erro ao buscar o nome do usuário:', error);
        }
    };

    const handleLogout = () => {
        // Limpar os dados de autenticação
        localStorage.removeItem('token');

        // Redirecionar para a página de login
        navigate('/');
    };

    const handleCadastrarPeca = () => {
        // Redirecionar para a página de cadastro de peças
        navigate('/cadastrar-produto');
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deletarProduto(productId);
            console.log(productId);
            // Após a exclusão bem-sucedida, recarrega os produtos
            fetchProdutos();
            alert('Produto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto. Por favor, tente novamente.');
        }
    };

    return (
        <div className="container bg-dark text-white mt-4 py-3"> 
            <h2>Bem-vindo, {usuario}</h2>
            <table className="table table-dark mt-4">
                <thead>
                    <tr>
                        <th>Peça</th>
                        <th>Aplicação</th>
                        <th>Quantidade</th>
                        <th>Valor</th>
                        <th>Imagem</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto, index) => (
                        <tr key={index}>
                            <td>{produto.nome_peca}</td>
                            <td>{produto.aplicacao}</td>
                            <td>{produto.quantidade}</td>
                            <td>{produto.valor}</td>
                            <td>
                                <img src={produto.imagem} alt={`Imagem do produto ${produto.nome_peca}`} width="50" height="50" />
                            </td>
                            <td><a onClick={() => handleDeleteProduct(produto.id)}>🗑️</a>|<a href="#">📝</a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary mt-3" onClick={handleCadastrarPeca}>Cadastrar Peça</button>
            <button className="btn btn-danger mt-3 float-right" onClick={handleLogout}>Sair</button>
        </div>
    );
};

export default Home;
