$(document).onReady(function() {
  var currentHero;
  var playerIsSelectingHero = true;

  $("#warrior").on("click", function() {
    if playerIsSelectingHero {
      currentHero = "wa";
    }
    playerIsSelectingHero = false;
  });
  $("#wizard").on("click", function() {
    if playerIsSelectingHero {
      currentHero = "wi";
    }
    playerIsSelectingHero = false;
  });
  $("#rogue").on("click", function() {
    if playerIsSelectingHero {
      currentHero = "ro";
    }
    playerIsSelectingHero = false;
  });
  $("#priest").on("click", function() {
    if playerIsSelectingHero {
      currentHero = "pr";
    }
    playerIsSelectingHero = false;
  });

  function startGame(hero) {
    $("#currentCharacter").innerHTML("");
  }
})

var hero {
  hp,
  atk;
}
