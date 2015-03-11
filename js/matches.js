function addMatch(match) {

  var newMatch = {
      id : new Date().getTime(),
      awayTeamName  : match.awayTeamName,
      awayTeamScore : match.awayTeamScore,
      awayTeamPlayer: match.awayTeamPlayer,
      homeTeamName  : match.homeTeamName,
      homeTeamScore : match.homeTeamScore,
      homeTeamPlayer: match.homeTeamPlayer
  };

  var matches = store.get('matches') ? store.get('matches') : [];
  matches.push(newMatch);
  store.set('matches', matches);

}

function removeMatch(id)
{

  var matches = [];

  $.each(store.getAll().matches, function() {
    if(this.id != id)
      matches.push(this);
  });

  store.set('matches', matches);

}

function getMatches() {
  var matches = store.get('matches') ? store.get('matches') : [];
  if(matches.length == 0) {
    store.set('matches', matches);
  }
  return store.get('matches');
}

function updateMatchTable(table)
{

  var matches = getMatches();
  var tableBody = $(table).find('tbody');
  tableBody.empty();

  if(matches.length == 0) {
    var row = $('<tr>')
            .append($('<td>').attr('colspan', 5).text('There are no matches registered.'));
    row.appendTo(tableBody);
    return;
  }

  $.each(matches, function() {

    var row = $('<tr>')
      .append($('<td>').text(this.id))
      .append($('<td>').text(this.homeTeamName))
      .append($('<td>').text(this.awayTeamName))
      .append($('<td>').text(this.homeTeamScore))
      .append($('<td>').text(this.awayTeamScore))
      .append($('<td>').text(''))
      .append($('<td>').append($('<button>').addClass('btn btn-default').addClass('remove-match').attr('aria-label', 'remove').attr('id', this.id).text('Remove')));
    row.appendTo(tableBody);

  });

}
