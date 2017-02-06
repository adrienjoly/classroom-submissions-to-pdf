var URL_PREFIX = 'http://localhost:3000';

function login() {
  console.log('login...');
  var w = window.open();
  this.$http.get(URL_PREFIX + '/authToGoogleCalendar').then((response) => {
    w.location.href = response.body.url;
  }, displayError);
}

function submitCode() {
  var code = document.getElementById('authcode').value; 
  console.log('submitting auth code...', code);
  this.$http.get(URL_PREFIX + '/getSessionFromCode?code=' + encodeURIComponent(code)).then((response) => {
    console.log('=>', response.body.sesId);
    this.sesId = response.body.sesId;
    refresh.call(this);
  }, displayError);
}

function refresh() {
  console.log('loading events...');
  this.$http.get(URL_PREFIX + '/listEvents?sesId=' + this.sesId).then((response) => {
    this.events = response.body.events;
  }, displayError);
}

function updateEventById(eventId, event) {
  for (var i in this.events) {
    if (this.events[i].id == eventId) {
      this.events[i].start = event.start;
    }
  }
}

function snoozeEvent(eventId) {
  console.log('snoozing', eventId);
  this.$http.get(URL_PREFIX + '/swipeEvent?sesId=' + this.sesId + '&eventId=' + eventId).then((response) => {
    updateEventById.call(this, eventId, response.body.event);
  }, displayError);
}
