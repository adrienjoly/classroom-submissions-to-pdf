var google = require('googleapis');
var googleAuth = require('google-auth-library');

var SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly', // for listCourses
  'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
  'https://www.googleapis.com/auth/classroom.rosters.readonly',
  'https://www.googleapis.com/auth/classroom.profile.emails', // for listStudents
];
// If modifying these scopes, delete your previously saved credentials

var GCLA_CLIENT_ID = process.env.GCLA_CLIENT_ID.substr();
var GCLA_CLIENT_SECRET = process.env.GCLA_CLIENT_SECRET.substr();
var GCLA_REDIRECT_URL = process.env.GCLA_REDIRECT_URL || 'urn:ietf:wg:oauth:2.0:oob';

var authClients = {}; // sesId -> auth.OAuth2 instance, logged with user token

function getClient(sesId) {
  return authClients[sesId || 0];
}

function setClient(sesId, client) {
  authClients[sesId || 0] = client;
}

function addClient(client) {
  setClient(null, client);
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 */
exports.generateAuthUrl = function generateAuthUrl() {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(GCLA_CLIENT_ID, GCLA_CLIENT_SECRET, GCLA_REDIRECT_URL);
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });
  // the user will have to visit that URL, select google account, accept,
  // and the resulting code must be transmitted to authorizeFromCode()
}

exports.getSessionFromCode = function getSessionFromCode(code, callback) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(GCLA_CLIENT_ID, GCLA_CLIENT_SECRET, GCLA_REDIRECT_URL);
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

exports.getSessionToken = function() {
  return getClient().credentials
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the sesId.
 */
exports.getSessionFromToken = function(jsonUserToken, callback) {
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(GCLA_CLIENT_ID, GCLA_CLIENT_SECRET, GCLA_REDIRECT_URL);
  // TODO: if !jsonUserToken => getNewToken(callback.bind(null, null));
  oauth2Client.credentials = jsonUserToken;
  var sesId = addClient(oauth2Client);
  callback(null, sesId);
}

function listCourses(callback) {
  google.classroom('v1').courses.list({
    auth: getClient(),
  }, callback);
}

function listCourseWorks(courseId, callback) {
  google.classroom('v1').courses.courseWork.list({
    auth: getClient(),
    courseId: courseId,
  }, callback);
}

function listSubmissions(courseId, courseWorkId, callback) {
  google.classroom('v1').courses.courseWork.studentSubmissions.list({
    auth: getClient(),
    courseId: courseId,
    courseWorkId: courseWorkId,
  }, callback);
}

exports.listStudents = function(courseId, callback) {
  google.classroom('v1').courses.students.list({
    auth: getClient(),
    courseId: courseId,
  }, callback);
}

exports.listCourses = listCourses;
exports.listCourseWorks = listCourseWorks;
exports.listSubmissions = listSubmissions;
