import React, { useState } from 'react';
import { inserirProduto } from '../../services/produtoServices/produtosServices';

const CadastroProduto: React.FC = () => {
    const [nomePeca, setNomePeca] = useState('');
    const [aplicacao, setAplicacao] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const handleCadastro = async () => {
        try {
            // Validação dos campos numéricos
            const parsedQuantidade = parseInt(quantidade);
            const parsedValor = parseFloat(valor);
            if (isNaN(parsedQuantidade) || isNaN(parsedValor)) {
                alert('Por favor, preencha os campos de quantidade e valor com valores numéricos válidos.');
                return;
            }

            // Requisição para inserir o produto
            await inserirProduto({
                nome_peca: nomePeca,
                aplicacao: aplicacao,
                quantidade: parsedQuantidade,
                valor: parsedValor
            });

            // Limpa os campos após o cadastro bem-sucedido
            setNomePeca('');
            setAplicacao('');
            setQuantidade('');
            setValor('');

            alert('Produto cadastrado com sucesso!');
            // Redireciona para a página de listagem de produtos
            window.location.href = '/home';
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            alert('Erro ao cadastrar produto. Por favor, tente novamente.');
        }
    };

    return (
        <div className="container bg-dark text-white mt-4 py-3">
            <h2>Cadastro de Produto</h2>
            <div className="form-group">
                <label htmlFor="nomePeca">Nome da Peça:</label>
                <input type="text" id="nomePeca" className="form-control" value={nomePeca} onChange={(e) => setNomePeca(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="aplicacao">Aplicação:</label>
                <input type="text" id="aplicacao" className="form-control" value={aplicacao} onChange={(e) => setAplicacao(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="quantidade">Quantidade:</label>
                <input type="number" id="quantidade" className="form-control" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} />
            </div>
            <div className="form-group">
                <label htmlFor="valor">Valor:</label>
                <input type="number" id="valor" className="form-control" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={handleCadastro}>Cadastrar</button>
        </div>
    );
};

export default CadastroProduto;
