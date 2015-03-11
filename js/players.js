function addPlayer(player) {

  var newPlayer =  {
      "id" : new Date().getTime(),
      "playerName" : player.playerName,
      "matchesPlayed" : 0,
      "matchesWon" : 0
  };

  var players = store.get('players') ? store.get('players') : [];
  players.push(newPlayer);
  store.set('players', players);
}

function getPlayers() {
  var players = store.get('players') ? store.get('players') : [];
  if(players.length == 0) {
    store.set('players', players);
  }
  return store.get('players');
}

function removePlayer(id) {

  var players = [];

  $.each(store.getAll().players, function() {
    if(this.id != id)
      players.push(this);
  });

  store.set('players', players);

}

function removeAllPlayers() {
  store.set('players', []);
}

function updatePlayersTable(table)
{

  var players = getPlayers();
  var tableBody = $(table).find('tbody');
  tableBody.empty();

  if(players.length == 0) {
    var row = $('<tr>')
            .append($('<td>').attr('colspan', 5).text('There are no players registered.'));
    row.appendTo(tableBody);
    return;
  }

  $.each(players, function() {

    var row = $('<tr>')
      .append($('<td>').text(this.id))
      .append($('<td>').text(this.playerName))
      .append($('<td>').text(this.matchesPlayed))
      .append($('<td>').text(this.matchesWon))
      .append($('<td>').append($('<button>').addClass('btn btn-default').addClass('remove-player').attr('aria-label', 'remove').attr('id', this.id).text('Remove')));
    row.appendTo(tableBody);

  });

}

function initPlayers(dropdown1, dropdown2) {
  var players = getPlayers();
  $.each(players, function() {
      dropdown1.append($('<option>').text(this.playerName).attr('value', this.id));
      dropdown2.append($('<option>').text(this.playerName).attr('value', this.id));
  });
}
