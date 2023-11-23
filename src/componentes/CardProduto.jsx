import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

function CardProduto(props) {
    const [open, setOpen] = useState(false);
    const [openAvaliacoes, setOpenAvaliacoes] = useState(false);
    const [preco, setPreco] = useState(0);
    const [title, setTitle] = useState("")
    const [imagem, setImagem] = useState("")
    const [status, setStatus] = useState("inativo")
    const {register, handleSubmit, reset} = useForm()
    const [listaAvaliacoes, setListaAvaliacoes] = useState([]);
    const [listaNomes, setListaNomes] = useState([])
    
    function onOpenModalDetalhes(titulo, valor, foto) {
        setOpen(true)
        setTitle(titulo)
        setPreco(valor)
        setImagem(foto)

        if (titulo == "Vestido Moletinho") {
            setStatus("ativo")
        }
    }
    

    function mudaFotoCor(caminho) {
        setImagem(caminho)
    }

    function mostrarAvaliacoes() {
        setOpen(false)
        setOpenAvaliacoes(true)

    }

    const onCloseModalDetalhes = () => setOpen(false);
    const onCloseModalAvaliacoes = () => setOpenAvaliacoes(false);
    

    function enviaDados(data) {

        const productId = props.produto.id;
    
        setListaAvaliacoes([...listaAvaliacoes, data.avaliacao])
        setListaNomes([...listaNomes, data.nome])
        reset({ nome: "", avaliacao: ""  });

    }

    const lista = listaNomes.map((nome, index) => (
        <div key={index} className='bg-pink p-4 row card_avaliacao'>
            <div className="col-md-2 text-light b">{nome}</div>
            <div className="col-md-8 ms-5 text-light">"{listaAvaliacoes[index]}"</div>
        </div>
    ));
    

    return (
        <div className="col-sm-12 col-md-4 d-flex justify-content-around">
            <div class="card mt-3 w-85 h-80">
                <img src={props.produto.foto} class="card-img-top icon" alt="capa do produto" onClick={() => onOpenModalDetalhes(props.produto.titulo, props.produto.preco, props.produto.foto)} />

                <Modal open={open} onClose={onCloseModalDetalhes} center>
                    <div className="row">
                        <div className="col-md-7 col-sm-12">
                            <img src={imagem} alt="foto do produto" width={400} className='mx-4' />

                        </div>

                        <div className="col-md-5">
                            <h1 className='mt-4'>{title}</h1>
                            <div className='d-flex justify-content-start'>
                                <button className='mx-2 pink tamanhos'>P</button>
                                <button className='mx-2 pink tamanhos'>M</button>
                                <button className='mx-2 pink tamanhos'>G</button>
                                <button className='mx-2 pink tamanhos'>GG</button>
                            </div>
                            <p onClick={mostrarAvaliacoes} className='icon pink mt-3'>Ver avaliações</p>
                            {status == "ativo" && (<div className='mt-3'>
                                <p>Selecione uma cor:</p>
                                <div id='circulo1' className="circulo icon" onClick={() => mudaFotoCor("vestido_rosa.jpg")}></div>
                                <div id='circulo2' className="circulo icon" onClick={() => mudaFotoCor("vestido_azul.jpg")}></div>
                                <div id='circulo3' className="circulo icon" onClick={() => mudaFotoCor("vestido_laranja.jpg")}></div>
                            </div>)}

                            <div className="mt-5">
                                <h6 className='pink'>{preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>
                                <div className="row">
                                    <div className="col-sm-9"> <button onClick={() => props.adicionaItem(props.produto.titulo, props.produto.preco, props.produto.foto)} className="text-light btn w-100 bg-pink">Adicionar ao carrinho</button></div>
                                    <div className="col-sm-2">  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-heart-fill pink my-2" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" /></svg></div>
                                </div>

                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal open={openAvaliacoes} onClose={onCloseModalAvaliacoes} center>
                    <form onSubmit={handleSubmit(enviaDados)} >
                        <h6 className='pink my-5'>Deixe a sua avaliação abaixo =)</h6>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label">Nome</label>
                            <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Digite o seu nome aqui"  {...register("nome")} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlTextarea1" className="form-label">Compartilhe a sua avaliação</label>
                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" {...register("avaliacao")}></textarea>
                            <button type='submit' className='btn text-light bg-pink mt-5'>Enviar</button>
                        </div>
                    </form>

                    {listaNomes.length > 0 && lista}
                </Modal>

        

                <div class="card-body p-4">

                    <div className="row">
                        <div className="col-sm-9">
                            <h5 class="card-title mb-3">{props.produto.titulo}</h5>
                        </div>

                        <div className="col-sm-2 icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-heart-fill pink my-2" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" /></svg>
                        </div>

                    </div>

                    <h6 className="pink">{props.produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h6>
                    <button onClick={() => props.adicionaItem(props.produto.titulo, props.produto.preco, props.produto.foto)} className="text-light btn bg-pink">Adicionar ao carrinho</button>
                </div>
            </div>
        </div>
    )
} export default CardProduto