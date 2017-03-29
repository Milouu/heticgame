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
      bgs = $(".bg"),
      bgSpeed = 1,
      
      // Wires  
      wires = $('.wire'),

      // Cubes
      cubeSpeed = 10,     
      cubes = [
        {
          div : $("#topCube"),
          halfDiv : $("#halfTopCube"),
          posX : 940,
          posY : 0,
          color : 'orange'
        },
        
        {
          div : $("#midCube"),
          halfDiv : $("#halfMidCube"),
          posX : 940,
          posY : 150,
          color : 'blue'
        },
        
        {
          div : $("#botCube"),
          halfDiv : $("#halfBotCube"),
          posX : 940,
          posY : 300,
          color : 'green'
        },
        
        {
          div : $("#topCube2"),
          halfDiv : $("#halfTopCube2"),
          posX : 1490,
          posY : 0,
          color : null
        },
        
        {
          div : $("#midCube2"),
          halfDiv : $("#halfMidCube2"),
          posX : 1490,
          posY : 150,
          color : null
        },
        
        {
          div : $("#botCube2"),
          halfDiv : $("#halfBotCube2"),
          posX : 1490,
          posY : 300,
          color : null
        }
      ],

      //Generation couleurs
      //
      colors = ['orange', 'blue', 'green'],
      randomColor = colors[Math.floor(Math.random()*3)],

      //Sounds
      boSound = $("#boSound"),
      goodCubeSound = $("#goodCubeSound"),
      gameOverSound = $("#gameOverSound");

  
  
  //Masque les éléments non voulu dans le menu
  ball.css('display','none');
  wires.css('display','none');
  scoreDisplay.css('display','none');
  
  //Lancement du jeu au clic 
  playButton.click(function(){
    $('#menu').css('display','none');
    ball.css('display','block');
    wires.css('display','block');
    scoreDisplay.css('display','block');

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
          moveCubes();
          generateCubes();
     /*     generateMoreCubes();
          collision();
          moreCollision(); */
        }
        ,
        speed
      );
    }

    //Démarre la BO (laisser en commentaire pendant le code) : TO-DO -> Boucler
    playSound(boSound);


    // Fonctions de déroulement du background (lag si mis dans le init)
    bgMovement();

    function bgMovement(){
      var x=0;

      setInterval(function(){
        x -= bgSpeed;
        bgs.each(function(){
          $(this).css("background-position", x);
        });
      }, 14);
    }

    //Fonction de déplacement des cubes 
    function moveCubes(){
      $.each(cubes, function(i, item){
        item.posX -= cubeSpeed;
        item.div.css("left", item.posX);
        item.halfDiv.css("left", item.posX);
        
        if(item.posX < -115){
          item.posX = 940;
        }
      });
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
      return [colors[Math.floor(Math.random()*3)], colors[Math.floor(Math.random()*3)], colors[Math.floor(Math.random()*3)]];
    }
    
    function correctColors(colorTab){
      if((colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) || (colorTab[0] != ballColor && colorTab[1] != ballColor && colorTab[2] != ballColor)){
        return false;
      } else{
        return true;
      }
    }
    
    
    function generateCubes(){
      do{ 
        var colorTab = generateColorTab();
      }while(!correctColors(colorTab));
      
      if(cubes[0].posX == 940){ 
        $.each(cubes, function(i, item){
          if(item.posX == cubes[0].posX){
            item.div.attr("src","images/" + colorTab[i] + "_cube_0.png");
            item.halfDiv.attr("src","images/" + colorTab[i] + "_cube_1.png");
            item.color = colorTab[i];
          }
        });
      } else if(cubes[3].posX == 940){
        $.each(cubes, function(i, item){
          if(item.posX == cubes[3].posX){
            item.div.attr("src","images/" + colorTab[i-3] + "_cube_0.png");
            item.halfDiv.attr("src","images/" + colorTab[i-3] + "_cube_1.png");
            item.color = colorTab[i-3];
          }
        });
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
});