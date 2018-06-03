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
    enemy: false,
    firstInstruction: function() {
        $("#instructions").text("Select your character");
    },

    repick: function(){
        var player = $("#battle-player").find(".char-card");
        player.css({"z-index": "2", "width": "156px", "height": "200px"});
        player.addClass("hover-on");
        player.removeAttr("id");
        player.removeAttr("data-selected");
        var playerId = $("#battle-player").find(".char-card").attr("data-id");
        player.attr("id", "char" + playerId);
        $("#char-select").append(player);

        var enemy = $("#battle-enemy").find(".char-card");
        enemy.css({"z-index": "2", "width": "156px", "height": "200px"});
        enemy.addClass("hover-on");
        enemy.removeAttr("id");
        enemy.removeAttr("data-selected");
        var enemyId = $("#battle-enemy").find(".char-card").attr("data-id");
        enemy.attr("id", "char" + enemyId);
        $("#char-select").append(enemy);

        rpgGame.player = false;
        rpgGame.enemy = false;
        $(this).remove();
        $("#versus").remove();
        $("#confirmButton").remove();

        rpgGame.firstInstruction();
    },

    confirm: function() {
        $("#confirmButton").remove();
        $("#repickButton").remove();
        $("#versus").remove();
        var button = $("<button>ATTACK</button>");
        button.attr("id", "attackButton");
        button.on("click", rpgGame.attack);
        button.append("&nbsp;");
        button.append($("<i>").addClass("fas fa-arrow-circle-right"));
        $(".battle").append(button);
        $("#instructions").text("Fight!");
        rpgGame.charInactive();
    },

    // This function will make the unselected characters "inactive" while battle is in progress
    charInactive: function() {
        for (var i = 0; i < rpgGame.characters.length; i++) {
            var charUnselected = $("#char" + i);

            if (!charUnselected.attr("data-selected") === true) {
                charUnselected.removeClass("hover-on");
                charUnselected.attr("id", "char" + i + "-gs");
                charUnselected.addClass("grey-font");
            };
        };
    },

    // This function will make the unselected characters available again after battle is finished
    charActive: function() {
        for (var i = 0; i < rpgGame.characters.length; i++) {
            var charUnselected = $("#char" + i + "-gs");
                charUnselected.removeAttr("id");
                charUnselected.attr("id", "char" + i);
                charUnselected.addClass("hover-on");
        }
    },

    attack: function() {
        // Get attack and life values from player, and the counter attack and life values from enemy
        var playerIndex = $("#battle-player").find($(".char-card")).attr("data-id");
        var playerAttack = rpgGame.characters[playerIndex].attack;
        // This will be the updated attack value after each press of the 'attack' button
        var playerHitPoints = rpgGame.characters[playerIndex].attack;
        var playerLife = rpgGame.characters[playerIndex].life;
        var playerName = rpgGame.characters[playerIndex].name;
        
        var enemyIndex = $("#battle-enemy").find($(".char-card")).attr("data-id");
        var enemyCounterAttack = rpgGame.characters[enemyIndex].counterAttack;
        var enemyLife = rpgGame.characters[enemyIndex].life;
        var enemyName = rpgGame.characters[enemyIndex].name;

        // Substract player's attack value from enemy's life
        enemyLife -= playerHitPoints;
        playerHitPoints = playerHitPoints + playerAttack;
        
        
        console.log(enemyLife);
        console.log(rpgGame.characters[enemyIndex].life);
        console.log(playerHitPoints);
        
        

        $("#battle-result").text("You attacked " + enemyName + " for " + playerAttack + " damage");
        

        // Append the new life value to the enemy card
        // Increase player's attack value by its original value

        
        // Substract that value from player's life

        // Conditional statement determines if player or enemy won
        // Act accordingly
    }
};


// First instruction
rpgGame.firstInstruction();


// Dynamically creating the cards
for (var i = 0; i < rpgGame.characters.length; i++) {
    // Create a div for each character
    var thisChar = "char" + i;
    var charDiv = $("<div>");
    charDiv.addClass("char-card hover-on char-img");
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


// Choosing the player and enemy
$(".char-card").on("click", function() {

        if (rpgGame.player === false && rpgGame.enemy === false) {
            var selectedPlayer = "#char" + $(this).attr("data-id");
            $("#battle-player").append($(selectedPlayer));
            rpgGame.player = true;
            rpgGame.characters[$(this).attr("data-id")].player = true;
            $(selectedPlayer).attr("data-selected", true);
            $(selectedPlayer).removeClass("hover-on");
            
            var imageVersus = $("<img>");
            imageVersus.attr("id", "versus");
            imageVersus.attr("src", "./assets/images/vs.png");
            imageVersus.attr("alt", "VS");
            $(".battle").append(imageVersus);

            $("#instructions").empty();
            $("#instructions").text("Choose your enemy");

        } else if (rpgGame.player === true && rpgGame.enemy === false) {
            var selectedEnemy = "#char" + $(this).attr("data-id");
            $("#battle-enemy").append($(selectedEnemy));
            rpgGame.enemy = true;
            rpgGame.characters[$(this).attr("data-id")].enemy = true;
            $(selectedEnemy).attr("data-selected", true);
            $(selectedEnemy).removeClass("hover-on");

            var repickButton = $("<button>Pick again</button>");
            repickButton.click(rpgGame.repick);
            $(".battle").append($(repickButton));
            var changeIcon = $("<i>");
            changeIcon.addClass("fas fa-sync");
            repickButton.attr("id", "repickButton");
            repickButton.prepend("&nbsp;");
            repickButton.prepend(changeIcon);

            var confirmButton = $("<button>Fight!</button>");
            confirmButton.click(rpgGame.confirm);
            confirmButton.attr("id", "confirmButton")
            $(".battle").append($(confirmButton));
            var changeIcon = $("<i>");
            changeIcon.addClass("fas fa-thumbs-up");
            confirmButton.prepend("&nbsp;");
            confirmButton.prepend(changeIcon);

            $("#instructions").empty();
        };

        
    });





// Animations
    // On mouse over - Cards
    $(document).on("mouseover", ".hover-on", function(){
        $(this).css('z-index', "20");
        $(this).animate({
            width: "180px",
            height: "230px",
        }, "fast");
    });

    // On mouse leave - Cards
    $(document).on("mouseleave", ".hover-on", function(){
        $(this).css('z-index', "2");
        $(this).animate({
            width: "156px",
            height: "200px"
        }, "fast");
    });

});