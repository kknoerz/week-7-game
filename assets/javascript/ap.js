

var firebase = new Firebase("https://kknoerz.firebaseio.com/");
var playerName = ''
var opponent = ''
var wins = 0
var losses = 0
var tie = 0
var youChosen = ""
var oppChosen = ""
var youCoinFlip
var oppCoinFlip



//*********** If You Are Seccond To Arrive ****************************
firebase.on('child_added', function(snapshot) {
	// debugger;
	
	if (snapshot.val().you != playerName && snapshot.val().you != undefined && snapshot.val().player != opponent) { //you are seccond to arrive
		opponent = snapshot.val().you
		$('#smackRead').prepend('<br />').prepend($('<label>').text('Your opponent has joined the game as: '+snapshot.val().you));
		$('#player2').text('Player 2 Ready!');
		
		var playerTwoChoose = $('<div id="playerTwoChoose">');
		var rock = $('<img class="rock">').attr('src', 'assets/images/rock.jpg');
		var paper = $('<img class="paper">').attr('src', 'assets/images/paper.jpg');
		var scissors = $('<img class="scissors">').attr('src', 'assets/images/scissors.jpg');
		$('#player2').append(playerTwoChoose);
		$('#playerTwoChoose').append(rock, paper, scissors).css({
			'opacity': '0.2',
			'background-color': 'red'
		});

// ********** If You Are First To Arrive ********************************
	}else if (snapshot.val().you = playerName && snapshot.val().you != undefined) { 
		$('#smackRead').prepend('<br />').prepend($('<label>').text('You have joined the game as: '+snapshot.val().you));

		
	} else if (snapshot.val().player == playerName){
		console.log('You chose: ', youChosen)
	} else if (snapshot.val().player == opponent) {
		oppChosen = snapshot.val().chose;
		console.log(opponent+' chose: '+oppChosen)
	}
	
//*********** RPS Logic ***************************************************
	if (youChosen.length > 0 && oppChosen.length > 0) {

		if ((youChosen == 'rock') && (oppChosen == 'scissors')){
            wins++;
            youChosen = ''
            oppChosen = ''
            $('#smackRead').prepend('<br />').prepend($('<label>').text('You won! you have: '+wins+' wins!'));
        
        
        }else if ((youChosen == 'rock') && (oppChosen == 'paper')){
            losses++;
            youChosen = ''
            oppChosen = ''            
            $('#smackRead').prepend('<br />').prepend($('<label>').text('You lost! you have: '+losses+' losses!'));            
        
        
        }else if ((youChosen == 'scissors') && (oppChosen == 'rock')){
            losses++;
            youChosen = ''
            oppChosen = ''            
			$('#smackRead').prepend('<br />').prepend($('<label>').text('You lost! you have: '+losses+' losses!'));            
        
        
        }else if ((youChosen == 'scissors') && (oppChosen == 'paper')){
            wins++;
            youChosen = ''
            oppChosen = ''            
            $('#smackRead').prepend('<br />').prepend($('<label>').text('You won! you have: '+wins+' wins!'));            
        

        }else if ((youChosen == 'paper') && (oppChosen == 'rock')){
            wins++;
            youChosen = ''
            oppChosen = ''            
            $('#smackRead').prepend('<br />').prepend($('<label>').text('You won! you have: '+wins+' wins!'));            
        

        }else if ((youChosen == 'paper') && (oppChosen == 'scissors')){
            losses++;
            youChosen = ''
            oppChosen = ''            
            $('#smackRead').prepend('<br />').prepend($('<label>').text('You lost! you have: '+losses+' losses!'));
        

        }else if (youChosen == oppChosen){
            tie++;
            youChosen = ''
            oppChosen = ''            
            $('#smackRead').prepend('<br />').prepend($('<label>').text('You tied! you have: '+tie+' ties!'));
        } 
	}
});


//************* Rock Paper Scissors Selection *******************************

$(document).on('click', '#playerOneChoose .rock', function(){
	// debugger;
	if (playerName != ''){
		youChosen = 'rock'
		$('#smackRead').prepend('<br />').prepend($('<label>').text('You chose '+youChosen));		
		var rock = {
			player: playerName,
			chose: 'rock'
		}		
		firebase.push(rock)	
	}				
});

$(document).on('click', '#playerOneChoose .paper', function(){
	// debugger;
	if (playerName != ''){
		youChosen = 'paper'
		$('#smackRead').prepend('<br />').prepend($('<label>').text('You chose paper'));
		var paper = {
			player: playerName,
			chose: "paper"
		}
		firebase.push(paper)				
	}
});

$(document).on('click', '#playerOneChoose .scissors', function(){
	// debugger;
	if (playerName != ''){
		youChosen = "scissors"
		$('#smackRead').prepend('<br />').prepend($('<label>').text('You chose scissors'));	
		var scissors = {
			player: playerName,
			chose: 'scissors'

		}
		firebase.push(scissors)		
	}
});




//************************chat room feature attempt************************

// firebase.on('child_added', function(snapshot){ 
// 	debugger;
// 	if (snapshot.val().said != playerName ) {
// 		var theySaid = snapshot.val().youSaid
// 		$('#smackRead').append($('<label>').text(opponent+' says: '+theySaid)).append('<br />');
// 	}else {
// 		return false
// 	}


// });

//***************** Coin Flip Logic **************************************

var flip = function() {
	youChosen = Math.random();
	console.log(youChosen);
	
	oppChosen = Math.random();
	console.log(oppChosen);
}


// When player name is entered ********************************************
$('#submitName').on('click', function() {
	// debugger;
	playerName = $('#playerName').val();
	$('#console').text('Player 1: '+playerName+' has joined the game!');
	
	var playerOneChoose = $('<div id="playerOneChoose">');
	var rock = $('<img class="rock">').attr('src', 'assets/images/rock.jpg');
	var paper = $('<img class="paper">').attr('src', 'assets/images/paper.jpg');
	var scissors = $('<img class="scissors">').attr('src', 'assets/images/scissors.jpg');
	
	$('#player1').text('Ready!');

	$('#player1').append(playerOneChoose);
	$('#playerOneChoose').append(rock, paper, scissors);

	$('#playerName').remove();
	$('#submitName').remove()
	$('#player-input').remove()
	$('body').prepend($('<div id="player-input">').text('Select one!'))	
	// debugger;

	user = {
		you: playerName 
	}

	firebase.push(user); //submmit player to firebase

	return false; //last line in #submitName on.click *************
});



// When smack-talk is typed ************************************************
$('#typeSmack').keyup( function() {
	if ($('#typeSmack').val() != '') {
		$('#submitSmack').removeAttr('disabled'); //activate submit button
	}
});
 // When submit is pressed ************************************************
$('#submitSmack').on('click', function(){
	var submitSmack = $('#typeSmack').val();

	if(submitSmack.length > 0) {
		
		$('#smackRead').prepend('<br />').prepend($('<label>').text(playerName+' says: '+submitSmack));
		
		smack = {
			said: playerName,
			youSaid: submitSmack
		}
		
		firebase.push(smack);
		
		submitSmack = ""
		$('#typeSmack').attr('placeholder', 'You said: ')
		$('#typeSmack').val('');
		return false;
	}

});


$('#reset').on('click', function(){
	firebase.remove();
});















