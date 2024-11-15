import { Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";

function Header() {
  const login = location.pathname === "/login";
  const signUp = location.pathname === "/signUp";
  const admin = location.pathname.startsWith("/admin/");

  const redireccion = useNavigate();

  const toLogin = () => {
    redireccion("/login");
  };

  const toSignUp = () => {
    redireccion("/signUp");
  };

  const homeAdmin = () => {
    redireccion(`/admin/${localStorage.getItem("username")}`);
  };

  const clientes = () => {
    redireccion("/admin/clientes");
  };

  const tiposDeSeguro = () => {
    redireccion("/admin/tiposDeSeguro");
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        sx={{
          alignItems: "center",
          textAlign: "center",
          mb: 3,
          backgroundColor: "#1976d2",
          WebkitBoxShadow: "0px 3px 1px 0px rgba(201,201,201,1)",
          MozBoxShadow: "0px 3px 1px 0px rgba(201,201,201,1)",
          boxShadow: "0px 3px 1px 0px rgba(201,201,201,1)",
        }}
      >
        <Grid item size={3} sx={{ p: 2 }}>
          <Typography
            variant="h5"
            color="white"
            sx={{ display: "flex", alignItems: "center", fontWeight: "bold" }}
          >
            <img
              src="/assets/poliza-de-seguros.png"
              alt=""
              style={{ height: "40px", padding: "3px" }}
            />
            TuPóliza
          </Typography>
        </Grid>

        {signUp && (
          <>
            <Grid item size={7}></Grid>

            <Grid item size={2}>
              <Grid
                container
                sx={{ flexDirection: "row", alignItems: "center" }}
              >
                <ArrowBackIcon sx={{ fontSize: "35px", color: "white" }} />
                <Typography
                  color="white"
                  sx={{
                    cursor: "pointer",
                    ml: 1,
                    "&:hover": { fontWeight: "bold" },
                  }}
                  onClick={toLogin}
                >
                  Iniciar Sesión
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {login && (
          <>
            <Grid item size={7}></Grid>

            <Grid item size={2}>
              <Grid
                container
                sx={{ flexDirection: "row", alignItems: "center" }}
              >
                <AssignmentIcon sx={{ fontSize: "35px", color: "white" }} />
                <Typography
                  color="white"
                  sx={{
                    cursor: "pointer",
                    ml: 1,
                    "&:hover": { fontWeight: "bold" },
                  }}
                  onClick={toSignUp}
                >
                  Registrarse
                </Typography>
              </Grid>
            </Grid>
          </>
        )}

        {admin && (
          <>
            <Grid item size={2}>
              <Typography
                color="white"
                sx={{ cursor: "pointer", "&:hover": { fontWeight: "bold" } }}
                onClick={homeAdmin}
              >
                Inicio
              </Typography>
            </Grid>
            <Grid item size={2}>
              <Typography
                color="white"
                sx={{ cursor: "pointer", "&:hover": { fontWeight: "bold" } }}
                onClick={clientes}
              >
                Clientes
              </Typography>
            </Grid>
            <Grid item size={2}>
              <Typography
                color="white"
                sx={{ cursor: "pointer", "&:hover": { fontWeight: "bold" } }}
                onClick={tiposDeSeguro}
              >
                Tipos de Seguro
              </Typography>
            </Grid>

            <Grid item size={1}></Grid>

            <Grid item size={2}>
              <Grid
                container
                sx={{ flexDirection: "row", alignItems: "center" }}
              >
                <LogoutIcon
                  sx={{ fontSize: "35px", cursor: "pointer", color: "white" }}
                  onClick={toLogin}
                />
                <Typography
                  color="white"
                  sx={{
                    cursor: "pointer",
                    ml: 1,
                    "&:hover": { fontWeight: "bold" },
                  }}
                  onClick={toLogin}
                >
                  Cerrar Sesión
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>

      <Outlet />
    </>
  );
}

export default Header;
