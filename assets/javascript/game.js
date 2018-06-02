$(document).ready(function(){

var rpgGame = {
    // Number of wins and losses
    countWin: 0,
    countLose: 0,
    // Available chars from which to choose:
    characters: [ { name: "Luke Skywalker", life: 150, attack: 8, counterAttack: 25, player: false, enemy: false },
                { name: "Jar Jar Binks", life: 120, attack: 5, counterAttack: 35, player: false, enemy: false },
                { name: "Yoda", life: 175, attack: 12, counterAttack: 15, player: false, enemy: false },
                { name: "Darth Vader", life: 250, attack: 10, counterAttack: 20, player: false, enemy: false } ],
    player: 0,
    enemy: 0
};

// Dynamically creating the cards
for (var i = 0; i < rpgGame.characters.length; i++) {
    // Create a div for each character
    var thisChar = "char" + i;
    var charDiv = $("<div>");
    charDiv.addClass("char-card");
    charDiv.attr("id", thisChar);
    charDiv.attr("data-id", i);
    charDiv.attr("data-life", rpgGame.characters[i].life);
    $("#char-select").append(charDiv);

    // Show its name and life on the card
    var charLifeDiv = $("<div>");
    charLifeDiv.addClass("char-stats-div");
    charLifeDiv.attr("id", "char-stats" + i);
    $("#char" + i).append(charLifeDiv);

    var charName = $("<p>");
    charName.html(rpgGame.characters[i].name);
    charName.addClass("bold");
    $("#char-stats" + i).append(charName);

    var charIcon = $("<i>");
    charIcon.addClass("fa fa-heart");
    $("#char-stats" + i).append(charIcon);

    var charLife = $("<span>");
    charLife.html("&nbsp;" + $("#char" + i).attr("data-life"));
    $("#char-stats" + i).append(charLife);
};


// Choosing the player
$(".char-card").on("click", function() {
    if (rpgGame.player === 0) {
        var selectedPlayer = "#char" + $(this).attr("data-id");
        $("#battle-player").append($(selectedPlayer));
        rpgGame.player++;
        rpgGame.characters[$(this).attr("data-id")].player = true;
    };

});

console.log(rpgGame.player);


// Animations
// if ($(this).attr("data-player") === false && $(this).attr("data-enemy") === false) {
    $(".char-card").hover(function(){
        $(this).css('z-index', "20");
        $(this).animate({
            width: "180px",
            height: "230px",
        }, "fast");
    }, function() {
        $(this).css('z-index', "2");
        $(this).animate({
            width: "156px",
            height: "200px"
        }, "fast");
    });
// }


});