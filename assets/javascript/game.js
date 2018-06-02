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
    player: false,
    enemy: false
};

// Dynamically creating the cards
for (var i = 0; i < rpgGame.characters.length; i++) {
    // Create a div for each character
    var thisChar = "char" + i;
    var charDiv = $("<div>");
    charDiv.addClass("char-card hover-on");
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
        if (rpgGame.player === false && rpgGame.enemy === false) {
            var selectedPlayer = "#char" + $(this).attr("data-id");
            $("#battle-player").append($(selectedPlayer));
            rpgGame.player = true;
            rpgGame.characters[$(this).attr("data-id")].player = true;
            $(selectedPlayer).removeClass("hover-on");
        } else if (rpgGame.player === true && rpgGame.enemy === false) {
            var selectedEnemy = "#char" + $(this).attr("data-id");
            $("#battle-enemy").append($(selectedEnemy));
            rpgGame.enemy = true;
            rpgGame.characters[$(this).attr("data-id")].enemy = true;
            $(selectedEnemy).removeClass("hover-on");
        };
    });





// Animations
    // On mouse over - Cards
    $(document).on("mouseover", ".hover-on", function(){
        $(this).css('z-index', "20");
        $(this).animate({
            width: "13vw",
            height: "35vh",
        }, "fast");
    });

    // On mouse leave - Cards
    $(document).on("mouseleave", ".hover-on", function(){
        $(this).css('z-index', "2");
        $(this).animate({
            width: "11vw",
            height: "32vh"
        }, "fast");
    });



});