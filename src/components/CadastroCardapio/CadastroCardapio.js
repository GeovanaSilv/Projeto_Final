import React, { Component } from "react";
import UserService from "../../Services/UserService";
import Main from "../template/Main";
import './CadastroCardapio.css';
import axios from 'axios';
//import { ErrorResponse } from "@remix-run/router";

const title = "Cadastrar Cardapio";
const urlApiMenu = "http://localhost:5205/api/cardapio";
const urlApiTipo = "http://localhost:5205/api/Tipo";
const initialState = {
    cardapio: {id:0, nome:'', porcoes:0, valor:'', nomeTipo:'', codTipo:0,descricao:'' },
    lista: [],
    listaTipo:[],
    mens:null
}

const  user = JSON.parse(localStorage.getItem("user"))


export default class CadastroCardapio extends Component {
    state = {...initialState}

componentDidMount(){
 UserService.getCardapioBoard().then(
   ( response) =>{
    this.setState({lista:response.data})
   },
   (error) =>{
    const _mens =
    (error.response &&
        error.response.data &&
        error.response.data.message) ||
    error.message ||
    error.toString()
this.setState({mens: _mens})
console.log('_mens: ' + _mens)
 
    }
 )

 UserService.getCardapioBoard().then(
    ( response) =>{
     this.setState({listaTipo:response.data})
    },
    (error) =>{
     const _mens =
     (error.response &&
         error.response.data &&
         error.response.data.message) ||
     error.message ||
     error.toString()
 this.setState({mens: _mens})
 console.log('_mens: ' + _mens)
  
     }
  )




}

 

            



    /*    axios(urlApiMenu).then(resp => {
          this.setState({lista: resp.data})
        })
        */
     /*  axios(urlApiMenu,{headers:{Authorization:'Bearer' + user.token}})
              .then(resp =>{
                this.setState({lista:resp.data});

              }, 
              (error) => {
                const _mens = (error.response &&
                     error.response.data &&
                     error.response.data.message) ||
                     error.message || error.toString();
                     this.setState({mens : _mens})
              }
              )          
 

        axios(urlApiTipo).then(resp =>{
            this.setState({listaTipo: resp.data})
        })
    }
    */
    
    limpar(){
        this.setState({cardapio: initialState.cardapio});
    }

    salvar(){
        const cardapio = this.state.cardapio;
        cardapio.porcoes = Number(cardapio.porcoes);
        const metodo = cardapio.id? 'put' : 'post';
        const url = cardapio.id? `${urlApiMenu}/${cardapio.id}` : urlApiMenu;

        axios[metodo](url, cardapio)
            .then(resp => {
                const lista = this.getListaAtualizada(resp.data)
                this.setState({cardapio: initialState.cardapio, lista})
            })

    }

    getListaAtualizada(cardapio, add = true){
        const lista = this.state.lista.filter(a => a.id !== cardapio.id);
       if(add) lista.unshift(cardapio);
        return lista;
    }

    atualizaCampo(evento) {
        const cardapio = {...this.state.cardapio };
        cardapio[evento.target.name] = evento.target.value;
        this.setState({ cardapio }); 
    }

    carregar(cardapio){
        this.setState({cardapio})
    
    }
    remover(cardapio)
    {
        const url = urlApiMenu + "/" + cardapio.id
        if (window.confirm("Confirma remoção do cardapio: " + cardapio.nome)) {
            console.log("entrou no confirm");
            axios['delete'](url, cardapio)
            .then(resp => {
            const lista = this.getListaAtualizada(cardapio, false)
            this.setState({ cardapio: initialState.cardapio, lista })
            })
        }
    }
    formulario() {
        return (
        <div className="inclui-container">
        <label> Nome: </label>
        <input
        type="text"
        id="nome"
        placeholder="Nome da comida"
        className="form-input"
        name="nome"
        
        value={this.state.cardapio.nome}
        
        onChange={ e => this.atualizaCampo(e)}
        />

        <label> porçoes: </label>
        <input
        type="number"
        id="porcoes"
        placeholder="Quantidade Que rende "
        className="form-input"
        name="porcoes"
        
        value={this.state.cardapio.porcoes}
        onChange={ e => this.atualizaCampo(e)}
        />
         <label>Tipo : </label>
               < select name = "codTipo" onChange={e=>{this.atualizaCampo(e)}}>
                <option value="">
                    Escolha um Tipo
                </option>

                    {this.state.listaTipo.map((tipoCar)=>
                   
               <option name = "codTipo"
                   value={tipoCar.codTipo}
               >
                {tipoCar.nomeTipo}
                </option> 
                    )}
                 </select>
   


        <label> Valor: </label>
        <input
        type="text"
        id="valor"
        placeholder="valor da comida"
        className="form-input"
        name="valor"
        
        value={this.state.cardapio.valor}
        onChange={ e => this.atualizaCampo(e)}
        />

        <label> Descrição: </label>
        <input
        type="text"
        id="descricao"
        placeholder="Descrição da comida"
        className="form-input"
        name="descricao"
        
        value={this.state.cardapio.descricao}
        
        onChange={ e => this.atualizaCampo(e)}
        />
 

        <button className="btnSalvar"
            onClick={e => this.salvar(e)} >
                Salvar
        </button>

        <button className="btnCancelar"
            onClick={e => this.limpar(e)} >
                Cancelar
        </button>
        </div>
    )
}

    tabela(){
        return(
        <div className="listagem">
            <table className="listamenu" id="tblListaMenu">
                <thead>
                    <tr className="cabecTabela">
                        <th className="tbtituloN">Comida</th>
                        <th className="tbtituloP">Porçoes</th>
                        <th className="tbtituloT">Tipo</th>
                        <th className="tbtituloV">Valor</th>
                        <th className="tbtituloD">Descrição</th>
                    </tr>
                </thead>

                <tbody>
                    
                    {this.state.lista.map(
                        (cardapio) => 
                            <tr key={cardapio.id}>
                                <td>{cardapio.nome}</td>
                                <td>{cardapio.porcoes}</td>
                                <td>{cardapio.codTipo}</td>
                                <td>{cardapio.valor}</td>
                                <td>{cardapio.descricao}</td>
                                <td>
                                <button onClick={() => this.carregar(cardapio)} >
                                    Altera
                                </button>
                                </td>
                                <td>
                                <button onClick={() => this.remover(cardapio)} >
                                    Remove
                                </button>
                                </td>
                            </tr>
                    )}
                </tbody>
            </table>
        </div>
        )
    }

    render(){
        return(
        <Main title={title}>
         {
           
            (this.state.mens != null) ? 'Erro' :
            <>
           
            {this.formulario()}
            {this.tabela()}
            </>
         }
        </Main>
        )
    }
}