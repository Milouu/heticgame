$(document).ready(function(){

  var cube = $(".image"),
      balle = $("#balle"),
      jeu = $("#jeu"),
      deplacements = [50,200,350],
      depCount = 1,
      posX = 840,
      posY = 0,
      dirX = 10,
      dirY = 0,
      largeurJeu = 960,
      hauteurJeu = 600,
      vitesse = 40;

  init();
  function init(){
    jeu.css("width", largeurJeu);
    jeu.css("height", hauteurJeu);
    balle.css("top", deplacements[depCount]);
  }

  $(document).keydown(function(touche){
    var appui = touche.which || touche.keyCode;
    var top = parseInt(balle.css("top"));
    if(appui == 38 || appui == 90){
      if(depCount>0){
        depCount --;
      }
      balle.css("top", deplacements[depCount]);  
    } else if(appui == 40 || appui == 83){
      if(depCount<2){
        depCount ++;
      }
      balle.css("top", deplacements[depCount]);
    }
  });

});