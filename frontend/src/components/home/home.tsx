import React, { useState, useEffect } from 'react';
import { getProdutos, deletarProduto, atualizarProduto } from '../../services/produtoServices/produtosServices';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const [produtos, setProdutos] = useState<any[]>([]);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const produtosData = await getProdutos();
            setProdutos(produtosData);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            await deletarProduto(productId);
            fetchProdutos();
            alert('Produto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto. Por favor, tente novamente.');
        }
    };

    const handleEditProduct = (produto: any) => {
        setProdutoSelecionado(produto);
        setShowModal(true);
    };

    const closeModal = () => {
        setProdutoSelecionado(null);
        setShowModal(false);
    };

    const handleUpdateProduct = async (updatedProduct: any) => {
        try {
            await atualizarProduto(updatedProduct.id, updatedProduct);
            fetchProdutos();
            closeModal();
            alert('Produto atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto. Por favor, tente novamente.');
        }
    };

    const handleCadastrar = () => {
        navigate('/cadastrar-produto');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };
    
    return (
        <div className="container bg-dark text-white mt-4 py-3">
            <h2>Lista de Produtos</h2>
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
                            <td>
                                <button className='btn-danger m-1' onClick={() => handleDeleteProduct(produto.id)}>🗑️</button>

                                <button className='btn-secondary m-1' onClick={() => handleEditProduct(produto)}>📝</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>



            {showModal && produtoSelecionado && (
                <div className="modal" style={{ display: 'block', position: 'fixed', zIndex: 1, left: 0, top: 0, width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-content" style={{ backgroundColor: '#fefefe', border: '1px solid #888', width: '80%', maxWidth: '500px', margin: '15% auto', padding: '20px' }}>
                        <span className="close" onClick={closeModal} style={{ color: '#aaa', float: 'right', fontSize: '28px', fontWeight: 'bold' }}>&times;</span>
                        <h2 style={{ color: '#000' }} className='text-center'>Editar Produto</h2>
                        <form onSubmit={() => handleUpdateProduct(produtoSelecionado)}>
                            <div className="form-group">
                                <label>Peça:</label>
                                <input type="text" name="nome_peca" value={produtoSelecionado.nome_peca} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, nome_peca: e.target.value })} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Aplicação:</label>
                                <input type="text" name="aplicacao" value={produtoSelecionado.aplicacao} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, aplicacao: e.target.value })} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Quantidade:</label>
                                <input type="number" name="quantidade" value={produtoSelecionado.quantidade} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, quantidade: e.target.value })} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Valor:</label>
                                <input type="number" name="valor" value={produtoSelecionado.valor} onChange={(e) => setProdutoSelecionado({ ...produtoSelecionado, valor: e.target.value })} className="form-control" />
                            </div>

                            <button type="submit" className="btn btn-primary">Atualizar</button>
                        </form>
                    </div>
                </div>
            )}

            <div className="buttons-container mt-4">
                <button className="btn btn-primary" onClick={handleCadastrar}>Cadastrar</button>
                <button className="btn btn-danger ml-2" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default Home;
