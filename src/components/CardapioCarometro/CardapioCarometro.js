import React, { Component } from "react";
import axios from 'axios';
import './CardapioCarometro.css';
import Main from '../template/Main';

const title = "Carometro";

const urlAPICardapio = "http://localhost:5205/Api/cardapio"
const initialState ={
  cardapio : {id:0, nome:'',porcoes:0,tipo:'', valor:'', descricao:''},
  lista:[],
  listaCarometro: []
}
export default class CardapioCarometro extends Component{

  state ={...initialState}
  componentDidMount(){
    axios(urlAPICardapio).then(resp =>{
      this.setState({lista:resp.data})
    })
  }

  getListaAtualizadaCardapio(evento){
    const tipo = evento.target.value
    const lista = this.state.lista.filter(a =>a.tipo == tipo);
     this.setState({listaCarometro: lista});
    this.setState({cardapio: this.state.cardapio})
  }
atualizaCampo(evento){
  const cardapio = {...this.state.cardapio};
  cardapio[evento.target.name] = evento.target.value;
  this.setState({cardapio});
} 


Select() {
  return (
      <div className="select ">
          <label>Selecione um curso</label>
         < select name="tipo" value ={this.state.tipo} onChange={e => { this.getListaAtualizadaCardapio(e) }}>
                  <option value="" >
                      Escolha um curso 
                      </option>                
              {this.state.lista.map((cardapio) =>

                  <option name="tipo"
                      value={cardapio.tipo}
                  >
                      {cardapio.nome}
                  </option> 
              )}
          </select>
      </div>
  )
}
MenuCards(){
  return (
          
    <div className="card2">
    
   {this.state.listaCarometro.map((cardapio) => 
      <div key={cardapio.id}className="cardInfo"  sx={{ minWidth: 300 }}>
      
      
      <span>Nome:   {cardapio.nome}</span>
      <span>Tipo : {cardapio.tipo}</span>
     <span>porcoes : {cardapio.porcoes}</span>
     <span>Descriçoes : {cardapio.descricao}</span>
     <span>Valor : {cardapio.valor}</span>
   
  </div >
    )}  
    </div>



)
}
render() {
  return (
      <Main title={title}>
          {this.Select()}
          {this.MenuCards()}
       
      </Main>
  )
}
}
//carometro
