var moment = require('moment');
var gcal = require('./lib/gcal');
var mappings = require('./lib/gcal-mappings');

exports.authToGoogleCalendar = function authToGoogleCalendar(call, callback) {
  callback(null, { url: gcal.generateAuthUrl() });
};

exports.getSessionFromCode = function getSessioFromCode(call, callback) {
  gcal.getSessionFromCode(call.request.code, function(err, sesId) {
    callback(err, { sesId: sesId });
  });
};

exports.listEvents = function listEvents(call, callback) {
  gcal.listEvents(call.request.sesId, function(err, events) {
    if (err) {
      console.error(err);
      callback(err);
      return
    }
    var translated = events.map(mappings.eventFromGcal);
    //console.log('=> events:', translated);
    callback(err, { events: translated });    
  })
};

exports.swipeEvent = function swipeEvent(call, callback) {
  gcal.getEvent(call.request.sesId, call.request.eventId, function(err, initialEvent) {
    if (err) {
      console.error(err);
      callback(err);
      return
    }
    var translatedEvent = mappings.eventFromGcal(initialEvent);
    var finalEvent = Object.assign(translatedEvent, {
      start: moment(translatedEvent.start).add(1, 'day').toISOString(),
      end: moment(translatedEvent.end).add(1, 'day').toISOString(),
    });
    // TODO: update calendar event
    callback(err, { event: finalEvent });
  });
};
