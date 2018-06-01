$(document).ready(function(){
    
var rpgGame = {
    // Number of wins and losses
    countWin: 0,
    countLose: 0,
    // Available chars from which to choose:
    characters: [ { id: "char0", name: "Luke Skywalker", life: 150, attack: 8, counterAttack: 25, player: false, enemy: false },
                { id: "char1", name: "Jar Jar Bings", life: 120, attack: 5, counterAttack: 35, player: false, enemy: false },
                { id: "char2", name: "Yoda", life: 175, attack: 12, counterAttack: 15, player: false, enemy: false },
                { id: "char3", name: "Darth Vader", life: 250, attack: 10, counterAttack: 20, player: false, enemy: false } ],
    
};

for (var i = 0; i < rpgGame.characters.length; i++) {
    // Create a div for each character
    var thisChar = "char" + i;
    var charDiv = $("<div>");
    charDiv.attr("id", thisChar);
    charDiv.attr("data-life", rpgGame.characters[i].life);
    $("#char-select").append(charDiv);

    // Show their life on the card
    var charIcon = $("<i>");
    charIcon.addClass("fab fa-gratipay fa-lg");
    $("#char" + i).append(charIcon);

    var charLife = $("<span>test</span>");
    charLife.html("&nbsp;" + $("#char" + i).attr("data-life"));
    $("#char" + i).append(charLife);
};


});