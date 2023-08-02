import { createSlice } from "@reduxjs/toolkit";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    //Devuelve los valores con el filter que no sean los del mismo id, es decir que filter va a permitir eliminar el que no cumpla.
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      //funcionaria igualar a payload
      //state.events = payload;
      payload.forEach((event) => {
        //some devuelve un valor boolean si encuentra el dato.
        //Se recorre el state y se compara el id del state con el payload, para ver si ya existe el evento id en el state
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          //Si no existe agrega el event
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      // Mover la función aquí dentro
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
} = calendarSlice.actions;
