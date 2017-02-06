var uuid = require('uuid');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];
// If modifying these scopes, delete your previously saved credentials

var GCAL_CLIENT_ID = process.env.GCAL_CLIENT_ID.substr();
var GCAL_CLIENT_SECRET = process.env.GCAL_CLIENT_SECRET.substr();
var GCAL_REDIRECT_URL = process.env.GCAL_REDIRECT_URL.substr();

var authClients = {}; // sesId -> auth.OAuth2 instance, logged with user token

function getClient(sesId) {
  return authClients[sesId];
}

function setClient(sesId, client) {
  authClients[sesId] = client;
}

function addClient(client) {
  var sesId = uuid.v1(); // generate a unique user session id
  authClients[sesId] = client;
  return sesId;
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 */
exports.generateAuthUrl = function generateAuthUrl() {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(GCAL_CLIENT_ID, GCAL_CLIENT_SECRET, GCAL_REDIRECT_URL);
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  // the user will have to visit that URL, select google account, accept,
  // and the resulting code must be transmitted to authorizeFromCode()
}

exports.getSessionFromCode = function getSessionFromCode(code, callback) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(GCAL_CLIENT_ID, GCAL_CLIENT_SECRET, GCAL_REDIRECT_URL);
  console.log('getSessionFromCode, code:', code);
  oauth2Client.getToken(code, function(err, token) {
    if (err) {
      console.error('Error while trying to retrieve access token:', err);
      callback(err);
    } else {
      oauth2Client.credentials = token;
      var sesId = addClient(oauth2Client);
      console.log('getSessionFromCode =>', sesId);
      callback(null, sesId);
    }
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the sesId.
 */
function getSessionFromToken(jsonUserToken, callback) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(GCAL_CLIENT_ID, GCAL_CLIENT_SECRET, GCAL_REDIRECT_URL);
  // TODO: if !jsonUserToken => getNewToken(callback.bind(null, null));
  oauth2Client.credentials = jsonUserToken;
  var sesId = addClient(oauth2Client);
  callback(null, sesId);
}

/**
 * Lists the next 10 events on the user's primary calendar.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(sesId, callback) {
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: getClient(sesId),
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      callback(err);
    } else {
      var events = response.items;
      callback(null, response.items);
    }
  });
}

/**
 * Get an event by id
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 * @param {string} id the of event to get.
 */
function getEvent(sesId, eventId, callback) {
  var calendar = google.calendar('v3');
  calendar.events.get({
    auth: getClient(sesId),
    calendarId: 'primary',
    eventId: eventId,
    singleEvents: true,
    orderBy: 'startTime',
    maxResults: 10
  }, function(err, response) {
    if (err) {
      callback(err);
    } else {
      callback(null, response);
    }
  });
}

exports.listEvents = listEvents;
exports.getEvent = getEvent;
