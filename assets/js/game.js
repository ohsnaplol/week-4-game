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
      currentHero = new Warrior();
      $("#playerwarrior").show();
      $(".playerHP").html(currentHero.hp + "hp");
      $("#enemywizard,#enemyrogue,#enemypriest").show();
    } else if (hero === "wi") {
      currentHero = new Wizard();
      $("#playerwizard").show();
      $(".playerHP").html(currentHero.hp + "hp");
      $("#enemywarrior,#enemyrogue,#enemypriest").show();
    } else if (hero === "ro") {
      currentHero = new Rogue();
      $("#playerrogue").show();
      $(".playerHP").html(currentHero.hp + "hp");
      $("#enemywarrior,#enemywizard,#enemypriest").show();
    } else if (hero === "pr") {
      currentHero = new Priest();
      $("#playerpriest").show();
      $(".playerHP").html(currentHero.hp + "hp");
      $("#enemywarrior,#enemywizard,#enemyrogue").show();
    }
  }

  // Select defender for player to atk, remove from enemy list
  $("#enemywarrior").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = new Warrior();
      $("#enemywarrior").hide();
      $("#defendingwarrior,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });
  $("#enemywizard").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = new Wizard();
      $("#enemywizard").hide();
      $("#defendingwizard,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });
  $("#enemyrogue").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = new Rogue();
      $("#enemyrogue").hide();
      $("#defendingrogue,#currentDefenderLabel,#attackButton").show();
      $(".enemyHP").html(currentDefender.hp + "hp");
      playerCanChooseEnemy = false;
    }
  });
  $("#enemypriest").on("click", function() {
    if (playerCanChooseEnemy) {
      currentDefender = new Priest();
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
      if(currentHero.id === "Priest") {
        currentHero.hp += 15;
        $("#msg1").append(" You healed yourself for 15! ");
      }
      currentHero.atk += currentHero.atk;
      $(".enemyHP").html(currentDefender.hp + "hp");
      // if bad guy is still alive
      if (currentDefender.hp > 0) {
        if(currentDefender.id === "Priest") {
          currentDefender.hp += 20;
          $("#msg1").append(" Priest healed himself for 20 hp! ");
        }
        // Bad guy hits player back
        currentHero.hp -= currentDefender.enemyatkBack;
        $(".playerHP").html(currentHero.hp);
        $("#msg2").html(currentDefender.id + " attacked you back for " + currentDefender.enemyatkBack);
        if (currentHero.hp <= 0) {
          $("#msg1").append(" You died");
        }
      } else {
        playerCanChooseEnemy = true;
        $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest,#attackButton").hide();
        $("#msg2").html("You are victorious!");
      }
    }
  })

  $("#restartButton").on("click", function() {
    // console.log("currentHero hp " + currentHero.hp);
    playerCanChooseHero = true;
    playerCanChooseEnemy = true;
    currentHero = null;
    currentDefender = null;
    $("#warrior,#wizard,#rogue,#priest").show();
    $("#enemywarrior,#enemywizard,#enemyrogue,#enemypriest").hide();
    $("#playerwarrior,#playerwizard,#playerrogue,#playerpriest").hide();
    $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest").hide();
    $("#currentCharacterLabel,#attackButton,#currentDefenderLabel,#enemiesLabel").hide();
    $("#msg1").html("");
    $("#msg2").html("");
  })

})

function Warrior()  {
     this.id = "Warrior";
     this.hp = 200;
     this.atk = 9;
     this.enemyatkBack = 30;
   };
function Wizard() {
     this.id = "Wizard";
     this.hp = 150;
     this.atk = 12;
     this.enemyatkBack = 36;
   };
function Rogue() {
     this.id = "Rogue";
     this.hp = 100;
     this.atk = 20;
     this.enemyatkBack = 45;
   };
function Priest() {
     this.id = "Priest";
     this.hp = 100;
     this.atk = 5;
     this.enemyatkBack = 15;
   };
