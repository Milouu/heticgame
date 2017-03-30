$(document).ready(function(){

  //Variables  
  // General
  var ball = {
        div : $("#ball"),
        posX : parseInt($("#ball").css("left")),
        posY : parseInt($("#ball").css("top")),
        wirePos : 1,
        color : 'orange'
      },
  
      game = {
        div : $("#game"),
        width : 960,
        height : 500
      },
  
      speed = {
        game : 40,
        bg : 1,
        cube : 10
      },
    
      scoreDisplay = $("#score"),
      score = 0,

      // Menu
      playButton = $('#playButton'),

      // Deplacement balle  
      movements = [54,189,339],

      // Background
      bgs = $(".bg"),
      
      // Wires  
      wires = $('.wire'),

      // Cubes     
      cubes = [
        {
          div : $("#topCube"),
          halfDiv : $("#halfTopCube"),
          posX : 940,
          posY : 0,
          wirePos : 0,
          row : 1,
          color : 'orange'
        },
        
        {
          div : $("#midCube"),
          halfDiv : $("#halfMidCube"),
          posX : 940,
          posY : 150,
          wirePos : 1, 
          row : 1,
          color : 'blue'
        },
        
        {
          div : $("#botCube"),
          halfDiv : $("#halfBotCube"),
          posX : 940,
          posY : 300,
          wirePos : 2, 
          row : 1,
          color : 'green'
        },
        
        {
          div : $("#topCube2"),
          halfDiv : $("#halfTopCube2"),
          posX : 1490,
          posY : 0,
          wirePos : 0,
          row : 2,
          color : null
        },
        
        {
          div : $("#midCube2"),
          halfDiv : $("#halfMidCube2"),
          posX : 1490,
          posY : 150,
          wirePos : 1,
          row : 2,
          color : null
        },
        
        {
          div : $("#botCube2"),
          halfDiv : $("#halfBotCube2"),
          posX : 1490,
          posY : 300,
          wirePos : 2,
          row : 2,
          color : null
        }
      ],

      //Generation couleurs
      colors = ['orange', 'blue', 'green'],

      //Sounds
      boSound = $("#boSound"),
      goodCubeSound = $("#goodCubeSound"),
      gameOverSound = $("#gameOverSound");

  
  
  //Masque les éléments non voulu dans le menu
  ball.div.css('display','none');
  wires.css('display','none');
  scoreDisplay.css('display','none');
  
  //Lancement du jeu au clic 
  playButton.click(function(){
    $('#menu').css('display','none');
    ball.div.css('display','block');
    wires.css('display','block');
    scoreDisplay.css('display','block');

    //Lancement du jeu
    init(); 
    //Fonction d'initialisation du jeu
    function init(){ 
      game.div.css("width", game.width);
      game.div.css("height", game.height);
      ball.div.css("top", movements[ball.wirePos]);
      
      var initColorTab = generateColorTab();
      for(var i=0; i<3; i++){
        cubes[i].div.attr("src","images/" + initColorTab[i] + "_cube_0.png");
        cubes[i].halfDiv.attr("src","images/" + initColorTab[i] + "_cube_1.png");
        cubes[i].color = initColorTab[i];
      }

      setInterval(
        function(){
          scoreDisplay.html(score);
          generateCubes();
          moveCubes();
          collision();
        }
        ,
        speed.game
      );
    }

    //Démarre la BO (laisser en commentaire pendant le code) : TO-DO -> Boucler
    playSound(boSound);


    // Fonctions de déroulement du background (lag si mis dans le init)
    bgMovement();

    function bgMovement(){
      var x=0;

      setInterval(function(){
        x -= speed.bg;
        bgs.each(function(){
          $(this).css("background-position", x);
        });
      }, 14);
    }

    //Fonction de déplacement des cubes 
    function moveCubes(){
      $.each(cubes, function(i, item){
        item.posX -= speed.cube;
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
      if(press == 38 || press == 90){
        if(ball.wirePos>0){
          ball.wirePos --;
        }
        ball.div.css("top", movements[ball.wirePos]);  
      } else if(press == 40 || press == 83){
        if(ball.wirePos<2){
          ball.wirePos ++;
        }
        ball.div.css("top", movements[ball.wirePos]);
      }
    });




    // Fonctions servant à la génération aléatoire des cubes

    //Renvoie un tableau de 3 couleurs aléatoires
    function generateColorTab(){
      do{ 
        
       var colorTab = [colors[Math.floor(Math.random()*3)], colors[Math.floor(Math.random()*3)], colors[Math.floor(Math.random()*3)]];
        
      }while((colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) || (colorTab[0] != ball.color && colorTab[1] != ball.color && colorTab[2] != ball.color));
      
      return colorTab;
    }
    
    
    function generateCubes(){
      var colorTab = generateColorTab();   
      
      if(cubes[0].posX == 940){ 
        $.each(cubes, function(i, item){
          if(item.row == 1){
            item.div.attr("src","images/" + colorTab[i] + "_cube_0.png");
            item.halfDiv.attr("src","images/" + colorTab[i] + "_cube_1.png");
            item.color = colorTab[i];
          }
        });
      } else if(cubes[3].posX == 940){
        $.each(cubes, function(i, item){
          if(item.row == 2){
            item.div.attr("src","images/" + colorTab[i-3] + "_cube_0.png");
            item.halfDiv.attr("src","images/" + colorTab[i-3] + "_cube_1.png");
            item.color = colorTab[i-3];
          }
        });
      }                        
     }  

    function collision(){
      $.each(cubes, function(i, item){
        if(item.wirePos == ball.wirePos && item.posX == ball.posX){
          if(item.color == ball.color){
            score +=100;
            playSound(goodCubeSound);
            generateNewBall(item);
          } else{
            stopSound(boSound);
            playSound(gameOverSound);
            speed.cube = 0;
            speed.bg = 0;
            item.posX --;
            console.log("Game Over");
            console.log("Score :" + score);
            console.log(item.color);
            console.log(ball.color);
          }
        }
      });
    } 
    
    function generateNewBall(cube){   
      if(cube.row == 1){
        do{
          ball.color = colors[Math.floor(Math.random()*3)];
        }while(ball.color != cubes[3].color && ball.color != cubes[4].color && ball.color != cubes[5].color);   
      }else if(cube.row == 2){
        do{
          ball.color = colors[Math.floor(Math.random()*3)];
        }while(ball.color != cubes[0].color && ball.color != cubes[1].color && ball.color != cubes[2].color); 
      }
      
      ball.div.attr("src", "images/" + ball.color + "_ball.svg");
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