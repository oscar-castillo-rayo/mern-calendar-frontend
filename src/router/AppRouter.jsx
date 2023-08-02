import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loginpage } from "../assets/auth";
import { CalendarPage } from "../calendar";
import { useAuthStore } from "../hooks";

export const AppRouter = () => {
  //Toma el status para validar si esta autenticado el usuario
  const { status, checkAuthToken } = useAuthStore();

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }
  return (
    <>
      <Routes>
        {status === "not-authenticated" ? (
          <>
            {/* Si el usuario no esta autenticado lo va a enviar al login, cualquier otra ruta sin autenicacar lo va a aenviar a la misma login page */}
            <Route path="/auth/*" element={<Loginpage />} />
            <Route path="/*" element={<Navigate to="/auth/login" />} />
          </>
        ) : (
          <>
            {/* Si esta autenticado enviará al usuario a la raiz de calendarPage, cualquier otro path lo va a enviar a la ruta raiz */}
            <Route path="/" element={<CalendarPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </>
  );
};
