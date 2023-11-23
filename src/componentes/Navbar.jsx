import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import { TotalComponent } from '../App';
import Swal from 'sweetalert2'

function Navbar(props) {

    const [open, setOpen] = useState(false)

    function verCarrinho() {
        if(listaProdutos.length == 0){
           return ( Swal.fire({
                title: 'Erro!',
                text: 'Não há itens para vizualizar no carrinho',
                icon: 'error',
                confirmButtonText: 'Ok'
              }))
            
        }
        setOpen(true)
    }

    function removerItem(index) {
        const produtosAtualizados = [...props.produtos];
        const produtoRemovido = produtosAtualizados.splice(index, 1)[0];
        props.setProdutos(produtosAtualizados);
        props.setTotal(props.total - Number(produtoRemovido.preco));
        
      }

    const listaProdutos = props.produtos.map((produto, index) => (
        <tr key={index}>
          <td><img src={produto.foto} width={150} alt={produto.titulo} /></td>
          <td>{produto.titulo}</td>
          <td className='pink'>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
          <td>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-trash3-fill pink icon" viewBox="0 0 16 16" onClick={() => removerItem(index)}>
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                </svg>
            </td>
        </tr>

    ))

    return (
        <>
            <nav className="navbar">
                <div className="container-fluid">
                    <a className="navbar-brand ms-3" href="#"><img src="logo.png" alt="logotipo" width={120} /></a>

                    <ul className=" ms-auto mb-2 mb-lg-0 d-flex">
                        <li className='mx-2'>
                            <img src="Favorito White.png" width={30} alt="favoritos" />
                        </li>
                        <li className='mx-2'>
                            <button type="button" class="btn btn-light pink position-relative" onClick={verCarrinho}>
                                Ver carrinho <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
                                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                </svg>
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {props.produtos.length}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <Modal open={open} onClose={() => setOpen(false)} center>
                <h1 className='pink mt-5'>Resumo do pedido:</h1>

                <table className='table table-danger table-hover mt-4'>
                    <thead>
                        <tr>
                            <th>Foto</th>
                            <th>Produto</th>
                            <th>Preço R$</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        {listaProdutos}
                    </tbody>
                </table>

                <h4 className='pink'> <TotalComponent total={props.total} /> </h4>
                <p className='pink'>Ou 10x de R${(props.total / 10).toFixed(2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>

                <button className='text-light btn bg-pink'>Finalizar compra</button>
            </Modal>
        </>
    )
} export default Navbar