import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Loader = ({ title, timer = 12500 }) => {
  const loading = () => {
    let timerInterval;
    MySwal.fire({
      title: title,
      timer: timer,
      timerProgressBar: true,
      allowOutsideClick: false,
      didOpen: () => {
        MySwal.showLoading();
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    });
  };

  return { loading };
};

export default Loader;
