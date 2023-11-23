import './App.css'
import React, { useState } from 'react';
import Produtos from './componentes/Produtos';
import Navbar from './componentes/Navbar';

function App() {
  const [produtos, setProdutos] = useState([])
  const [total, setTotal] = useState(0)


  function adicionaItem(titulo, preco, foto) {
    const produtos2 = [...produtos];
    produtos2.push({ titulo, preco, foto });
    setProdutos(produtos2);
    setTotal(total + Number(preco));
  }

  function removerItem(index) {
    const produtosAtualizados = [...produtos];
    const produtoRemovido = produtosAtualizados.splice(index, 1)[0];
    setProdutos(produtosAtualizados);
    setTotal(total - Number(produtoRemovido.preco));
  }
  
  return (
    <>
      <Navbar produtos={produtos} total={total} setProdutos={setProdutos} setTotal={setTotal} />
      <Produtos adicionaItem={adicionaItem} />
    </>
  );
}

export const TotalComponent = ({ total }) => {
  return <div>Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>;
};

export default App;
