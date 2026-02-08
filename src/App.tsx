import "./App.css"
import { Route, Routes } from "react-router-dom";
import AuthProvider from "./Context/AuthContext";
import NavBar from "./Components/NavBar/NavBar";

import HomePage from "./Pages/Home/HomePage";
import Auth from "./Pages/Auth/Auth";
import ErrorPage from "./Pages/Error/ErrorPage";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Checkout from "./Pages/Checkout/Checkout";

function App() {

  return (

    <AuthProvider>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/checkout" element={<Checkout />}></Route>
          <Route path="/products/:id" element={<ProductDetails />}></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </AuthProvider>

  );
}

export default App;
