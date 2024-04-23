import React, { useState } from 'react';
import { inserirUsuario } from '../../services/usuarioServices/usuariosServices';
import { Link } from 'react-router-dom';

const CadastroUsuario: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inserirUsuario(formData);
      console.log('Registrado com sucesso!');
      
      setFormData({ nome:'', email: '', senha: '' }); // Limpa os dados do formulário
      alert('Cadastro realizado com sucesso!')
      // Redireciona para a página de login
      window.location.href = '/';

    } catch (error) {
      alert(`Erro ao registrar! ${error}`);
    }
  };



  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body" style={{ color: '#000' }}>

              <h2 className="card-title mb-4 text-center">Cadastro de Usuário 🪪</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="nome">Nome:</label>
                  <input type="text" className="form-control" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="senha">Senha:</label>
                  <input type="password" className="form-control" id="senha" name="senha" value={formData.senha} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
              </form>
              <div>
                {/* Link para a página de login */}
                <Link to="/">Já tem uma conta? Faça login aqui</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroUsuario;
