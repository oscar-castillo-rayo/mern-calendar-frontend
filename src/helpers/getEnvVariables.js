//devuelve las variables de entorno
export const getEnvVariables = () => {
  return {
    ...import.meta.env,
  };
};
