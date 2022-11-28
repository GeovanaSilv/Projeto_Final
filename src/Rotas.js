import React from "react";
import {Routes, Route} from "react-router-dom";
 
import Main from './components/template/Main';
import CardapioCarometro from './components/CardapioCarometro/CardapioCarometro';
import Comida from './components/Comida/Comida';
import CadastroCardapio from "./components/CadastroCardapio/CadastroCardapio";


export default function Rotas(){
return(
    <Routes>
        <Route exact path="/"
         element={
            <Main title ="Bem vindo!">
             <div>Tela de Cadastro de Menu  </div>
            </Main>}
        />
        <Route path="/menu"element={<CardapioCarometro/>}/>
        <Route path ='*' element={
                <Main title="Cadastro de Alunos!">
                    <div>Cardapio</div>
                </Main>}
                />
    <Route path="/login" element={<Comida/>}/>
    <Route path ='*' element={
                <Main title="Comida">
                    <div>Pagina em comida</div>
                </Main>}
                />
                 <Route path="/Cadastro" element={<CadastroCardapio/>}/>
    
    </Routes>
)
}