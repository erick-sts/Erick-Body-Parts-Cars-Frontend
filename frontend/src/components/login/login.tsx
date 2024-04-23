import React, { useState } from 'react';
import { login } from '../../services/usuarioServices/usuariosServices';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
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
      await login(formData);
      console.log('Login bem-sucedido!');
      setFormData({ email: '', senha: '' });
        
      // Redireciona para a página inicial
      window.location.href = '/home';
    } catch (error) {
      alert(`Erro ao fazer login! ${error}`);
      
      setFormData({ email: '', senha: '' });

    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body" style={{ color: '#000' }}>
              <h2 className="card-title mb-4 text-center " >Login 💻</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="senha" className="form-label">Senha:</label>
                  <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} className="form-control" required />
                </div>
                <button type="submit" className="btn btn-secondary">Entrar</button>
              </form>
            </div>
            <div className="card-footer">
              {/* Link para a página de cadastro */}
              <Link to="/cadastro">Cadastre-se</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
