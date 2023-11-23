import { dados } from "../../public/dados"
import React, { useEffect, useState } from 'react';
import CardProduto from "./CardProduto";

function Produtos(props) {
    const [produtos, setProdutos] = useState([])

    useEffect(() => {
        setProdutos(dados)
    }, [])

    const listaProdutos = produtos.map(produto => (
       <CardProduto key={produto.id} produto={produto} adicionaItem={props.adicionaItem}/>
    ))

    return (
        <div className="row">
            {listaProdutos}
        </div>
    )
} export default Produtos