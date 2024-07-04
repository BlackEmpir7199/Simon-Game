//check for any key stroke first and compare with heading h1

var tile = ["green","red","yellow","blue"] 

$(document).keypress(function (e) { 
    if($("h1").text()=="Press A Key to Start"){
        gameController(3);
    }
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function gameController(lvl){
    var randomArr;
    var audio;
    for(var i=0;i<lvl;i++){
        randomArr=tile[Math.floor(Math.random()*4)];
        switch (randomArr){
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
            default:
                alert('There is some error');
        }
        audio.play();
        $("#"+randomArr).addClass("pressed");
        setTimeout(function () {
            $("#"+randomArr).removeClass("pressed");
        },100);
        //implement a delay using async and await promise and responses :(((since we don't have any delay without callback)))
        await delay(500);

    }

}