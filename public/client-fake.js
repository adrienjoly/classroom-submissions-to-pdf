function login() {
  console.log('fake login');
  submitCode.call(this);
}

function submitCode() {
  console.log('fake submit auth code');
  this.sesId = 'fake';
  refresh.call(this);
}

function refresh() {
  console.log('fake events');
  this.events = [
    {"id":"014jt6nqcat0non90m18ptfa48_20161028","name":"Anniversaire Mag","start":"2016-10-28","end":"2016-10-29","allDay":true},
    {"id":"_8p236c1j6ss3cba28p144b9k8p1k8ba18cp30ba36or30dhp84r3gh1j8o_20161029T063000Z","name":"GRATITUDE + BRIEFING","start":"2016-10-29T08:30:00+02:00","end":"2016-10-29T09:00:00+02:00","allDay":false},
    {"id":"_8p236c1j6ss3cba28p144b9k8p1k8ba18cp30ba36or30dhp84r3gh1j8o_20161030T073000Z","name":"GRATITUDE + BRIEFING","start":"2016-10-30T08:30:00+01:00","end":"2016-10-30T09:00:00+01:00","allDay":false},
    {"id":"_6ks30chk8cqk6ba468r3ib9k88oj8ba26coj6b9o6op38ghn8co3ccpo8g_20161030T180000Z","name":"WEEKLY REVIEW + PLANNING","start":"2016-10-30T19:00:00+01:00","end":"2016-10-30T19:30:00+01:00","allDay":false},
    {"id":"_6ksj0gi584sk4b9g88sjcb9k84q32ba16123eb9j6d342cq161236dq38g","name":"Bière avec Jérémie","start":"2016-10-31","end":"2016-11-01","allDay":true},
    {"id":"_8p236c1j6ss3cba28p144b9k8p1k8ba18cp30ba36or30dhp84r3gh1j8o_20161031T073000Z","name":"GRATITUDE + BRIEFING","start":"2016-10-31T08:30:00+01:00","end":"2016-10-31T09:00:00+01:00","allDay":false},
    {"id":"_6cp3gc9n74o36ba48d2jcb9k6d14aba2691kab9i64pj4e1j60pj2da174","name":"send newsletter","start":"2016-10-31T16:00:00+01:00","end":"2016-10-31T16:30:00+01:00","allDay":false},
    {"id":"_8p236c1j6ss3cba28p144b9k8p1k8ba18cp30ba36or30dhp84r3gh1j8o_20161101T073000Z","name":"GRATITUDE + BRIEFING","start":"2016-11-01T08:30:00+01:00","end":"2016-11-01T09:00:00+01:00","allDay":false},
  ];
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
  //updateEventById.call(this, eventId, response.body.event);
  // TODO
}
