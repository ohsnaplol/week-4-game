$(document).ready(function() {
  var playerCanChooseHero = true;
  var playerCanChooseEnemy = true;
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
      console.log("currentDefender hp is now" + currentDefender.hp);
      $("#enemywarrior").hide();
      $("#defendingwarrior,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });
  $("#enemywizard").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Wizard;
      console.log("currentDefender hp is now" + currentDefender.hp);
      $("#enemywizard").hide();
      $("#defendingwizard,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });
  $("#enemyrogue").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Rogue;
      console.log("currentDefender hp is now" + currentDefender.hp);
      $("#enemyrogue").hide();
      $("#defendingrogue,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });
  $("#enemypriest").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = characters.Priest;
      console.log("currentDefender hp is now" + currentDefender.hp);
      $("#enemypriest").hide();
      $("#defendingpriest,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });

  $("#attackButton").on("click", function() {
    // if player has health and enemy has health
    if (currentHero.hp > 0 && currentDefender.hp > 0) {
      // Player hits the bad guy, msg1 shows how much dmg it did, hp label updates
      currentDefender.hp -= currentHero.atk;
      $("#msg1").html("You attacked " + currentDefender.id + " for " + currentHero.atk);
      currentHero.atk += currentHero.atk;
      $(".enemyHP").html(currentDefender.hp + "hp");
      // if bad guy is still alive
      if (currentDefender.hp > 0) {
        if(currentDefender.id === "Priest") {
          currentDefender.hp += 10;
          $("#msg1").append(" Priest healed himself for 10 hp!");
        }
        // Bad guy hits player back
        currentHero.hp -= currentDefender.enemyatkBack;
        $(".playerHP").html(currentHero.hp);
        $("#msg2").html(currentDefender.id + " attacked you back for " + currentDefender.enemyatkBack);
        if (currentHero.hp <= 0) {
          $("#msg1").append("You died");
        }
      } else {
        playerCanChooseEnemy = true;
        $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest,#attackButton").hide();
        $("#msg2").html("You are victorious!");
      }
    }
  })

  $("#restartButton").on("click", function() {
    var playerCanChooseHero = true;
    var playerCanChooseEnemy = true;
    $("#warrior,#wizard,#rogue,#priest").show();
    $("#enemywarrior,#enemywizard,#enemyrogue,#enemypriest").hide();
    $("#playerwarrior,#playerwizard,#playerrogue,#playerpriest").hide();
    $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest").hide();
    $("#currentCharacterLabel,#atkButton,#currentDefenderLabel,#enemiesLabel").hide();
    $("#attackButton").hide();
  })

})

var characters = {
   Warrior: {
     id: "Warrior",
     hp: 200,
     atk: 9,
     enemyatkBack: 9
   },
   Wizard: {
     id: "Wizard",
     hp: 150,
     atk: 12,
     enemyatkBack: 12
   },
   Rogue: {
     id: "Rogue",
     hp: 100,
     atk: 20,
     enemyatkBack: 20
   },
   Priest: {
     id: "Priest",
     hp: 100,
     atk: 5,
     enemyatkBack: 5
   }
 }
