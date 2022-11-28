import React, { Component } from "react";
import axios from 'axios';
import './Comida.css';
import Main from '../template/Main';
const title = "Comida";

const urlAPI = "http://localhost:5205/Api/Login"

export default class CardapioCarometro extends Component{
renderForm (){
    return (
  <section>
    <div class  ="form-container">
      <div class ="controls">
        <label for ="nome">Nome</label>
        <input type="text" name ="nome" id ="nome"/>
      </div>
      <div class = "control">
      <label for = "senha">Senha</label>
      <input type = "senha" name = "senha" id= "senha"/>
      </div> 
  <input type= "submit" value ="login"/>
    </div>
  </section>
    )

  }
  render(){
    return(
        <Main title ={title}>
        {this.renderForm()}
        </Main>
    )
  }
}