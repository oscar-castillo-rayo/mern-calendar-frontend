import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const { VITE_API_URL } = getEnvVariables();

//va a utilizar VITE_API_URL que es una variable de entorno para que cada vez que se utilize el calendarApi va a traer el url que se encuentra en VITE_API_URL.
const calendarApi = axios.create({
  baseURL: VITE_API_URL,
});

//Configuracion de los interceptores
calendarApi.interceptors.request.use((config) => {
  //Cuando se hace un request agrega este header del cual va a enviar el valor del token y si el localStorage no tiene un valor de token va a enviar undefined, por lo cual va a validar que el usuario no esta autenticado.
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token"),
  };

  return config;
});

export default calendarApi;
