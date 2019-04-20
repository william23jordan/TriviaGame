var gameQuestions = [{
	question: "Which of the following is NOT one of the three main characters of Samurai Champloo?",
	answerList: ["Fuu", "Li", "Jin", "Mugen"],
	answer: 1
},{
	question: "The opening theme for Samurai Champloo, Battlecry, is by which of the following artists?",
	answerList: ["Jen Aiko", "DJ Okawari", "Nujabes", "Steve Aoki"],
	answer: 2
},{
	question: "Which other famous anime character is Mugen often compared to?",
	answerList: ["Son Goku, DragonBall", "Spike, Cowboy Bebop", "Ichigo Kurosaki, Bleach", "Monkey D Luffy, One Piece"],
	answer: 1
},{
	question: "When Jin and Mugen first encounter Fuu, where is she working?",
	answerList: ["A brothel", "Gambling hall", "Bath House", "Tea House"],
	answer: 3
},{
	question: "What are Jin and Mugen trying to help Fuu locate throughout the series?",
	answerList: ["The Sunflower Samurai", "Her brother Yahiko", "Her pet squirrel", "The Dutch Man"],
	answer: 0
},{
	question: "The main character of the show is named Mugen, what does 'Mugen' translate to?",
	answerList: ["unbound", "wanderer", "infinite", "dog"],
	answer: 2
},{
	question: "The character Jin harbors a dark secret in the beginning of the series, what is that secret?",
	answerList: ["He is Fuu's brother", "He killed his Sensei", "He is the Sunflower Samurai", "He is actually blind"],
	answer: 1
},{
	question: "Before his time with Jin and Fuu, what did mugen do previously?",
	answerList: ["he was an assassin", "he was a mercenary", "he was a pirate", "he worked in a dojo"],
	answer: 2
},{
	question: "What is the origin of Jin's name?",
	answerList: ["it is one of the 7 principles of bushido", "He's named after a piece from the game shogi", "named after a martial art", "he is named after a famous philosopher"],
	answer: 0
},{
	question: "What do Jin and Mugen agree NOT to do until they help Fuu find the Sunflower Samurai?",
	answerList: ["use swordsmanship", "sleep with any women", "Kill each other", "lie to her"],
	answer: 2
}];

var currentQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var unanswered; 
var seconds; 
var time; 
var answered; 
var userSelect;

var messages = {
	correct: "Correct, nice one!",
	incorrect: "Ooo sorry, that's not it.",
	endTime: "Time's up!",
	finished: "Alright, let's see how ya did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	answered = true;
	
	
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+gameQuestions.length);
	$('.question').html('<h2>' + gameQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(gameQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i});
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); 
	$('.question').empty();

	var rightAnswerText = gameQuestions[currentQuestion].answerList[gameQuestions[currentQuestion].answer];
	var rightAnswerIndex = gameQuestions[currentQuestion].answer;

	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (gameQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
