import { temaPersonalizado } from "./temaPersonalizado";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import LoginSignUp from "./components/LoginSignUp/LoginSignUp";
import HomeAdmin from "./components/HomeAdmin/HomeAdmin";
import FormPoliza from "./components/FormPoliza/FormPoliza";
import Header from "./components/UI/Header/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Clientes from "./components/ClientesYtiposSeguro/Clientes";
import TiposDeSeguro from "./components/ClientesYtiposSeguro/TiposDeSeguro";

function App() {
  return (
    <ThemeProvider theme={temaPersonalizado}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginSignUp modo="login" />} />
            <Route path="/signUp" element={<LoginSignUp modo="signUp" />} />
            <Route path="/admin/:username" element={<HomeAdmin />} />
            <Route
              path="/admin/crearActualizarPoliza/:idPoliza?"
              element={<FormPoliza />}
            />
            <Route path="/admin/clientes" element={<Clientes />} />
            <Route path="/admin/tiposDeSeguro" element={<TiposDeSeguro />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
