import { parseISO } from "date-fns";

export const convertEventsToDateEvents = (events = []) => {
  //Los eventos que recibe hace un mapeo con el end y el start para convertirlos en fechas
  return events.map((event) => {
    event.end = parseISO(event.end);
    event.start = parseISO(event.start);

    return event;
  });
};
