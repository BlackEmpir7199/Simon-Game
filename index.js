//check for any key stroke first and compare with heading h1

var tile = ["green","red","yellow","blue"] 

$(document).keypress(function (e) {
    if ($("h1").text() == "Press A Key to Start" || $("h1").text() == "Game Over, Press Any Key to Restart") {
        $("body").css("background-color", "#011F3F");
        $("h1").text("Let's start level 1");
        startGame(1);
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//satrt game function which invokes gamecontroller and gamechecker in timely delay
async function startGame(level) {
    var sequence = await gameController(level);
    gameChecker(sequence, level);
}

async function gameController(level) {
    var randomArr = [];
    for (var i = 0; i < level; i++) {
        var randomVar = tile[Math.floor(Math.random() * 4)];
        randomArr.push(randomVar);
        playSound(randomVar);
        //implement a delay using async and await promise and responses :(((since we don't have any delay without callback)))
        $("#" + randomVar).addClass("pressed");
        await delay(500);
        $("#" + randomVar).removeClass("pressed");
        await delay(200);
    }
    console.log(randomArr);
    return randomArr;
}



function gameChecker(sequence, level) {
    var userArr = [];
    $(".btn").off('click').on('click', function (e) {
        var clickedTile = e.target.id;
        userArr.push(clickedTile);
        playSound(clickedTile);
        $("#" + clickedTile).addClass("pressed");
        setTimeout(function () {
            $("#" + clickedTile).removeClass("pressed");
        }, 100);

        if (userArr[userArr.length - 1] !== sequence[userArr.length - 1]) {
            playSound("wrong");
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").css("background-color", "red");
            return;
        }

        if (userArr.length === sequence.length) {
            $("h1").text("Let's start level " + (level + 1));
            setTimeout(function () {
                startGame(level + 1);
            }, 1000);
        }
    });
}

//play sound function using switch case
function playSound(randomVar){
    var audio;
    switch (randomVar){
        case "green":
            audio = new Audio("./sounds/green.mp3");
            break;
        case "red":
            audio = new Audio("./sounds/red.mp3");
            break;
        case "yellow":
            audio = new Audio("./sounds/yellow.mp3");
            break;
        case "blue":
            audio = new Audio("./sounds/blue.mp3");
            break;
        case "wrong":
            audio = new Audio("./sounds/wrong.mp3");
            $("h1").text("Game Over, Press Any Key to Restart");
            $("body").css("background-color","red");
            break;    
        default:
            alert('There is some error');
    }
    audio.play();
}