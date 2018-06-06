$(document).ready(function(){

var rpgGame = {
    // Number of wins and losses
    countWin: 0,
    countLose: 0,
    // Available chars from which to choose:
    characters: [ { name: "Luke Skywalker", life: 160, attack: 8, counterAttack: 18, player: false, enemy: false },
                { name: "Jar Jar Binks", life: 150, attack: 10, counterAttack: 20, player: false, enemy: false },
                { name: "Yoda", life: 175, attack: 9, counterAttack: 15, player: false, enemy: false },
                { name: "Darth Vader", life: 200, attack: 11, counterAttack: 16, player: false, enemy: false } ],
    player: false,
    enemy: false,
    firstInstruction: function() {
        $("#instructions").text("Select your character");
    },

    repick: function(){
        var player = $("#battle-player").find(".char-card");
        player.css({"z-index": "2", "width": "140px", "height": "180px"});
        player.addClass("hover-on");
        player.removeAttr("id");
        player.removeAttr("data-selected");
        var playerId = $("#battle-player").find(".char-card").attr("data-id");
        player.attr("id", "char" + playerId);
        $("#char-select").append(player);

        var enemy = $("#battle-enemy").find(".char-card");
        enemy.css({"z-index": "2", "width": "140px", "height": "180px"});
        enemy.addClass("hover-on");
        enemy.removeAttr("id");
        enemy.removeAttr("data-selected");
        var enemyId = $("#battle-enemy").find(".char-card").attr("data-id");
        enemy.attr("id", "char" + enemyId);
        $("#char-select").append(enemy);

        rpgGame.player = false;
        rpgGame.enemy = false;
        $(this).remove();
        $("#confirmButton").remove();

        rpgGame.firstInstruction();
    },

    confirm: function() {
        $("#confirmButton").remove();
        $("#repickButton").remove();
        $("#versus").remove();
        var button = $("<button>ATTACK</button>");
        button.attr("id", "attackButton");
        button.click(rpgGame.attack);
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
                charUnselected.removeClass("grey-font");    
            }
    },

    attack: function() {
        // Get attack and life values from player, and the counter attack and life values from enemy
        var player = $("#battle-player").find($(".char-card"));
        var playerIndex = player.attr("data-id");
        var playerAttack = parseInt(player.attr("data-attack"));
        // This will be the updated attack value after each press of the 'attack' button
        var playerHitPoints = playerAttack;
        var playerLife = parseInt(player.attr("data-life"));
        var playerName = rpgGame.characters[playerIndex].name;
        
        var enemy = $("#battle-enemy").find($(".char-card"));
        var enemyIndex = enemy.attr("data-id");
        var enemyCounterAttack = parseInt(enemy.attr("data-counter-attack"));
        var enemyLife = parseInt(enemy.attr("data-life"));
        var enemyName = rpgGame.characters[enemyIndex].name;
    
        // Substract player's attack value from enemy's life
        // Increase player's attack value by its original value
        playerHitPoints += rpgGame.characters[playerIndex].attack;
        player.attr("data-attack", playerHitPoints);
        // console.log("Hit points: " + playerHitPoints);
        
        enemyLife -= playerHitPoints;
        enemy.attr("data-life", enemyLife);
        // console.log("Enemy life: " + enemyLife);
        
        // Append the new life value to the enemy card
        $("#battle-result").text("You attacked " + enemyName + " for " + playerAttack + " damage");    
        $("#char-life"+enemyIndex).html("&nbsp;" + enemyLife);

        // Substract enemy's counter-attack value from player's life
        playerLife -= enemyCounterAttack;
        player.attr("data-life", playerLife);
        $("#battle-result").append("<br>" + enemyName + " attacked you back for " + enemyCounterAttack + " damage");    
        $("#char-life"+playerIndex).html("&nbsp;" + playerLife);

        // Conditional statements to determine if player won or lost
        if (enemyLife <= 0) {
            $("#battle-enemy").empty();
            $("#battle-result").text("You have defeated " + enemyName);
            $("#instructions").text("Pick your next opponent");
            $(".battle").empty();
            $(".battle").append("<img id='versus' src='./assets/images/vs.png' alt='VS'>");

            rpgGame.enemy = false;
            rpgGame.charActive();
            if ($("#char-select div").length === 0) {
                $("#instructions").text("You win!");
                $("#battle-result").text("You have defeated all enemies");
                $("#char-select").empty();
                rpgGame.countWin++;
                $("#count-win").text("Wins: " + rpgGame.countWin);
                // console.clear();
                // console.log(rpgGame.countWin);
                setTimeout(restartGame, 4000);
            }
        }

        if (playerLife <= 0) {
            $("#char-select").empty()
            $("#battle-result").text("You have been defeated by " + enemyName);
            $("#instructions").text("You lose!");
            $(".battle").empty();
            $(".battle").append("<img id='versus' src='./assets/images/vs.png' alt='VS'>");
            $("#battle-player").empty()
            $("#battle-enemy").empty()
            rpgGame.enemy = false;
            rpgGame.countLose++;
            $("#count-lose").text("Losses: " + rpgGame.countLose);
            // console.clear();
            // console.log(rpgGame.countLose);
            setTimeout(restartGame, 3000);
        }
    }
};


// First instruction
rpgGame.firstInstruction();


// Dynamically creating the cards

function createCards() {
    for (var i = 0; i < rpgGame.characters.length; i++) {
        // Create a div for each character
        var thisChar = "char" + i;
        var charDiv = $("<div>");
        charDiv.addClass("char-card hover-on char-img");
        charDiv.click(selectPlayerEnemy);
        charDiv.attr("id", thisChar);
        charDiv.attr("data-id", i);
        charDiv.attr("data-life", rpgGame.characters[i].life);
        charDiv.attr("data-attack", rpgGame.characters[i].attack);
        charDiv.attr("data-counter-attack", rpgGame.characters[i].counterAttack);    
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
        charLife.attr("id", "char-life" + i)
        charLife.html("&nbsp;" + $("#char" + i).attr("data-life"));
        $("#char-stats" + i).append(charLife);
    };
};

createCards();


// Function to restart the game
function restartGame() {
    rpgGame.player = false;
    rpgGame.enemy = false;
    $("#char-select").empty();
    $(".battle").empty();
    $(".battle").append("<img id='versus' src='./assets/images/vs.png' alt='VS'>");
    $("#battle-enemy").empty();
    $("#battle-enemy").append("<span class='span-title'>Enemy</span>");
    $("#battle-player").empty();
    $("#battle-player").append("<span class='span-title'>Player</span>");
    $("#battle-result").text("");
    rpgGame.firstInstruction();
    createCards();
};


// Choosing the player and enemy
function selectPlayerEnemy() {

    // Characters that are not selected
    if ($(this).attr("data-selected") !== "true") {
        
        // If no characters have been selected, first character is the player
        if (rpgGame.player === false && rpgGame.enemy === false) {
            var selectedPlayer = "#char" + $(this).attr("data-id");
            $("#battle-player").append($(selectedPlayer));
            rpgGame.player = true;
            rpgGame.characters[$(this).attr("data-id")].player = true;
            $(selectedPlayer).attr("data-selected", true);
            $(selectedPlayer).removeClass("hover-on");

            $("#instructions").empty();
            $("#instructions").text("Choose your enemy");

        // If player has been selected, enemy will be selected
        } else if (rpgGame.player === true && rpgGame.enemy === false) {
            var selectedEnemy = "#char" + $(this).attr("data-id");
            $("#battle-enemy").append($(selectedEnemy));
            rpgGame.enemy = true;
            rpgGame.characters[$(this).attr("data-id")].enemy = true;
            $(selectedEnemy).attr("data-selected", true);
            $(selectedEnemy).removeClass("hover-on");

            // If 2 characters remain unselected, create buttons
            if ($("#char-select div").length === 4) {
                
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
            } else {
                rpgGame.confirm();
            };

            $("#instructions").text("Confirm your selection");
            
        };
    }
};


// Animations
    // On mouse over - Cards
    $(document).on("mouseover", ".hover-on", function(){
        $(this).css('z-index', "20");
        $(this).animate({
            width: "156px",
            height: "200px",
        }, "fast");
    });

    // On mouse leave - Cards
    $(document).on("mouseleave", ".hover-on", function(){
        $(this).css('z-index', "2");
        $(this).animate({
            width: "140px",
            height: "180px"
        }, "fast");
    });

});