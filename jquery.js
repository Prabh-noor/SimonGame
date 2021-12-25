var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

//Calling nextSequence() when a the first key gets pressed
$("body").on("keydown", function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

//EventHandler
$(".btn").click(function () {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	playSound(userChosenColor);
	animatePressed(userChosenColor);
	checkAnswer(userClickedPattern.length - 1); //Array's length-1
});

function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("Success");
		if (gamePattern.length === userClickedPattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000); //Calling nextSequence if the answer is correct after 1000 milliseconds
		}
	} else {
		console.log("Wrong");
		playSound("wrong");

		$("body").addClass("game-over");
		$("h1").text("Game Over, Press any key to Restart");

		setTimeout(function () {
			$("body").removeClass("game-over");
		}, 200);

		startOver();
	}
}

function nextSequence() {
	userClickedPattern = []; //Reseting the userClickedPattern for every level
	level++;
	$("#level-title").text("Level " + level); //Updating h1

	var randomNumber = Math.floor(Math.random() * 4);
	var randomChosenColor = buttonColors[randomNumber];
	gamePattern.push(randomChosenColor);

	//Selecting the button with the same id as randomChosenColor
	$("#" + randomChosenColor)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColor);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePressed(currentColor) {
	$("." + currentColor).addClass("pressed");
	setTimeout(function () {
		$("." + currentColor).removeClass("pressed");
	}, 100);
}

function startOver() {
	//Reseting the values
	level = 0;
	gamePattern = [];
	started = false;
}
