import React, { Component } from "react";
import axios from 'axios';
import './CardapioCarometro.css';
import Main from '../template/Main';

const title = "Carometro";
const urlApiTipo = "http://localhost:5205/api/Tipo";
const urlAPICardapio = "http://localhost:5205/Api/cardapio"
const initialState ={
  cardapio: {id:0, nome:'', porcoes:0, valor:'',codTipo:0, nomeTipo:'',descricao:'' },
  tipoCar: {id:0, nomeTipo:'', codTipo:0 },
  lista:[],
  listaCarometro: [],
  listaTipo:[]
}
export default class CardapioCarometro extends Component{

  state ={...initialState}
  componentDidMount(){
    axios(urlAPICardapio).then(resp =>{
      this.setState({lista:resp.data})
    })
    axios(urlApiTipo).then(resp=>{
      this.setState({listaTipo:resp.data})
    })
  }

  getListaAtualizadaCardapio(evento){
    const codTipo = evento.target.value
    const lista = this.state.lista.filter(a =>a.codTipo == codTipo);
     this.setState({listaCarometro: lista});
     this.setState({tipoCar: this.state.tipoCar})
    this.setState({cardapio: this.state.cardapio})
  }
atualizaCampo(evento){
  const cardapio = {...this.state.cardapio};
  const tipoCar ={...this.state.tipoCar};
  tipoCar[evento.target.name] = evento.target.value;
  this.setState({cardapio});
  this.setState({tipoCar});
} 


Select() {
  return (
      <div className="select ">
          <label>Selecione um curso</label>
         < select name="codTipo" value ={this.state.codTipo} onChange={e => { this.getListaAtualizadaCardapio(e) }}>
                  <option value="" >
                       Escolha um Tipo
                      </option>                
              {this.state.listaTipo.map((tipoCar) =>

                  <option name="tipo"
                      value={tipoCar.codTipo}
                  >
                      {tipoCar.nomeTipo}
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
     <span>porcoes : {cardapio.porcoes}</span>
     <span>Tipo   :    {cardapio.codTipo}</span>
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
