import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import CadastroUsuario from './components/cadastroUsuario/cadastroUsuario';
import Home from './components/home/home';
import CadastroProduto from './components/cadastroProdutos/cadastroProdutos';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<CadastroUsuario />} />
        <Route path="/cadastrar-produto" element={<CadastroProduto />} />
      </Routes>
    </Router>
  );
}

export default App;

