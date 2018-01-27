console.log("Up and running!");

var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

var cardsInPlay = [];
var score = 0;
var scoreElement;

function checkForMatch () {
	if (cardsInPlay[0] === cardsInPlay[1]) {
		score += 1;
		scoreElement.setAttribute('data-content', score.toString());
		setTimeout(function() {
			if (confirm('Match found! Click Okay to play again.')) {
				location.reload();
			}
			}, 300);
	}
	else {
		setTimeout(function() {
			scoreElement.setAttribute('data-content', score.toString());
			if (confirm('No match found. Click Okay to play again.')) {
			location.reload();
			}
		}, 300);
	}
}

function flipCard () {
	var cardId = this.getAttribute('data-id');
	this.setAttribute('src', cards[cardId].cardImage);
	console.log("User flipped " + cards[cardId].rank);
	cardsInPlay.push(cards[cardId].rank);
	console.log(cards[cardId].cardImage);
	console.log(cards[cardId].suit);
	if (cardsInPlay.length === 2) {
		checkForMatch();
	}
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


function createBoard () {
	shuffle(cards);
	scoreElement = document.getElementById('score');
	scoreElement.setAttribute('data-content', score.toString());
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement('img');
		cardElement.setAttribute('src', "images/back.png")
		cardElement.setAttribute('data-id', i);
		cardElement.addEventListener("click", flipCard);
		document.getElementById('game-board').appendChild(cardElement);
	}
}



createBoard();