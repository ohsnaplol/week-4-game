$(document).ready(function() {
  var playerCanChooseHero = true;
  var playerCanChooseEnemy = true;
  var playerCanAttack = false;
  var currentHero;
  var currentDefender;

  $("#enemywarrior,#enemywizard,#enemyrogue,#enemypriest").hide();
  $("#playerwarrior,#playerwizard,#playerrogue,#playerpriest").hide();
  $("#defendingwarrior,#defendingwizard,#defendingrogue,#defendingpriest").hide();

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

  $("#enemywarrior").on("click", function() {
    currentDefender = characters.Warrior;
    console.log(currentDefender.health);
  });
  $("#enemywizard").on("click", function() {
    currentDefender = characters.Wizard;
    console.log(currentDefender.health);
  });
  $("#enemyrogue").on("click", function() {
    currentDefender = characters.Rogue;
    console.log(currentDefender.health);
  });
  $("#enemypriest").on("click", function() {
    currentDefender = characters.Priest;
    console.log(currentDefender.health);
  });

  function setupGame(hero) {
    $("#warrior,#wizard,#rogue,#priest").hide();
    // Move current character and enemies into position
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
    } else if (hero === "pri") {
      currentHero = characters.Priest;
      $("#playerpriest").show();
      $("#enemywarrior,#enemywizard,#enemyrogue").show();
    }
  }

  $("#attackButton").on("click", function() {

  })
})

var characters = {
   Warrior: {
     health: 200,
     attack: 9,
     enemyAttackBack: 15
   },
   Wizard: {
     health: 150,
     attack: 12,
     enemyAttackBack: 15
   },
   Rogue: {
     health: 100,
     attack: 20,
     enemyAttackBack: 15
   },
   Priest: {
     health: 300,
     attack: 5,
     enemyAttackBack: 15
   }
 }
