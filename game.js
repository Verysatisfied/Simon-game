var buttonColours = new Array("red", "blue", "green", "yellow");
var gamePattern = new Array();
var userClickedPattern = new Array();

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$('.btn').click(function () {
    userClickedPattern.push(this.id);
    playSound(this.id);
    checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout('nextSequence()', 1000);
            userClickedPattern.length = 0;
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $(document).keypress(function () {
            window.location.reload();
        })

    }
}

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(10).fadeIn(10);
    playSound(randomChosenColour);
    return randomChosenColour;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

$(".btn").click(function animatePress(currentColor) {
    var currentColor = this.id;
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
});