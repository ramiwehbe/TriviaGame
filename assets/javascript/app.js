// Questions are stored in an array of objects together with the corresponding multiple choice options and the correct answer
let triviaQuestions = [{
	question: "What is the name given to wooden carving?",
	answerList: ["Xylography", "Lexicography", "Photography", "None of the above"],
	answer: 0
}, {
	question: "Intelligence agency of UK?",
	answerList: ["CIA", "KGB", "SIFA", "MI5"],
	answer: 3
}, {
	question: "Choose the name of the nuclear plant that closed for ever in Ukrain.",
	answerList: ["Rivne Nuclear Power Plant", "Zaporizhzhya NPP", "Chernobyl", "Cernobiljska Nuklearna Elektrana"],
	answer: 2
}, {
	question: "What is the basic principle of Miss Universe Competition?",
	answerList: ["Beauty", "Rational thinking", "Beauty with brains", "Attractiveness"],
	answer: 2
}, {
	question: "Haiti is an independent country of this seashore. Which one?",
	answerList: ["Albemarle Sound", "Pamlico Sound", "Gulf of Mexico", "Caribbean sea"],
	answer: 3
}, {
	question: "Which ex-president of America had given the leadership in the peace activities of Haiti in 1994?",
	answerList: ["Jimmy Carter", "George H. W. Bush", "Ronald Reagan", "Richard Nixon"],
	answer: 0
}, {
	question: "Which section of United Nations Organization stands against the pollution?",
	answerList: ["International Atomic Energy Agency (IAEA)", "United Nations Environment Programme (UNEP)", "United Nations Educational, Scientific, and Cultural Organization (UNESCO)", "None of the above"],
	answer: 1
}, {
	question: "How many countries had sign in UNEP?",
	answerList: ["113", "117", "120", "121"],
	answer: 2
}, {
	question: "Mr. Smith has two children. If the older child is a boy, what are the odds that the other child is also a boy?",
	answerList: ["Cannot figure the answer from the given information", "50%", "100%", "0%"],
	answer: 1
}, {
	question: "If 1/2 of 5 is 3, then what is 1/3 of 10?",
	answerList: ["2", "3", "4", "None of the above"],
	answer: 2
}];
// Corresponding array of GIFs to be displayed upon selecting an answer..
let gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
// Variable declaration 
let currentQuestion = 0; // Pointer for the current question
var userSelect;
var correctAnswer; // Counter for correct answers
var incorrectAnswer; // Counter for incorrect answers
let answered = 0; // Boolean to detect an answered question
var unanswered = 0; // Counter for unanswered questions
var seconds; //
var time;



// Message display options for every question
let messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did.",
	skipped: "Ouch!! You've missed this one."
	
}
// Hides the start button and starts a new game
$('#startBtn').on('click', function () {
	$(this).hide();
	newGame();
});
// Hides the start over button and starts a new game
$('#startOverBtn').on('click', function () {
	$(this).hide();
	newGame();
});
// Initialise new game parameters
function newGame() {
	$('#finalMessage').empty(); // clear message
	$('#correctAnswers').empty(); // clear answers counters field
	$('#incorrectAnswers').empty();
	$('#unanswered').empty(); // clear unanswered questions field

	currentQuestion = 0; // initialise variables
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion(); // generate a new question
}

function newQuestion() {
	$('#message').empty(); // clear previous display
	$('#correctedAnswer').empty();
	$('#gif').empty();
	$('.skip').html(`<h2>SKIP<h2`);

	answered = true;

	//sets up new questions & answerList
	$('#currentQuestion').html(`Question # ${(currentQuestion + 1)} / ${triviaQuestions.length}`);
	$('.question').html(`<h2> ${triviaQuestions[currentQuestion].question}</h2>`);
	for (let i = 0; i < triviaQuestions[currentQuestion].answerList.length; i++) {
		let choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({ 'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		console.log(userSelect);
		clearInterval(time);
		answerPage();
	});

}
// Skip Question, load result, and conitnue
$('.skip').on('click', function () {
	userSelect = -1;
	console.log(userSelect);
	clearInterval(time);
	answerPage();
});
function countdown() {
	seconds = 10;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();
	$('.skip').empty();


	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/' + gifArray[currentQuestion] + '.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if ((userSelect === rightAnswerIndex) && (answered === true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect === -1) && (answered === true)) {
		unanswered++;
		answered = false;
		$('#message').html(messages.skipped);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		
	} else if ((userSelect != rightAnswerIndex) && (answered === true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	if (currentQuestion === (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 5000);
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}
