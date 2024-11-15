import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  Button,
  Box,
  TableBody,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Loader from "../UI/Loader/Loader";
import AlertaExito from "../UI/Alerts/AlertaExito";

function MainAdmin() {
  const [listaPolizas, setListaPolizas] = useState([]);

  const [listaPolizasInicial, setListaPolizasInicial] = useState([]);

  useEffect(() => {
    async function obtenerPolizas() {
      const response = await axios.get(
        "http://localhost:8080/api/polizas/byQuery",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setListaPolizas(response.data);

      setListaPolizasInicial(response.data);
    }

    obtenerPolizas();
  }, []);

  const redireccion = useNavigate();

  const crearPoliza = () => {
    redireccion("/admin/crearActualizarPoliza");
  };

  const actualizarPoliza = (idPoliza) => {
    redireccion(`/admin/crearActualizarPoliza/${idPoliza}?`);
  };

  const MySwal = withReactContent(Swal);

  const loader = Loader({ title: "Eliminando póliza...", timer: 13650 });

  const alertaExito = AlertaExito({
    title: "Eliminación realizada con éxito!",
  });

  const alertaEliminarPoliza = (codigoPoliza, idPoliza) => {
    Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    MySwal.fire({
      title: `Estas seguro de eliminar la Póliza ${codigoPoliza}?`,
      text: "No va a ser posible revertir la operación.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#0cae27",
      cancelButtonColor: "#fe5b5b",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarPoliza(idPoliza, codigoPoliza);
      }
    });
  };

  const eliminarPoliza = async (idPoliza, codigoPoliza) => {
    try {
      loader.loading();

      const response = await axios.delete(
        `http://localhost:8080/api/polizas/${idPoliza}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      alertaExito.alerta();

      setListaPolizas((prevLista) =>
        prevLista.filter((poliza) => poliza.codigoPoliza !== codigoPoliza)
      );

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const ordenarDatos = (atributo, sentido) => {
    const datosOrdenados = [...listaPolizas];

    datosOrdenados.sort((a, b) => {
      if (a[atributo] < b[atributo]) return sentido === "asc" ? -1 : 1;
      if (a[atributo] > b[atributo]) return sentido === "asc" ? 1 : -1;
      return 0;
    });

    if (atributo != null && sentido != null) {
      setListaPolizas(datosOrdenados);
    } else {
      setListaPolizas(listaPolizasInicial);
    }
  };

  return (
    <>
      <Grid container spacing={1}>
        <Grid item size={12}>
          <Typography variant="h4" color="initial" sx={{ textAlign: "center" }}>
            Has accedido como Administrador.
          </Typography>
        </Grid>

        <Grid item size={12}>
          <Typography
            variant="h6"
            color="#1976d2"
            sx={{ textAlign: "center", fontWeight: "bold" }}
          >
            Bienvenido {localStorage.getItem("username")}!
          </Typography>
        </Grid>

        <Grid item size={12}>
          <Grid container justifyContent="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0cae27", mt: 2 }}
              onClick={crearPoliza}
            >
              Agregar Poliza
            </Button>
          </Grid>
        </Grid>

        <Grid container flexDirection="row" alignItems="center" sx={{ p: 2 }}>
          <Grid container justifyContent="center">
            <Grid item size={12}>
              <Button
                variant="contained"
                onClick={() => ordenarDatos(null, null)}
                disabled={listaPolizas.length == 0}
                sx={{ backgroundColor: "#98d2f3" }}
              >
                Restablecer
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item size={12}>
              <Button
                variant="contained"
                onClick={() => ordenarDatos("codigoPoliza", "asc")}
                disabled={listaPolizas.length == 0}
                sx={{ backgroundColor: "#98d2f3" }}
              >
                Ordenar por codigo de poliza
              </Button>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item size={12}>
              <Button
                variant="contained"
                onClick={() => ordenarDatos("montoCobertura", "asc")}
                disabled={listaPolizas.length == 0}
                sx={{ backgroundColor: "#98d2f3" }}
              >
                Ordenar por monto
              </Button>
            </Grid>
          </Grid>
        </Grid>

        {listaPolizas.length > 0 ? (
          <Grid item size={12} sx={{ p: 1 }}>
            <TableContainer
              component={Paper}
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{
                    backgroundColor: "#1976d2",
                    borderRadius: "10px 10px 0 0",
                  }}
                >
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      ID
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Codigo de Póliza
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Fecha Emisión
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Fecha Vencimiento
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Monto Cobertura
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Cliente
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Tipos de Seguro
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Acciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaPolizas.map((poliza) => (
                    <TableRow key={poliza.codigoPoliza}>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "Bold",
                        }}
                      >
                        {poliza.id}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "Bold",
                        }}
                      >
                        {poliza.codigoPoliza}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(poliza.fechaEmision).toLocaleDateString(
                          "es-AR"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {new Date(poliza.fechaVencimiento).toLocaleDateString(
                          "es-AR"
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {poliza.montoCobertura.toLocaleString("es-ES")}
                      </TableCell>
                      <TableCell align="center">
                        {poliza.cliente.nombre + " " + poliza.cliente.apellido}
                      </TableCell>
                      <TableCell align="center">
                        <ul>
                          {poliza.tipoSeguro.map((seguro, key) => (
                            <li style={{ listStyle: "none" }} key={key}>
                              {seguro.tipoSeguro}
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#fe5b5b" }}
                            onClick={() =>
                              alertaEliminarPoliza(
                                poliza.codigoPoliza,
                                poliza.id
                              )
                            }
                          >
                            Eliminar Poliza
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ backgroundColor: "#fec35b" }}
                            onClick={() => actualizarPoliza(poliza.id)}
                          >
                            Actualizar Poliza
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Grid item size={12}>
            <Typography
              variant="h5"
              color="grey"
              sx={{ p: 10, fontWeight: "bold", textAlign: "center" }}
            >
              No hay Pólizas agregadas
            </Typography>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default MainAdmin;
