import Home from './components/Home'
import './App.css';
import { HashRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import Dellme_Restaurant from './components/Dellme_Restaurant';
import Dan_Jelly_Restaurant from './components/Dan_Jelly_Restaurant';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import Register from './components/User_Components/Register';
import Login from './components/User_Components/Login';
import Order_History from './components/Order_History';
import Show_Order_Details from './components/Show_Order_Details';



function App() {
  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dellme" element={<Dellme_Restaurant />} />
          <Route path="/danjelly" element={<Dan_Jelly_Restaurant />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order_history" element={<Order_History />} />
          <Route path="/order_details" element={<Show_Order_Details />} />
        </Routes>
    </div>
  );
}

export default App;