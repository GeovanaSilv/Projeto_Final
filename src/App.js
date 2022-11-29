import './App.css';

import Menu from './components/template/Menu';
import Footer from './components/template/Footer'
import Rotas from './Rotas';
import CardapioCarometro from './components/CardapioCarometro/CardapioCarometro';


import { BrowserRouter } from 'react-router-dom';

export default function App(){
  return(
    <BrowserRouter>
      <div className="App">

        <Menu />

        <Rotas />
       <Footer />
</div>
    </BrowserRouter>
  )
}