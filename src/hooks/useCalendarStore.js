import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from "../Store";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { user } = useSelector((state) => state.auth);
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        //Actualiza el evento
        const { data } = await calendarApi.put(
          `events/${calendarEvent.id}`,
          calendarEvent
        );

        dispatch(onUpdateEvent({ ...calendarEvent, user }));
        return;
      }
      //CalendarApi es el path guardado en la carpeta api, calendarEvet es el evento que recibo, es decir el body.
      const { data } = await calendarApi.post("/events", calendarEvent);

      //si se empieza a guardar un dato y no tiene id quiere decir que es un evento nuevo, entonces se le agregar el id, se hace el spread para agregar el resto de los datos
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async (calendarEvent) => {
    try {
      //Actualiza el evento
      await calendarApi.delete(`/events/${activeEvent.id}`);

      dispatch(onDeleteEvent());
      return;
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar evento", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log("Error cargando los datos");
      console.log(error);
    }
  };
  return {
    //*Propiedades
    events,
    activeEvent,
    hasEventSeleted: !!activeEvent,

    //*Métodos
    setActiveEvent,
    startDeletingEvent,
    startLoadingEvents,
    startSavingEvent,
  };
};
