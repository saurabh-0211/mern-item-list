import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavbar from './components/appnavbar.js';
import ShoppingList from './components/shoppinglist';
import ItemModal from './components/itemModal';
import { Container } from 'reactstrap';
import store from './store';
import { useEffect } from 'react';
import { loadUser } from './actions/authActions';


function App() {

  useEffect( () => {
    store.dispatch(loadUser());
  }, [] )
  
  return (
    
    <div className="App">
      <AppNavbar />
      <Container>
      <ItemModal />
      <ShoppingList />
      </Container>
    </div>
  );
}

export default App;
