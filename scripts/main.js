$(document).ready(function(){


    //variables  
    var playButton = $('#playButton'),
        movements = [54,189,339],
        colors = ['orange', 'blue', 'green'],
        bgs = $(".bg"),  
        wires = $('.wire'),
        
        gameInterval = null,
        bgInterval = null,
        over = false,

        game = {
          div : $("#game"),
          width : 960,
          height : 500
        },
        
        gameLost = false,

      speed = {
        game : 20,
        bg : 1,
        cube : 10
      },

      ball = {
        div : $("#ball"),
        posX : parseInt($("#ball").css("left")),
        posY : parseInt($("#ball").css("top")),
        wirePos : 1,
        color : 'orange'
      },

      score = {
        div : $("#score"),
        count : 0
      },

        speed = {
          game : 23,
          bg : 1,
          cube : 10
        },

        ball = {
          div : $("#ball"),
          posX : parseInt($("#ball").css("left")),
          posY : parseInt($("#ball").css("top")),
          wirePos : 1,
          color : 'orange'
        },

        score = {
          div : $("#score"),
          count : 0
        },

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

        //Sound variables
        menuSound = $("#menuSound"),
        boSound = $("#boSound"),
        goodCubeSound = $("#goodCubeSound"),
        gameOverSound = $("#gameOverSound");
  
  
  //Prevents arrows up and down from scrolling
  window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
  }, false);
  
  //Hide unwanted elements in menu
  ball.div.css('display','none');
  wires.css('display','none');
  score.div.css('display','none');
  $.each(cubes,(function(i,item){
    item.div.css('display','none');
    item.halfDiv.css('display','none');
  }));

    bgMovement(); 
  //function dealing with the bakckground movement

  //no argument / no return
  function bgMovement(){
    var x=0;
    bgInterval = setInterval(
      function(){
        x -= speed.bg;
        bgs.each(function(){
          $(this).css("background-position", x);
        });
      }, 
      14
      );
  }

  playSound(menuSound);
  
  //function launching a sound
    //argument : sound -> sound to launch / no return
    function playSound(sound){
      sound.get(0).play();
    }

    //function stopping a sound
    //argument : sound -> sound to stop / no return
    function stopSound(sound){
      sound.get(0).pause();
      sound.get(0).load();
    }

  //Launch game on click 
  playButton.click(function(){
    $('#menu').css('display','none');
    ball.div.css('display','block');
    wires.css('display','block');
    score.div.css('display','block');
    $.each(cubes,(function(i,item){
    item.div.css('display','block');
    item.halfDiv.css('display','block');
  }));

    stopSound(menuSound);
    init(); 
    //Game Initialisation
    function init(){ 
      //initVariables();
      game.div.css("width", game.width);
      game.div.css("height", game.height);
      ball.div.css("top", movements[ball.wirePos]);

      var initColorTab = generateColorTab();
      for(var i=0; i<3; i++){
        cubes[i].div.attr("src","images/" + initColorTab[i] + "_cube_0.png");
        cubes[i].halfDiv.attr("src","images/" + initColorTab[i] + "_cube_1.png");
        cubes[i].color = initColorTab[i];
      }
      playSound(boSound);
      increasedSpeed(speed.game);
    }
    
    
    
    
    
    function increasedSpeed(speedBoost){
      if(gameLost){
        return;
      }else{
        score.div.html(score.count);
        generateCubes();
        moveCubes();
        collision();
      
        setTimeout(function(){
          increasedSpeed(speed.game);
        }, speedBoost);
      }  
    }

    //function dealing with cubes'movements
    //no argument / no return
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

    


    //function dealing with the ball deplacement with the press of Arrow Up, Arrow Down, Z or S
    //argument : key -> the key pressed by the user / no return
    $(document).keydown(function(key){
      var press = key.which || key.keyCode;
      if(press == 38 || press == 90){
        if(ball.wirePos>0 && gameLost==false){
          ball.wirePos --;
        }
        ball.div.css("top", movements[ball.wirePos]);  
      } else if(press == 40 || press == 83){
        if(ball.wirePos<2 && gameLost==false){
          ball.wirePos ++;
        }
        ball.div.css("top", movements[ball.wirePos]);
      }
    });




    //function generating an array of 3 colors with a security to ensure that the 3 colors are not the same and that at least one is the same color as the ball
    //no argument / returns the array generated
    function generateColorTab(){
      do{ 

        var colorTab = [colors[Math.floor(Math.random()*3)], colors[Math.floor(Math.random()*3)], colors[Math.floor(Math.random()*3)]];

      }while((colorTab[0]==colorTab[1] && colorTab[1] == colorTab[2]) || (colorTab[0] != ball.color && colorTab[1] != ball.color && colorTab[2] != ball.color));

      return colorTab;
    }

    //function generating cubes 
    //no argument / no return
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

    //function dealing with collisions between the ball and the cubes
    //no argument / no return
    function collision(){
      $.each(cubes, function(i, item){
        if(item.wirePos == ball.wirePos && item.posX == ball.posX){
          if(item.color == ball.color){
            score.count +=10;
            playSound(goodCubeSound);
            generateNewBall(item);
            speed.game *= 0.99;
          } else{
            stopSound(boSound);
            playSound(gameOverSound);
            item.posX --;
            gameOver();
          }
        }
      });
    } 

    //function generating a new ball after a collision with a correct cube
    //argument : cube -> the object of the cube that collided with the ball / no return
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

    
    
    var finalScore = $('.gameOver .finalScore');
    var topScore = $('.gameOver .button1');

    function gameOver(){
      $('.gameOver').css('display','block');
      finalScore.html(score.count);
      gameLost = true;
      clearInterval(bgInterval);
      startAgain();
    }


    function startAgain(){
      var buttonRetry = $('.button2');

      buttonRetry.on('click',function(){
        $('.gameOver').css('display','none');
        buttonRetry.unbind();
        
        $.each(cubes,function(i,item){
          if(item.row == 1){
            item.posX = 940;
            item.div.css("left", 940);
            item.halfDiv.css("left", 940);
          } else if(item.row == 2){
            item.posX = 1490;
            item.div.css("left", 1490);
            item.halfDiv.css("left", 1490);
          }       
        });
       
        ball.wirePos = 1;
        ball.div.css("top", movements[ball.wirePos]);
        
        gameLost = false;
        score.count = 0;
        speed.game = 23;
          
        init();
      }); 
    }

  });  
});