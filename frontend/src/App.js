import './App.css';
import AddProduct from './component/AddProduct';
import Home from './component/Home';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/add-product' element={<AddProduct />} />
      </Routes>
    </div>
  );
}

export default App;
