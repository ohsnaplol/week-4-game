$(document).ready(function() {
  var playerCanChooseHero = true;
  var playerCanChooseEnemy = true;
  var playerCanatk = false;
  var currentHero;
  var currentDefender;

  $("#enemywarrior,#enemywizard,#enemyrogue,#enemypriest").hide();
  $("#playerwarrior,#playerwizard,#playerrogue,#playerpriest").hide();
  $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest").hide();
  $("#currentCharacterLabel,#atkButton,#currentDefenderLabel,#enemiesLabel").hide();
  $("#attackButton").hide();

  // Player picks the hero they want to be
  $("#warrior").on("click", function() {
    if (playerCanChooseHero) {
      setupGame("wa");
      playerCanChooseHero = false;
    }
  });
  $("#wizard").on("click", function() {
    if (playerCanChooseHero) {
      setupGame("wi");
      playerCanChooseHero = false;
    }
  });
  $("#rogue").on("click", function() {
    if (playerCanChooseHero) {
      setupGame("ro");
      playerCanChooseHero = false;
    }
  });
  $("#priest").on("click", function() {
    if (playerCanChooseHero) {
      setupGame("pr");
      playerCanChooseHero = false;
    }
  });

  // Once a hero is chosen, move player and and enemies into position
  // Set currentHero variable to what player chose
  // Show enemies
  function setupGame(hero) {
    $("#warrior,#wizard,#rogue,#priest").hide();
    $("#chooseCharacterLabel").hide();
    $("#currentCharacterLabel,#enemiesLabel").show();

    if(hero === "wa") {
      currentHero = characters.Warrior;
      $("#playerwarrior").show();
      $("#enemywizard,#enemyrogue,#enemypriest").show();
    } else if (hero === "wi") {
      currentHero = characters.Wizard;
      $("#playerwizard").show();
      $("#enemywarrior,#enemyrogue,#enemypriest").show();
    } else if (hero === "ro") {
      currentHero = characters.Rogue;
      $("#playerrogue").show();
      $("#enemywarrior,#enemywizard,#enemypriest").show();
    } else if (hero === "pr") {
      currentHero = characters.Priest;
      $("#playerpriest").show();
      $("#enemywarrior,#enemywizard,#enemyrogue").show();
    }
  }

  // Select defender for player to atk, remove from enemy list
  $("#enemywarrior").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Warrior;
      $("#enemywarrior").hide();
      $("#defendingwarrior,#currentDefenderLabel,#attackButton").show();
      playerCanChooseEnemy = false;
    }
  });
  $("#enemywizard").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Wizard;
      $("#enemywizard").hide();
      $("#defendingwizard,#currentDefenderLabel,#attackButton").show();
      playerCanChooseEnemy = false;
    }
  });
  $("#enemyrogue").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Rogue;
      $("#enemyrogue").hide();
      $("#defendingrogue,#currentDefenderLabel,#attackButton").show();
      playerCanChooseEnemy = false;
    }
  });
  $("#enemypriest").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Priest;
      $("#enemypriest").hide();
      $("#defendingpriest,#currentDefenderLabel,#attackButton").show();
      playerCanChooseEnemy = false;
    }
  });

  $("#attackButton").on("click", function() {
    // if player has health and enemy has health
    if (currentHero.hp > 0 && currentDefender.hp > 0) {
      // Player hits the bad guy and is buffed
      currentDefender.hp -= currentHero.atk;
      currentHero.atk += currentHero.atk;
      // if bad guy is still alive
      if (currentDefender.hp > 0) {
        if(currentDefender.id === "pr") {
          currentDefender.hp += 10;
          console.log("The priest healed himself for 10hp!");
        }
        // Bad guy hits player back
        currentHero.hp -= currentDefender.enemyatkBack;
        if (currentHero.hp <= 0) {
          console.log("You died");
        }
      } else {
        playerCanChooseEnemy = true;
        $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest,#attackButton").hide();
        console.log("You defeated enemy");
      }
      console.log("Your hero has " + currentHero.hp);
      console.log("Bad guy has " + currentDefender.hp);
    }
  })

})

var characters = {
   Warrior: {
     id: "wa",
     hp: 200,
     atk: 9,
     enemyatkBack: 9
   },
   Wizard: {
     id: "wi",
     hp: 150,
     atk: 12,
     enemyatkBack: 12
   },
   Rogue: {
     id: "ro",
     hp: 100,
     atk: 20,
     enemyatkBack: 20
   },
   Priest: {
     id: "pr",
     hp: 100,
     atk: 5,
     enemyatkBack: 5
   }
 }
