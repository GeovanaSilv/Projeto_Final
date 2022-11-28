import './Menu.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Menu(props){
    return(
        <nav className ='menu'>
       
  <Link to ="/menu">
      Menu
</Link>
<Link to ="/login">
      Login
</Link>
<Link to="/cadastro">
            Cadastrar Cardapio
           </Link>
        </nav>
    )
}