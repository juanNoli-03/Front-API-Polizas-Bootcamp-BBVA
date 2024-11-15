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

function TiposDeSeguro() {
  const [tiposDeSeguro, setTiposDeSeguro] = useState([]);

  useEffect(() => {
    async function traerTiposSeguro() {
      const response = await axios.get(
        "http://localhost:8080/api/tiposSeguros",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      setTiposDeSeguro(response.data);
    }

    traerTiposSeguro();
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
            Tipos de Seguro
          </Typography>
        </Grid>

        {tiposDeSeguro.length > 0 ? (
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
                      Tipo Seguro
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Descripcion
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        color: "white",
                        fontWeight: "Bold",
                      }}
                    >
                      Valor
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tiposDeSeguro.map((tipo) => (
                    <TableRow key={tipo.id}>
                      <TableCell align="center" sx={{ fontWeight: "Bold" }}>
                        {tipo.id}
                      </TableCell>
                      <TableCell align="center">{tipo.tipoSeguro}</TableCell>
                      <TableCell align="center">{tipo.descripcion}</TableCell>
                      <TableCell align="center">
                        {tipo.valor.toLocaleString("es-ES")}
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
            No hay Tipos de Seguro agregados
          </Typography>
        )}
      </Grid>
    </>
  );
}

export default TiposDeSeguro;
