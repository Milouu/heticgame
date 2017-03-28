$(document).ready(function(){


  var cube1 = $("#orange"),
      balle = $("#balle"),
      jeu = $("#jeu"),
      deplacements = [50,200,350],
      depCount = 1,
      posX = 840,
      posY = 0,
      dirX = 10,
      dirY = 0,
      largeurJeu = 960,
      hauteurJeu = 500,
      vitesse = 40,
      cube2 = $("#bleu"),
      posA = 840,
      posB = 150,
      dirA = 10,
      dirB = 0,
      cube3 = $("#vert"),
      posC = 840,
      posD = 300,
      dirC = 10,
      dirD = 0;


  init();
  function init(){
    jeu.css("width", largeurJeu);
    jeu.css("height", hauteurJeu);
    balle.css("top", deplacements[depCount]);

    setInterval(
      function(){
        bougerCube();
        bougerCube2();
        bougerCube3();
      }
      ,
      vitesse
    );
  }

  function bougerCube(){
    posX = posX - dirX;
    posY = posY + dirY;
    cube1.css("left", posX);
    cube1.css("top", posY);

    if(posX < -115){
      posX = 940;
    }
  }

  function bougerCube2(){
    posA = posA - dirA;
    posB = posB + dirB;
    cube2.css("left", posA);
    cube2.css("top", posB);

    if(posA < -115){
      posA = 940;
    }
  }

  function bougerCube3(){
    posC = posC - dirC;
    posD = posD + dirD;
    cube3.css("left", posC);
    cube3.css("top", posD);

    if(posC < -115){
      posC = 940;
    }
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