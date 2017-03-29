$(document).ready(function(){

  //Variables  
  // General
  var ball = $("#ball"),
      ballPos = parseInt(ball.css("left")),
      ballColor = ball.data("color"), 
      game = $("#game"),
      gameWidth = 960,
      gameHeight = 500,
      speed = 40,
      scoreDisplay = $("#score"),
      score = 0,

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
      topCubeColor = topCube.data("color"),
      midCubeColor = midCube.data("color"),
      botCubeColor = botCube.data("color"),
      cubesColor = [topCubeColor, midCubeColor, botCubeColor],
  
      //Sons
      boSound = $("#boSound"),
      goodCubeSound = $("#goodCubeSound"),
      gameOverSound = $("#gameOverSound");

  //Lancement du jeu
  init(); 
  //Fonction d'initialisation du jeu
  function init(){ 
    game.css("width", gameWidth);
    game.css("height", gameHeight);
    ball.css("top", movements[movCount]);

    setInterval(
      function(){
        scoreDisplay.html(score);
        generateCubes();
        moveTopCube();
        moveMidCube();
        moveBotCube();
        collision();
      }
      ,
      speed
    );
  }

  //Démarre la BO (laisser en commentaire pendant le code)
  playSound(boSound);

  
  // Fonctions de déroulement du background (lag si mis dans le init)
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
    score += (dirTopX/10);

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
      }while((colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) || (colorTab[0] != ballColor && colorTab[1] != ballColor && colorTab[2] != ballColor));

      //Charge les cubes en fonction du tableau alétoire de couleurs généré
      for(var i=0; i < cubes.length ; i++){
        if(colorTab[i] == 'orange'){
          cubes[i].attr("src", "images/orange_cube_horizontal.svg");
          //cubes[i].data('color', 'orange');
          cubesColor[i] = 'orange';
        } else if(colorTab[i] == 'blue'){
          cubes[i].attr("src", "images/blue_cube_horizontal.svg");
          //cubes[i].data('color', 'blue');
          cubesColor[i] = 'blue';
        } else if(colorTab[i] == 'green'){
          cubes[i].attr("src", "images/green_cube_horizontal.svg");
          //cubes[i].data('color', 'green');
          cubesColor[i] = 'green';
        }
      }  
    }
  } 



  //Fonction gérant les collisions : vérifie sur quel fil se trouve la balle et compare sa position et sa couleur avec celles du bloc
  function collision(){
    if(movCount == 0){
      if(ballPos == posTopX && ballColor != cubesColor[0]){
        stopSound(boSound);
        playSound(gameOverSound);
        dirTopX = 0;
        dirMidX = 0;
        dirBotX = 0;
        posTopX --;
        console.log("Game Over");
        console.log("Score :" + score);
      } else if(ballPos == posTopX && ballColor == cubesColor[0]){
        console.log("Good");
        score +=100;
        playSound(goodCubeSound);
        generateNewBall();
      }
    } else if(movCount == 1){

      //console.log("mid : " + midCubeColor);
      //console.log("cubes[1] : " + cubesColor[1]);
      //console.log($("#midCube").data("color"));

      if(ballPos == posMidX && ballColor != cubesColor[1]){
        stopSound(boSound);
        playSound(gameOverSound);
        dirTopX = 0;
        dirMidX = 0;
        dirBotX = 0;
        posMidX --;
        console.log("Game Over");
        console.log("Score :" + score);
      } else if(ballPos == posMidX && ballColor == cubesColor[1]){
        console.log("Good");
        score +=100;
        playSound(goodCubeSound);
        generateNewBall();
      } 
    }else if(movCount == 2){
      if(ballPos == posBotX && ballColor != cubesColor[2]){
        stopSound(boSound);
        playSound(gameOverSound);
        dirTopX = 0;
        dirMidX = 0;
        dirBotX = 0;
        posBotX --;
        console.log("Game Over");
        console.log("Score :" + score);
      } else if(ballPos == posBotX && ballColor == cubesColor[2]){
        console.log("Good");
        score +=100;
        playSound(goodCubeSound);
        generateNewBall();
      }
    }
  }
  
   //Fonction pour générer une nouvelle balle après être passé dans un cube de bonne couleur
  function generateNewBall(){
    ballColor = colors[Math.floor(Math.random()*3)];
    
    if(ballColor == 'orange'){
      ball.attr("src","images/orange_ball.svg");
    } else if(ballColor == 'blue'){
      ball.attr("src","images/blue_ball.svg");
    } else if(ballColor == 'green'){
      ball.attr("src","images/green_ball.svg");
    }
  }
  
    //Fonction générant un son
  function playSound(sound){
      sound.get(0).play();
  }
  
    //Fonction stoppant un son
  function stopSound(sound){
    sound.get(0).pause();
  }

});  
