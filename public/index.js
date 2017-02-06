var nextUuid = 0;

const appendRenderedDate = (evt) => Object.assign(evt, {
  uuid: nextUuid++,
  date: new Date(evt.start).toLocaleString('en')
});

const byAscStartDate = (e1, e2) => {
  return Math.sign(new Date(e1.start).getTime() - new Date(e2.start).getTime());
};

const displayError = (response) => {
  alert('Error: ' + JSON.stringify(response));
};

function updated() {
  console.log('updated');
  var itemsElement = document.getElementsByTagName('ol')[0];
  var _this = this;
  Array.prototype.forEach.call(itemsElement.children, function(item, i) {
    if (item.classList.contains('snoozeable')) return;
    console.log('making item', i, 'snoozeable');
    item.classList.add('snoozeable');
    SnoozeSwiper(item, () => {
      console.log('snoozed!', item);
      item.classList.add('collapsed'); // TODO: make animation work
      setTimeout(() => {
        itemsElement.removeChild(item); // otherwise, the "snooze" stays on screen
        _this.events = _this.events.filter((e) => e.uuid !== item.getAttribute('uuid'));
      }, 500);
    });
  });
}

new Vue({
  el: '#snoozer-web-client',
  data: {
    sesId: null,
    events: [ { name: '(loading...)' } ]
  },
  computed: {
    orderedEvents: function() {
      return this.events
        .sort(byAscStartDate)
        .map(appendRenderedDate)
    }
  },
  updated: updated,
  methods: {
    login: login,
    submitCode: submitCode,
    snooze: function(evt) {
      snoozeEvent.call(this, evt.srcElement.parentElement.parentElement.id);
    }
  }
})
