exports.eventFromGcal = (event) => ({
  id: event.id,
  name: event.summary,
  start: event.start.dateTime || event.start.date,
  end: event.end.dateTime || event.end.date,
  allDay: !!event.start.date,
});
