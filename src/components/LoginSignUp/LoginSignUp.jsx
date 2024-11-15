import axios from "axios";
import { Typography, TextField, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import IosShareIcon from "@mui/icons-material/IosShare";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";
import AlertaExito from "../UI/Alerts/AlertaExito";

function LoginSignUp({ modo }) {
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });

  const [mensajeError, setMensajeError] = useState(" ");

  useEffect(() => {
    setUsuario({ username: "", password: "" });
  }, []);

  const redireccion = useNavigate();

  const alertaExito = AlertaExito({ title: "Te has registrado con exito!" });

  const formularioCompleto = (usuario) => {
    return Object.values(usuario).every(
      (valor) => valor !== null && valor !== undefined && valor !== ""
    );
  };

  const manejarEnvio = async () => {
    let response;

    if (modo == "login") {
      try {
        response = await axios.post(
          "http://localhost:8080/signIn",
          {},
          {
            headers: {
              username: usuario.username,
              password: usuario.password,
            },
          }
        );

        localStorage.setItem("token", response.data.token);

        localStorage.setItem("username", usuario.username);

        redireccion(`/admin/${localStorage.getItem("username")}`);
      } catch (e) {
        console.log(e);

        setMensajeError("Error! Las credenciales no son validas.");

        setUsuario({
          username: "",
          password: "",
        });
      }
    } else {
      try {
        response = await axios.post(
          "http://localhost:8080/signUp",
          {
            username: usuario.username,
            password: usuario.password,
            roles: "ADMIN",
          },
          {}
        );
        alertaExito.alerta();

        redireccion("/login");
      } catch (e) {
        console.log(e);
      }
      setUsuario({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: "20px",
      }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: "column",
          alignItems: "center",
          p: 5,
          width: "50%",
          borderRadius: "15px",
          backgroundColor: "white",
        }}
      >
        <Grid item size={4}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              textDecoration: "underline",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            {modo === "login" ? "Iniciar Sesión" : "Registrarse"}
          </Typography>
        </Grid>

        <Grid item size={4}>
          <Grid container sx={{ justifyContent: "center" }}>
            <TextField
              type="text"
              label="Nombre de Usuario"
              value={usuario.username}
              onChange={(e) =>
                setUsuario({ ...usuario, username: e.target.value })
              }
              size="small"
            />
          </Grid>
        </Grid>

        <Grid item size={4}>
          <Grid container sx={{ justifyContent: "center" }}>
            <TextField
              type="password"
              label="Contraseña"
              value={usuario.password}
              onChange={(e) =>
                setUsuario({ ...usuario, password: e.target.value })
              }
              size="small"
            />
          </Grid>
        </Grid>

        <Grid item size={4}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Button
              type="submit"
              disabled={!formularioCompleto(usuario)}
              variant="contained"
              endIcon={modo == "login" ? <LoginIcon /> : <IosShareIcon />}
              onClick={manejarEnvio}
            >
              {modo == "login" ? "Ingresar" : "Registrarse"}
            </Button>
          </Grid>
        </Grid>

        {mensajeError && modo != "signUp" && (
          <Typography variant="p" color="error">
            {mensajeError}
          </Typography>
        )}
      </Grid>
    </div>
  );
}

LoginSignUp.propTypes = {
  modo: PropTypes.string.isRequired,
};

export default LoginSignUp;
