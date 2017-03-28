$(document).ready(function(){

  //Variables  
    // General
  var balle = $("#balle"),
      jeu = $("#jeu"),
      largeurJeu = 960,
      hauteurJeu = 500,
      vitesse = 40,

    // Deplacement balle  
      deplacements = [54,189,339],
      depCount = 1,

    // Background
      bgFar = $("#bg_far"),
      bgMid = $("#bg_middle"),
      bgFront = $("#bg_front"),
      bgImages = [bgFar, bgMid, bgFront],

    // Cubes
      // Cube1
      cube1 = $("#topCube"),
      posX = 940,
      posY = 0,
      dirX = 10,
      dirY = 0,

      // Cube2

      cube2 = $("#midCube"),
      posA = 940,
      posB = 150,
      dirA = 10,
      dirB = 0,

      // Cube3

      cube3 = $("#botCube"),
      posC = 940,
      posD = 300,
      dirC = 10,
      dirD = 0,

    //Generation couleurs
      cubes = [cube1, cube2, cube3],
      cubesPos = [posX, posA, posB],
      couleurs = ['orange', 'bleu', 'vert'],
      randomColor = couleurs[Math.floor(Math.random()*3)],
      ballColor = balle.attr("data-color");
  

  //Lancement du jeu
  init(); 

  //Fonction d'initialisation du jeu
  function init(){ 
    jeu.css("width", largeurJeu);
    jeu.css("height", hauteurJeu);
    balle.css("top", deplacements[depCount]);

    setInterval(
      function(){
        //generateTopCube();
        //generateMidCube();
        //generateBotCube();
        generateCubes();
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




  // Fonctions servant à la génération aléatoire des cubes

    //Renvoie un tableau de 3 couleurs aléatoires
  function generateColorTab(){
    var color1 = couleurs[Math.floor(Math.random()*3)],
        color2 = couleurs[Math.floor(Math.random()*3)],
        color3 = couleurs[Math.floor(Math.random()*3)],
        randomColors = [color1, color2, color3];
    
    return randomColors;
  }

    //Fonction générant les cubes
  function generateCubes(){
    
      //Génère les cubes quand ceux-ci sont initialisés ou reviennent à la position de départ
    if(posX == 940){  
      
        //Sécurise la génération de couleurs pour que les 3 blocs ne soient pas tous de la même couleur et qu'au moins un d'entre eux soient de la couleur de la balle
      do{ 
        var colorTab = generateColorTab();
      }while(colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) /*|| (colorTab[0] != ballColor && colorTab[1] != ballColor && colorTab[2] != ballColor)*/;

       //Charge les cubes en fonction du tableau alétoire de couleurs généré
      for(var i=0; i < cubes.length ; i++){
        if(colorTab[i] == 'orange'){
          cubes[i].attr("src", "images/orange_cube_horizontal.svg");
          cubes[i].attr("data-color", "orange");
        } else if(colorTab[i] == 'bleu'){
          cubes[i].attr("src", "images/blue_cube_horizontal.svg");
          cubes[i].attr("data-color", "blue");
        } else if(colorTab[i] == 'vert'){
          cubes[i].attr("src", "images/green_cube_horizontal.svg");
          cubes[i].attr("data-color", "green");
        }
      }  
    }
  }
});  
