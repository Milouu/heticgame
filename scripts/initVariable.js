initVariables(){
   var playButton = $('#playButton'),
        movements = [54,189,339],
        colors = ['orange', 'blue', 'green'],
        bgs = $(".bg"),  
        wires = $('.wire'),

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
        boSound = $("#boSound"),
        goodCubeSound = $("#goodCubeSound"),
        gameOverSound = $("#gameOverSound");
}