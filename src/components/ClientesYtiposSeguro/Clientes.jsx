import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";

function Clientes() {
  const [listaClientes, setClientes] = useState([]);

  useEffect(() => {
    async function traerClientes() {
      const response = await axios.get("http://localhost:8080/api/clientes", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      setClientes(response.data);
    }

    traerClientes();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item size={6}>
          <Typography
            variant="h5"
            color="primary"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              textDecoration: "underline",
            }}
          >
            Clientes
          </Typography>
        </Grid>

        {listaClientes.length > 0 ? (
          <Grid item size={12} sx={{ p: 2 }}>
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
                      Nombre Completo
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      DNI
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Email
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Telefono
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Fecha Alta
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listaClientes.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell
                        align="center"
                        sx={{
                          fontWeight: "Bold",
                        }}
                      >
                        {cliente.id}
                      </TableCell>
                      <TableCell align="center">
                        {cliente.nombre + " " + cliente.apellido}
                      </TableCell>
                      <TableCell align="center">{cliente.dni}</TableCell>
                      <TableCell align="center">{cliente.email}</TableCell>
                      <TableCell align="center">{cliente.telefono}</TableCell>
                      <TableCell align="center">
                        {new Date(cliente.fechaAlta).toLocaleDateString(
                          "es-AR"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ) : (
          <Typography
            variant="body1"
            color="red"
            sx={{ p: 5, fontWeight: "bold" }}
          >
            No hay Clientes agregados
          </Typography>
        )}
      </Grid>
    </>
  );
}

export default Clientes;
