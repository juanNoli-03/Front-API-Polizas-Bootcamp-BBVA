import Swal from "sweetalert2";

const AlertaExito = ({ title }) => {
  const alerta = () => {
    Swal.fire({
      icon: "success",
      title: title,
      showConfirmButton: true,
      confirmButtonColor: "#1976d2",
    });
  };

  return { alerta };
};

export default AlertaExito;
