import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home/HomePage";
import Auth from "./Pages/Auth/Auth";
import ErrorPage from "./Pages/Error/ErrorPage";

function App() {

  return (

    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/checkout"></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </div>

  );
}

export default App;
