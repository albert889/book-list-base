import './App.css';
import { BrowserRouter, BrowserRouter as Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login';
import Registrasi from './Components/Registrasi';
import ForgotPassword from './Components/ForgotPassword';
import AddProduct from './Components/AddProduct';
import EditProduct from "./Components/EditProduct";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={["/home", "/"]} exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/registrasi" component={Registrasi} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/add-product" component={AddProduct} />
        <Route path="/edit-product/:id" component={EditProduct} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
