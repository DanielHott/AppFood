import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import RecipesAppProvider from './context/RecipesAppProvider';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import DetalhesBebidas from './pages/DetalhesBebidas';
import DetalhesComidas from './pages/DetalhesComidas';  
import Perfil from './pages/Perfil';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import ExplorarSugestoes from './pages/ExplorarSugestoes';
import ComidasEmProgresso from './pages/ComidasEmProgresso';
import BebidasEmProgresso from './pages/BebidasEmProgresso';
import ReceitasFeitas from './pages/ReceitasFeitas';

function App() {
  return (
    <RecipesAppProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/perfil" component={Perfil} />
            <Route exact path="/comidas" component={Comidas} />
            <Route exact path="/comidas/:id" component={DetalhesComidas} />
            <Route
              path="/comidas/:dishId/in-progress"
              component={ComidasEmProgresso}
            />
            <Route exact path="/bebidas" component={Bebidas} />
            <Route exact path="/bebidas/:id" component={DetalhesBebidas} />
            <Route
              path="/bebidas/:drinkId/in-progress"
              component={BebidasEmProgresso}
            />
            <Route exact path="/explorar" component={Explorar} />
            <Route path="/explorar/:id" component={ExplorarSugestoes} />
            <Route exact path="/receitas-feitas" component={ReceitasFeitas} />
          </Switch>
        </Router>
    </RecipesAppProvider>
  );
}

export default App;
