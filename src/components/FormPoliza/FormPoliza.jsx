import axios from "axios";
import { useState, useEffect } from "react";
import { NumericFormat } from "react-number-format";
import IosShareIcon from "@mui/icons-material/IosShare";
import {
  Typography,
  MenuItem,
  Select,
  TextField,
  Button,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Loader from "../UI/Loader/Loader";
import AlertaExito from "../UI/Alerts/AlertaExito";
import { useParams } from "react-router-dom";

function FormPoliza() {
  const { idPoliza } = useParams();

  const [poliza, setPoliza] = useState({
    codigoPoliza: "",
    fechaEmision: " ",
    fechaVencimiento: " ",
    montoCobertura: "",
    idCliente: "",
    idTiposSeguros: [],
  });

  const [tiposDeSeguro, setTiposDeSeguro] = useState([]);

  const [listaClientes, setClientes] = useState([]);

  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (idPoliza) {
      async function traerPoliza() {
        const response = await axios.get(
          `http://localhost:8080/api/polizas/${idPoliza}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setPoliza({
          codigoPoliza: response.data.codigoPoliza,
          fechaEmision: response.data.fechaEmision,
          fechaVencimiento: response.data.fechaVencimiento,
          montoCobertura: response.data.montoCobertura,
          idCliente: response.data.cliente.id,
          idTiposSeguros: response.data.tipoSeguro.map((tipo) => tipo.id),
        });
      }

      traerPoliza();
    }
  }, [idPoliza]);

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

  useEffect(() => {
    async function traerTiposDeSeguro() {
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

    traerTiposDeSeguro();
  }, []);

  const formularioCompleto = (poliza) => {
    return Object.values(poliza).every((value) => {
      if (Array.isArray(value)) {
        return value.length > 0;
      } else if (typeof value === "string") {
        return value.trim() !== "" && value !== null;
      } else {
        return value !== null && value !== undefined;
      }
    });
  };

  const presenciaDeErrores = Object.values(errores).some(
    (valor) => valor != null
  );

  const validarCampo = (campo, valor) => {
    const patron = /^#\d{3}$/;

    if (campo === "codigoPoliza" && !patron.test(valor)) {
      setErrores((errores) => ({
        ...errores,
        codigoPoliza:
          "El Codigo de Póliza debe ser obligatoriamente de 4 caracteres. # al inicio y 3 numeros luego.",
      }));
    } else {
      setErrores((errores) => ({
        ...errores,
        codigoPoliza: null,
      }));
    }

    if (campo === "fechaVencimiento") {
      const fechaEmision = new Date(poliza.fechaEmision);

      const fechaVencimiento = new Date(valor);

      if (fechaVencimiento <= fechaEmision) {
        setErrores((errores) => ({
          ...errores,
          fechaVencimiento:
            "La Fecha de Vencimiento debe ser obligatoriamente posterior a la de emisión.",
        }));
      } else {
        setErrores((errores) => ({
          ...errores,
          fechaVencimiento: null,
        }));
      }
    }

    if (campo === "montoCobertura") {
      const montoCobertura = parseFloat(
        valor.replace(/\./g, "").replace(",", ".")
      );

      if (montoCobertura < 100000) {
        setErrores((errores) => ({
          ...errores,
          montoCobertura:
            "El monto de cobertura debe ser obligatoriamente mayor o igual a 150.000.",
        }));
      } else {
        setErrores((errores) => ({
          ...errores,
          montoCobertura: null,
        }));
      }
    }
  };

  const selectProps = {
    PaperProps: {
      style: {
        maxHeight: 6 * 15 + 20,
        width: 100,
      },
    },
  };

  const loader = Loader({
    title: idPoliza ? "Actualizando Póliza..." : "Creando Póliza...",
    timer: 14800,
  });

  const alertaExito = AlertaExito({
    title: idPoliza
      ? "Póliza actualizada con éxito!"
      : "Póliza creada con éxito!",
  });

  const guardarPoliza = async (e) => {
    e.preventDefault();

    try {
      loader.loading();

      let response;

      if (idPoliza) {
        response = await axios.put(
          `http://localhost:8080/api/polizas/${idPoliza}?idCliente=${
            poliza.idCliente
          }&tiposSeguros=${poliza.idTiposSeguros.join(",")}`,
          {
            codigoPoliza: poliza.codigoPoliza,
            fechaEmision: poliza.fechaEmision,
            fechaVencimiento: poliza.fechaVencimiento,
            montoCobertura: poliza.montoCobertura,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      } else {
        response = await axios.post(
          `http://localhost:8080/api/polizas?idCliente=${
            poliza.idCliente
          }&tiposSeguros=${poliza.idTiposSeguros.join(",")}`,
          {
            codigoPoliza: poliza.codigoPoliza,
            fechaEmision: poliza.fechaEmision,
            fechaVencimiento: poliza.fechaVencimiento,
            montoCobertura: poliza.montoCobertura,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      }

      alertaExito.alerta();

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }

    setPoliza({
      codigoPoliza: " ",
      fechaEmision: " ",
      fechaVencimiento: " ",
      montoCobertura: " ",
      idCliente: " ",
      idTiposSeguros: [],
    });
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Grid
        container
        spacing={3}
        sx={{
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "15px",
          backgroundColor: "white",
          width: "50%",
          p: 2,
        }}
      >
        <Typography
          variant="h6"
          color="primary"
          textAlign="center"
          sx={{ pb: 1, fontWeight: "bold", textDecoration: "underline" }}
        >
          {idPoliza ? "Actualización de Póliza" : "Crear una nueva Póliza"}
        </Typography>

        <Grid item size={4}>
          <TextField
            sx={{ width: "100%" }}
            type="text"
            label="Codigo Póliza"
            name="codigoPoliza"
            value={poliza.codigoPoliza || "#"}
            error={Boolean(errores.codigoPoliza)}
            helperText={errores.codigoPoliza}
            onChange={(e) =>
              setPoliza({ ...poliza, codigoPoliza: e.target.value })
            }
            onBlur={(e) => validarCampo("codigoPoliza", e.target.value)}
            size="small"
          />
        </Grid>

        <Grid item size={4}>
          <TextField
            sx={{ width: "100%" }}
            type="date"
            label="Fecha de Emisión"
            value={poliza.fechaEmision || null}
            onChange={(e) =>
              setPoliza({ ...poliza, fechaEmision: e.target.value })
            }
            size="small"
          />
        </Grid>

        <Grid item size={4}>
          <TextField
            sx={{ width: "100%" }}
            type="date"
            label="Fecha de Vencimiento"
            value={poliza.fechaVencimiento}
            error={Boolean(errores.fechaVencimiento)}
            helperText={errores.fechaVencimiento}
            onChange={(e) =>
              setPoliza({ ...poliza, fechaVencimiento: e.target.value })
            }
            onBlur={(e) => validarCampo("fechaVencimiento", e.target.value)}
            size="small"
          />
        </Grid>

        <Grid item size={4}>
          <NumericFormat
            sx={{ width: "100%" }}
            thousandSeparator="."
            customInput={TextField}
            label="Monto Cobertura"
            decimalSeparator=","
            decimalScale={0}
            fixedDecimalScale
            allowNegative={false}
            displayType="input"
            value={poliza.montoCobertura}
            error={Boolean(errores.montoCobertura)}
            helperText={errores.montoCobertura}
            onValueChange={(values) => {
              const { value } = values;
              setPoliza({ ...poliza, montoCobertura: value });
            }}
            onBlur={(e) => validarCampo("montoCobertura", e.target.value)}
            size="small"
          />
        </Grid>

        <Grid item size={4}>
          <Grid container sx={{ flexDirection: "column" }}>
            <FormControl>
              <InputLabel>Cliente</InputLabel>
              <Select
                value={poliza.idCliente}
                label="Cliente"
                onChange={(e) =>
                  setPoliza({ ...poliza, idCliente: e.target.value })
                }
                MenuProps={selectProps}
              >
                {listaClientes.map((cliente) => (
                  <MenuItem key={cliente.id} value={cliente.id}>
                    {cliente.id} - {cliente.nombre} {cliente.apellido}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item size={4}>
          <Grid container sx={{ flexDirection: "column" }}>
            <FormControl>
              <InputLabel>Tipo de Seguro</InputLabel>
              <Select
                multiple
                value={poliza.idTiposSeguros}
                label="Tipo de Seguro"
                onChange={(e) => {
                  const {
                    target: { value },
                  } = e;
                  setPoliza({ ...poliza, idTiposSeguros: value });
                }}
                MenuProps={selectProps}
                sx={{ maxWidth: "230px" }}
              >
                {tiposDeSeguro.map((tipoSeguro) => (
                  <MenuItem key={tipoSeguro.id} value={tipoSeguro.id}>
                    {tipoSeguro.descripcion}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid item size={4}>
          <Grid container sx={{ justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              disabled={!formularioCompleto(poliza) || presenciaDeErrores}
              endIcon={<IosShareIcon />}
              sx={{ backgroundColor: idPoliza ? "#fec35b" : "#0cae27" }}
              onClick={guardarPoliza}
            >
              {idPoliza ? "Actualizar Póliza" : "Crear Póliza"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default FormPoliza;
