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

      // Menu
      playButton = $('#playButton'),
      
      // Deplacement balle  
      movements = [54,189,339],
      movCount = 1,

      // Background
      bgFar = $("#bg_far"),
      bgMid = $("#bg_middle"),
      bgFront = $("#bg_front"),
      bgSpeed = 1,

      // Cubes

      cubeSpeed = 10,
      // Top Cube
      topCube = $("#topCube"),
      posTopX = 940,
      posTopY = 0,
      halfTopCube = $("#halfTopCube"),

      // Middle Cube
      midCube = $("#midCube"),
      posMidX = 940,
      posMidY = 150,
      halfMidCube = $("#halfMidCube"),

      // Bottom Cube
      botCube = $("#botCube"),
      posBotX = 940,
      posBotY = 300,
      halfBotCube = $("#halfBotCube"),

      // Top Cube2
      topCube2 = $("#topCube2"),
      posTopX2 = 1490,
      posTopY2 = 0,
      halfTopCube2 = $("#halfTopCube2"),


      // Middle Cube2
      midCube2 = $("#midCube2"),
      posMidX2 = 1490,
      posMidY2 = 150,
      halfMidCube2 = $("#halfMidCube2"),


      // Bottom Cube2
      botCube2 = $("#botCube2"),
      posBotX2 = 1490,
      posBotX2 = 1490,
      posBotY2 = 300,
      halfBotCube2 = $("#halfBotCube2"),


      //Generation couleurs
      cubes = [topCube, midCube, botCube],
      halfCubes = [halfTopCube, halfMidCube, halfBotCube],
      cubesPos = [posTopX, posMidX, posBotX],
      moreCubes = [topCube2, midCube2, botCube2],
      moreHalfCubes = [halfTopCube2, halfMidCube2, halfBotCube2],
      moreCubesPos = [posTopX2, posMidX2, posBotX2],
      colors = ['orange', 'blue', 'green'],
      randomColor = colors[Math.floor(Math.random()*3)],
      topCubeColor = topCube.data("color"),
      midCubeColor = midCube.data("color"),
      botCubeColor = botCube.data("color"),
      cubesColor = [topCubeColor, midCubeColor, botCubeColor],
      topCube2Color = topCube2.data("color"),
      midCube2Color = midCube2.data("color"),
      botCube2Color = botCube2.data("color"),
      moreCubesColor = [topCube2Color, midCube2Color, botCube2Color],


      //Sons
      boSound = $("#boSound"),
      goodCubeSound = $("#goodCubeSound"),
      gameOverSound = $("#gameOverSound");

  //Masque les éléments non voulu dans le menu
    ball.css('display','none');
    wires.css('display','none');
  
  //Lancement du jeu au clic 
    playButton.click(function(){
    $('#menu').css('display','none');
    ball.css('display','block');
    wires.css('display','block');
      
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
        generateMoreCubes();
        moveTopCube();
        moveMidCube();
        moveBotCube();
        moveTopCube2();
        moveMidCube2();
        moveBotCube2();
        collision();
        moreCollision();
      }
      ,
      speed
    );
  }

  //Démarre la BO (laisser en commentaire pendant le code) : TO-DO -> Boucler
  //playSound(boSound);


  // Fonctions de déroulement du background (lag si mis dans le init)
  bgMovement();

  function bgMovement(){
    var x=0;

    setInterval(function(){
      x -= bgSpeed;
      bgFar.css("background-position", x);
      bgMid.css("background-position", x);
      bgFront.css("background-position", x);
    }, 14);
  }

  //Fonction de déplacement des cubes 

  function moveTopCube(){
    posTopX = posTopX - cubeSpeed;
    topCube.css("left", posTopX);
    halfTopCube.css("left", posTopX);
    score += (cubeSpeed/10);

    if(posTopX < -115){
      posTopX = 940;
    }
  }

  function moveTopCube2(){
    posTopX2 = posTopX2 - cubeSpeed;
    topCube2.css("left", posTopX2);
    halfTopCube2.css("left", posTopX2);
    score += (cubeSpeed/10);

    if(posTopX2 < -115){
      posTopX2 = 940;
    }
  }

  function moveMidCube(){
    posMidX = posMidX - cubeSpeed;
    midCube.css("left", posTopX);
    halfMidCube.css("left", posTopX);

    if(posMidX < -115){
      posMidX = 940;
    }
  }

  function moveMidCube2(){
    posMidX2 = posMidX2 - cubeSpeed;
    midCube2.css("left", posTopX2);
    halfMidCube2.css("left", posTopX2);

    if(posMidX2 < -115){
      posMidX2 = 940;
    }
  }

  function moveBotCube(){
    posBotX = posBotX - cubeSpeed;
    botCube.css("left", posBotX);
    halfBotCube.css("left", posTopX);

    if(posBotX < -115){
      posBotX = 940;
    }
  }

  function moveBotCube2(){
    posBotX2 = posBotX2 - cubeSpeed;
    botCube2.css("left", posBotX2);
    halfBotCube2.css("left", posTopX2);

    if(posBotX2 < -115){
      posBotX2 = 940;
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
          cubes[i].attr("src", "images/orange_cube_0.png");
          halfCubes[i].attr("src", "images/orange_cube_1.png");
          //cubes[i].data('color', 'orange');
          cubesColor[i] = 'orange';
        } else if(colorTab[i] == 'blue'){
          cubes[i].attr("src", "images/blue_cube_0.png");
          halfCubes[i].attr("src", "images/blue_cube_1.png");
          //cubes[i].data('color', 'blue');
          cubesColor[i] = 'blue';
        } else if(colorTab[i] == 'green'){
          cubes[i].attr("src", "images/green_cube_0.png");
          halfCubes[i].attr("src", "images/green_cube_1.png");
          //cubes[i].data('color', 'green');
          cubesColor[i] = 'green';
        }
      }  
    }
  } 


  function generateMoreCubes(){

    //Génère les cubes quand ceux-ci sont initialisés ou reviennent à la position de départ
    if(posTopX2 == 940){  

      //Sécurise la génération de couleurs pour que les 3 blocs ne soient pas tous de la même couleur et qu'au moins un d'entre eux soient de la couleur de la balle
      do{ 
        var colorTab = generateColorTab();
      }while((colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) || (colorTab[0] != ballColor && colorTab[1] != ballColor && colorTab[2] != ballColor));

      //Charge les cubes en fonction du tableau alétoire de couleurs généré
      for(var i=0; i < moreCubes.length ; i++){
        if(colorTab[i] == 'orange'){
          moreCubes[i].attr("src", "images/orange_cube_0.png");
          moreHalfCubes[i].attr("src", "images/orange_cube_1.png");
          moreCubesColor[i] = 'orange';
        } else if(colorTab[i] == 'blue'){
          moreCubes[i].attr("src", "images/blue_cube_0.png");
          moreHalfCubes[i].attr("src", "images/blue_cube_1.png");
          moreCubesColor[i] = 'blue';
        } else if(colorTab[i] == 'green'){
          moreCubes[i].attr("src", "images/green_cube_0.png");
          moreHalfCubes[i].attr("src", "images/green_cube_1.png");
          moreCubesColor[i] = 'green';
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
        cubeSpeed = 0;
        bgSpeed = 0;
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
      if(ballPos == posMidX && ballColor != cubesColor[1]){
        stopSound(boSound);
        playSound(gameOverSound);
        cubeSpeed = 0;
        bgSpeed = 0;
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
        cubeSpeed = 0;
        bgSpeed = 0;
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


  function moreCollision(){
    if(movCount == 0){
      if(ballPos == posTopX2 && ballColor != moreCubesColor[0]){
        stopSound(boSound);
        playSound(gameOverSound);
        cubeSpeed = 0;
        bgSpeed = 0;
        posTopX2 --;
        console.log("Game Over2");
        console.log("Score :" + score);
      } else if(ballPos == posTopX2 && ballColor == moreCubesColor[0]){
        console.log("Good");
        score +=100;
        playSound(goodCubeSound);
        generateNewBall();
      }
    }else if(movCount == 1){
      if(ballPos == posMidX2 && ballColor != moreCubesColor[1]){
        stopSound(boSound);
        playSound(gameOverSound);
        cubeSpeed = 0;
        bgSpeed = 0;
        posMidX2 --;
        console.log("Game Over2");
        console.log("Score :" + score);
      } else if(ballPos == posMidX2 && ballColor == moreCubesColor[1]){
        console.log("Good");
        score +=100;
        playSound(goodCubeSound);
        generateNewBall();
      } 
    }else if(movCount == 2){
      if(ballPos == posBotX2 && ballColor != moreCubesColor[2]){
        stopSound(boSound);
        playSound(gameOverSound);
        cubeSpeed = 0;
        bgSpeed = 0;
        posBotX2 --;
        console.log("Game Over2");
        console.log("Score :" + score);
      } else if(ballPos == posBotX2 && ballColor == moreCubesColor[2]){
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

    if(ballPos == posTopX){
      do{
        ballColor = colors[Math.floor(Math.random()*3)];
      }while(ballColor != moreCubesColor[0] && ballColor != moreCubesColor[1] && ballColor != moreCubesColor[2]);
    } else if(ballPos == posTopX2){
      do{
        ballColor = colors[Math.floor(Math.random()*3)];
      }while(ballColor != cubesColor[0] && ballColor != cubesColor[1] && ballColor != cubesColor[2]);
    }

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
