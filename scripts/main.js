$(document).ready(function(){

  //Variables  
    // General
  var ball = $("#ball"),
      ballPos = ball.css("left");
      ballColor = ball.attr("data-color");
      game = $("#jeu"),
      gameWidth = 960,
      gameHeight = 500,
      speed = 40,

    // Deplacement balle  
      movements = [54,189,339],
      movCount = 1,

    // Background
      bgFar = $("#bg_far"),
      bgMid = $("#bg_middle"),
      bgFront = $("#bg_front"),
      bgImages = [bgFar, bgMid, bgFront],

    // Cubes
      // Cube1
      topCube = $("#topCube"),
      posTopX = 940,
      posTopY = 0,
      dirTopX = 10,

      // Cube2

      midCube = $("#midCube"),
      posMidX = 940,
      posMidY = 150,
      dirMidX = 10,

      // Cube3

      botCube = $("#botCube"),
      posBotX = 940,
      posBotY = 300,
      dirBotX = 10,
        
    //Generation couleurs
      cubes = [topCube, midCube, botCube],
      cubesPos = [posTopX, posMidX, posBotX],
      colors = ['orange', 'blue', 'green'],
      randomColor = colors[Math.floor(Math.random()*3)],
      ballColor = ball.attr("data-color");
  

  //Lancement du jeu
  init(); 

  //Fonction d'initialisation du jeu
  function init(){ 
    game.css("width", gameWidth);
    game.css("height", gameHeight);
    ball.css("top", movements[movCount]);

    setInterval(
      function(){
        //generateTopCube();
        //generateMidCube();
        //generateBotCube();
        generateCubes();
        moveTopCube();
        moveMidCube();
        moveBotCube();
      }
      ,
      speed
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

  function moveTopCube(){
    posTopX = posTopX - dirTopX;
    topCube.css("left", posTopX);

    if(posTopX < -115){
      posTopX = 940;
    }
  }

  function moveMidCube(){
    posMidX = posMidX - dirMidX;
    midCube.css("left", posTopX);

    if(posMidX < -115){
      posMidX = 940;
    }
  }

  function moveBotCube(){
    posBotX = posBotX - dirBotX;
    botCube.css("left", posBotX);

    if(posBotX < -115){
      posBotX = 940;
    }
  }


  //Fonction de déplacement de la balle à l'appui sur les touches

  $(document).keydown(function(key){
    var press = key.which || key.keyCode;
    var top = parseInt(ball.css("top"));
    if(press == 38 || press == 90){
      if(movCount>0){
        movCount --;
      }
      ball.css("top", movements[movCount]);  
    } else if(press == 40 || press == 83){
      if(movCount<2){
        movCount ++;
      }
      ball.css("top", movements[movCount]);
    }
  });




  // Fonctions servant à la génération aléatoire des cubes

    //Renvoie un tableau de 3 couleurs aléatoires
  function generateColorTab(){
    var color1 = colors[Math.floor(Math.random()*3)],
        color2 = colors[Math.floor(Math.random()*3)],
        color3 = colors[Math.floor(Math.random()*3)],
        randomColors = [color1, color2, color3];
    
    return randomColors;
  }

    //Fonction générant les cubes
  function generateCubes(){
    
      //Génère les cubes quand ceux-ci sont initialisés ou reviennent à la position de départ
    if(posTopX == 940){  
      
        //Sécurise la génération de couleurs pour que les 3 blocs ne soient pas tous de la même couleur et qu'au moins un d'entre eux soient de la couleur de la balle
      do{ 
        var colorTab = generateColorTab();
      }while(colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) /*|| (colorTab[0] != ballColor && colorTab[1] != ballColor && colorTab[2] != ballColor)*/;

       //Charge les cubes en fonction du tableau alétoire de couleurs généré
      for(var i=0; i < cubes.length ; i++){
        if(colorTab[i] == 'orange'){
          cubes[i].attr("src", "images/orange_cube_horizontal.svg");
          cubes[i].attr("data-color", "orange");
        } else if(colorTab[i] == 'blue'){
          cubes[i].attr("src", "images/blue_cube_horizontal.svg");
          cubes[i].attr("data-color", "blue");
        } else if(colorTab[i] == 'green'){
          cubes[i].attr("src", "images/green_cube_horizontal.svg");
          cubes[i].attr("data-color", "green");
        }
      }  
    }
  }
  
  /*
    //Fonction gérant les collisions
  function collision(){
    if(movCount == 0){
      if(ballPos == posTopXX && ballColor != cubeColor)
    }
  }
  */
  
});  
