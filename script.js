let malePlayers = [];
let randomizedMales = [];
let numOfMales;
let femalePlayers = [];
let randomizedFemales = [];
let numOfFemales;

// FUNCTIONS
function createLineup() {
  randomizedMales = malePlayers.sort(function(a, b){return 0.5 - Math.random()});
  randomizedFemales = femalePlayers.sort(function(a, b){return 0.5 - Math.random()});
  $(window).scrollTop(0);
  $('#submit').css('display', 'none');
  $('#num-of-guys').css('display', 'none');
  $('#num-of-girls').css('display', 'none');
  $('#next-inning').removeClass('next-inning-hidden');
  $('#next-inning').addClass('next-inning-visible');
  displayMales();
  displayFemales();
}

function displayMales() {
  $('#guys-sitting').html('');
  $('#guys-sitting').append('<h2>Guys Sitting This Inning</h2>');
  for (i = 0; i < numOfMales; i++) {
    let player = randomizedMales[0];
    $('#guys-sitting').append(`<p>${player}</p>`);
    randomizedMales.splice(0, 1);
    randomizedMales.push(player);
  }
}

function displayFemales() {
  $('#girls-sitting').html('');
  $('#girls-sitting').append('<h2>Girls Sitting This Inning</h2')
  for (i=0; i < numOfFemales; i++) {
    let player = randomizedFemales[0];
    $('#girls-sitting').append(`<p>${player}</p>`);
    randomizedFemales.splice(0, 1);
    randomizedFemales.push(player);
  }
}

function addPlayer(target, player) {
  if (target.hasClass('males')) {
    if (!randomizedMales.length) {
      malePlayers.push(player);
    } else {
      if (confirm(`Are you sure you want to add ${player}?`)) {
        randomizedMales.splice(numOfMales, 0, player);
        numOfMales++;
      }
    }
  } else {
    if (!randomizedFemales.length) {
      femalePlayers.push(player);
    } else {
      if (confirm(`Are you sure you want to add ${player}?`)) {
        randomizedFemales.splice(numOfFemales, 0, player);
        numOfFemales++;
      }
    }
  }
}

function removePlayer(target, player) {
  if (target.hasClass('males')) {
    if(!randomizedMales.length) {
      let removeHim = malePlayers.indexOf(player);
      malePlayers.splice(removeHim, 1);
      target.removeClass('active');
    } else {
      if (confirm(`Are you sure you want to remove ${player}?`)) {
        let removeHim = malePlayers.indexOf(player);
        numOfMales--;
        randomizedMales.splice(removeHim, 1);
        target.removeClass('active');
      }
    }
  } else {
    if (!randomizedFemales.length) {
      let removeHer = femalePlayers.indexOf(player);
      femalePlayers.splice(removeHer, 1);
      target.removeClass('active');
    } else {
      if (confirm(`Are you sure you want to remove ${player}?`)) {
        let removeHer = femalePlayers.indexOf(player);
        numOfFemales--;
        randomizedFemales.splice(removeHer, 1);
        target.removeClass('active');
      }
    }
  }
}
// ACTIONS
$('#submit').click(function() {
  numOfMales = $('#number-of-guys-roster').val();
  numOfFemales = $('#number-of-girls-roster').val();
  if (numOfMales && numOfFemales) {
    createLineup();
  } else {
    alert('Make sure you selected how many people of each gender need to sit, even if it\'s 0!')
  }
});

$('.player').click(function(e) {
  let target = $(e.target);
  let player = target.text();
  if (target.hasClass('active')) {
    removePlayer(target, player);
  } else {
    target.addClass('active');
    addPlayer(target, player);
  }
})

$('#next-inning').click(function() {
  displayMales();
  displayFemales();
})
