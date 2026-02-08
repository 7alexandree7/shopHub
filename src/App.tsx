import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Auth from "./Pages/Auth/Auth";
import ErrorPage from "./Pages/Error/ErrorPage";
import NavBar from "./Components/NavBar/NavBar";
import "./App.css"
import AuthProvider from "./Context/AuthContext";

function App() {

  return (

    <AuthProvider>
      <div className="app">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/checkout"></Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
      </div>
    </AuthProvider>

  );
}

export default App;
