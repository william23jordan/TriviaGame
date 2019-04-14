var gameQuestions = [{
	question: "Which of the following is not one of the three main characters of Samurai Champloo?",
	answerChoices: ["Fuu", "Li", "Jin", "Mugen"],
	answer: 2
},{
	question: "The opening theme for Samurai Champloo, Battlecry, is by which of the following artists?",
	answerChoices: ["Jen Aiko", "DJ Okawari", "Nujabes", "Steve Aoki"],
	answer: 2
},{
	question: "Which other famous anime character is Mugen often compared to?",
	answerChoices: ["Son Goku, DragonBall", "Spike, Cowboy Bebop", "Ichigo Kurosaki, Bleach", "Monkey D Luffy, One Piece"],
	answer: 1
},{
	question: "When Jin and Mugen first encounter Fuu, where is she working?",
	answerChoices: ["A brothel", "Gambling hall", "Bath House", "Tea House"],
	answer: 3
},{
	question: "What are Jin and Mugen trying to help Fuu locate throughout the series?",
	answerChoices: ["The Sunflower Samurai", "Her brother Yahiko", "Her pet squirrel", "The Dutch Man"],
	answer: 0
},{
	question: "The main character of the show is named Mugen, what does 'Mugen' translate to?",
	answerChoices: ["unbound", "wanderer", "infinite", "dog"],
	answer: 3
},{
	question: "The character Jin harbors a dark secret in the beginning of the series, what is that secret?",
	answerChoices: ["He is Fuu's brother", "He killed his Sensei", "He is the Sunflower Samurai", "He is actually blind"],
	answer: 1
},{
	question: "Before his time with Jin and Fuu, what did mugen do previously?",
	answerChoices: ["he was an assassin", "he was a mercenary", "he was a pirate", "he worked in a dojo"],
	answer: 2
},{
	question: "What is the origin of Jin's name?",
	answerChoices: ["it is one of the 7 principles of bushido", "He's named after a piece from the game shogi", "named after a martial art", "he is named after a famous philosopher"],
	answer: 0
},{
	question: "What do Jin and Mugen agree NOT to do until they help Fuu find the Sunflower Samurai?",
	answerChoices: ["use swordsmanship", "sleep with any women", "Kill each other", "lie to her"],
	answer: 2
}];

var currentQuestion; 

var correctAnswer; 

var wrongAnswer; 

var unanswered; 

var secondsLeft; 

var time; 

var answered; 

var userChoice;

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
    $('#wrongAnswers').empty();
    $('#unanswered').empty();
    currentQuestion = 0;
    correctAnswer = 0;
    wrongAnswer = 0;
    unanswered = 0;
    newQuestion();
}

function newQuestion(){
    $('#message').empty();
    $('#correctAnswer').empty();
    //$('#gif').empty();
    answered = true;

    $('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+gameQuestions.length);
    $('.question').html('<h2>' + gameQuestions[currentQuestion].question + '<h2>');
    for (var i = 0; i < 4; i++){
        var choices = $('<div>');
        choices.text(gameQuestions[currentQuestion].answerChoices[i]);
        choices.attr({'data-index': i});
        choices.addClass('thisChoice');
        $('.answerChoices').append(choices);
    } 
    countdown();

    $('.thisChoice').on('click', function(){
        userChoice = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function countdown(){
    secondsLeft = 20;
    $('#timeleft').html('<h3>Time Remaining: ' + secondsLeft + '</h3>');
    answered = true;
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
    secondsLeft--;
    $('#timeleft').html('<h3>Time Remaining: ' + secondsLeft + '</h3>');
    if (secondsLeft < 1){
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

function answerPage(){
    $('#currentQuestion').empty();
    $('.thisChoice').empty();
    $('.question').empty();

    var rightAnswerText = gameQuestions[currentQuestion].answerChoices[gameQuestions[currentQuestion].answer];
    var rightAnswerIndex = gameQuestions[currentQuestion].answer;

    if ((userChoice == rightAnswerIndex) && (answered == true)){
        correctAnswer++;
        $('#message').html(messages.correct);
    }
    else if ((userChoice != rightAnswerIndex) && (answered == true)){
        wrongAnswer++;
        $('#message').html(messages.incorrect);
        $('#correctedAnswer').html('The answer was: ' + rightAnswerText);
    }
    else{
        unanswered++;
        $('#message').html(messages.endTime);
        $('#correctAnswer').html('The answer was: ' + rightAnswerText);
        answered = true;
    }

    if (currentQuestion == (gameQuestions.length-1)){
        setTimeout(scoreboard, 5000)
    }
    else {
        currentQuestion++;
        setTimeout(newQuestion, 5000);
    }
}

function scoreboard(){
    $('#timeLeft').empty();
    $('#message').empty();
    $('#correctAnswer').empty();
    //$('#gif').empty();

    $('#finalMessage').html(messages.finished);
    $('#correctAnswers').html("Correct Answers: " + correctAnswer);
    $('#wrongAnswers').html("Wrong Answers: " + wrongAnswer);
    $('#unanswered').html("Unanswered: " + unanswered);
    $('#startOverBtn').addClass('reset');
    $('#startOverBtn').show();
    $('#startOverBtn').html('Start Over?');
}