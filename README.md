<div id="user-content-toc">
  <ul align="center">
    <summary><h1 style="display: inline-block">Front con React para API REST Polizas de Seguros --- Bootcamp BBVA</h1></summary>
  </ul>
</div>

----

**Frontend:**

El Frontend de este proyecto integrador tendrá el objetivo de crear una
interfaz amigable y altamente funcional que permita a la empresa SegurAl
acceder y gestionar de manera eficiente toda la información que necesita
para optimizar sus operaciones.
El diseño e implementación deberá ser con miras a una interfaz intuitiva que
muestre al usuario diversas opciones de menú, en correspondencia con las
operaciones desarrolladas en el Backend.
Con esta sección de Frontend, buscamos proporcionar a SegurAl una
herramienta digital, eficaz y moderna que simplifique y agilice su flujo de
trabajo, asegurando una gestión eficiente de la información y un control
integral del delivery de sus servicios por proyecto.

----

**Consigna:** 

**1.** Crear una interfaz adecuada para exponer toda la información que la
empresa solicita.

**2.** La aplicación deberá contener una Header (appBar) con el nombre de
la empresa y las diferentes opciones de menú para realizar cada una
de las operaciones que permite nuestro backend.

**3.** Para realizar cualquier tipo de operación el usuario deberá estar
logueado en el sistema. Para ello se deberá disponer de una pantalla
de login.

  ➜ 📄 Formularios de creación: deberá realizar la validación de los
  campos (mandatoriedad y formato) y al realizar submit enviar
  la petición al controlador.

  ➜ 📝 Formularios de edición: Deberá recibir el identificador y
  mostrar un formulario que permita editarlo. En el caso de que
  no exista, mostrar un mensaje de error. Al hacer el submit, debe
  realizarse la petición al controlador correspondiente. Dentro del
  formulario de edición, debemos tener la opción que nos permita
  eliminar el registro.

**4.** Crear nueva póliza de seguro:** Los usuarios podrán completar un
formulario para ingresar los detalles de la nueva póliza, como:
|
  ● Tipo de seguro (auto, inmueble, celular)

  ● Fecha de inicio y vencimiento
  
  ● Monto asegurado

  ● Detalles adicionales según el tipo de seguro

Al enviar la solicitud, se generará automáticamente un mensaje de
éxito o error que será visualizado al cliente con los detalles de la póliza
y al equipo correspondiente de la empresa de seguros.

**5. Consultar pólizas de seguro:** Se mostrará una lista de las pólizas de
seguro existentes, con información detallada sobre cada una,
incluyendo tipo de seguro, fecha de inicio y vencimiento, monto
asegurado, etc. Los usuarios podrán filtrar y ordenar la lista según sus
necesidades.


**6. Actualizar póliza de seguro:** Los usuarios podrán editar los detalles
de una póliza de seguro existente, como la fecha de inicio y
vencimiento, el monto asegurado, etc. Luego de realizar los cambios
deseados, podrán enviar la solicitud para actualizar la póliza.


**7. Eliminar póliza de seguro:** Se proporcionará la opción para que los
usuarios eliminen una póliza de seguro existente de forma segura. Se
mostrará una confirmación antes de realizar la eliminación.

**8. Login de usuario** (mediante su código de usuario y contraseña).
Dentro del formulario de login.

----

**⚙️Requerimientos técnicos:**
  
  Se requiere cumplir con los siguientes aspectos técnicos para el desarrollo:

  **✓ Lenguaje de Programación & Framework:** Emplear VisteJS usando
  React.js como framework de desarrollo para el frontend. React.js
  permite construir interfaces de usuario interactivas y reactivas de
  manera eficiente.
  
  **✓ Componentes:** Dividir la interfaz de usuario en componentes
  reutilizables. Cada componente será responsable de una parte
  específica de la interfaz, como formularios, listas, etc.

**✓ Manejo de Estado:** Utilizar los hooks de React, como useState y
  useEffect, para manejar la información dinámica de la aplicación y
  mantener la coherencia del estado.

  **✓ Axios:** Utilizar Axios para realizar solicitudes HTTP a la API del
  backend.

  **✓ Material-UI (MUI):** Implementar MUI para gestionar los componentes
  de la interfaz de manera estilizada y profesional.

  **✓ Redux Toolkit:** Implementar Redux para gestionar el estado global de
  la aplicación, lo que permitirá manejar el estado de forma predecible y
  centralizada.

  **✓ React Router:** Utilizar React Router para gestionar la navegación
  entre diferentes vistas de la aplicación.

----

**🎁Bonus:**
  
  ★ Si bien no es obligatorio, será un plus agregar aspectos relacionados
  al diseño y la interfaz de usuario:
  
  ↳ Integrar un sistema de autenticación para permitir que los
  usuarios accedan a las funcionalidades de la aplicación de
  manera segura. Se puede considerar el uso de JSON Web
  Tokens (JWT) para la autenticación.

  ↳ Utilizar CSS aparte de MUI para el estilo y la presentación de la
  interfaz de usuario.

  ↳ Se pueden considerar bibliotecas de estilos como Material-UI
  para facilitar el desarrollo y mejorar la apariencia.

  ↳ Utilizar bibliotecas como Formik o React Hook Form para la
  gestión de formularios. Estas bibliotecas simplifican la
  validación de campos, el control del estado y el manejo de
  eventos de formulario.

  ↳ Implementar un mecanismo en el backend para gestionar las
  solicitudes de cotización recibidas. Se almacenará la
  información de cada solicitud en la base de datos para su
  seguimiento y posterior procesamiento.
  
  ----

