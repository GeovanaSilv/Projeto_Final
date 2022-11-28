import './Menu.css';
import React,{useEffect,useState} from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';

export default function Menu(props){
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
        setCurrentUser(user);
        }
        }, []);
        
        
    return(
        <nav className ='menu'>
       
  <Link to ="/menu">
      Menu
</Link>
<Link to ="#">
        desativada
</Link>
<Link to="/cadastro">
            Cadastrar Cardapio
           </Link>
           {currentUser ? (
<Link to="/logout">
Logout
</Link>
) : (
<Link to="/login">
      Login  
</Link>
)}  
        
        
        </nav>


    )
}