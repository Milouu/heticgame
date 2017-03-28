$(document).ready(function(){

    // General 
  
  var balle = $("#balle"),
      jeu = $("#jeu"),
      largeurJeu = 960,
      hauteurJeu = 500,
      vitesse = 40,
      
    // Deplacement balle  
      deplacements = [50,200,350],
      depCount = 1,
      
    // Background
      
      bgFar = $("#bg_far"),
      bgMid = $("#bg_middle"),
      bgFront = $("#bg_front"),
      bgImages = [bgFar, bgMid, bgFront],
      
    // Cubes
      // Cube1
      
      cube1 = $("#orange"),
      posX = 840,
      posY = 0,
      dirX = 10,
      dirY = 0,
      
      // Cube2
      
      cube2 = $("#bleu"),
      posA = 840,
      posB = 150,
      dirA = 10,
      dirB = 0,
      
      // Cube3
      
      cube3 = $("#vert"),
      posC = 840,
      posD = 300,
      dirC = 10,
      dirD = 0;


  init();
  
  //Fonction d'initialisation du jeu
  function init(){ 
    jeu.css("width", largeurJeu);
    jeu.css("height", hauteurJeu);
    balle.css("top", deplacements[depCount]);
    console.log(bgImages);

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
  
  // Fonctions de déroulement du background
  
  bgFarMovement();
  bgMidMovement();
  bgFrontMovement();
  
    //Fonction déroulement des montagnes du fond
  
  function bgFarMovement(){
    var x=0;
    /*     
        vitesseBg = 10;
   
    for(var i=0; i<bgImages.length; i++){
      setInterval(function(){
        x-=1;
        bgImages[i].css("background-position", x);
      }, vitesseBg * (i+1));
    }
    */
    
    setInterval(function(){
      x-=1;
      bgFar.css("background-position", x);
    }, 14);
  }
  
    //Fonction déplacement des montagnes du milieu
  
  function bgMidMovement(){
    var x = 0;
    
    setInterval(function(){
      x-=1;
      bgMid.css("background-position", x);
    }, 14);
  }
  
    //Fonction déplacement des montagnes avant
  
  function bgFrontMovement(){
    var x = 0;
    
     setInterval(function(){
      x-=1;
      bgFront.css("background-position", x);
    }, 14);
  }

  //Fonction de déplacement des cubes 
  
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

    
  //Fonction de déplacement de la balle à l'appui sur les touches

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