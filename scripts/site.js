///////////////////////////////////////JQUERY SITE 


$(document).ready(function(){ // Menu hamburger 
    
    var accueilBurger = $('.hamburger'); 
    var accueilSmall = $('.accueilSmall'); 
    var buttonAccueil = $('li a');
    var backSmall = $('.backSmall');
    var how = $('.how');
    var cube =$('.cubeClass');
    var howToPlay = $('.howToPlay a');
    var scroll=false;
    var logoSmall = $('.logoSmall');
    var backSmall = $('.backSmall');
    
  ///// Menu hamburger
    
    accueilBurger.click(function(){
        
    if(accueilBurger.hasClass('is-active'))
    {
        accueilSmall.css('left','-350px');
    }
    else{
        accueilSmall.css('left','-30px');     
    }
    accueilBurger.toggleClass('is-active');    
    });
    
    
    ////// Slide How to play
    
    how.click(function(){
        
       if(cube.hasClass('is-active1'))
    {
        
        $(this).next(".cubeClass").slideToggle();
        cube.toggleClass('is-active1');
    }
    else{
        cube.toggleClass('is-active1');
        $(this).next(".cubeClass").slideToggle();
            
    }
    accueilBurger.toggleClass('is-active1'); 
    });
    
    
    /////////////////////////////// how menu
    
    howToPlay.click(function(){
        
        cube.addClass("is-active1").slideDown();
        accueilSmall.css('left','-350px');
         accueilBurger.toggleClass('is-active');
        
     
    });
    
    
    /////////////////////// How to play menu big screen
    
    var hover1 =$('.hover1');
    
    hover1.click(function(){
        cube.addClass("is-active1").slideDown();
        
    });
    
    });
    
    
    /////////////////////////Slider



$(function(){
      setInterval(function(){
         $(".slideshow ul").animate({marginLeft:-400},800,function(){
            $(this).css({marginLeft:0}).find("li:last").after($(this).find("li:first"));
         })
      }, 3500);
   });


///////////////////// Menu Visible Ball

var ball = { 
Jsball1 : $('.Jsball1'),
Jsball2 : $('.Jsball2'),
Jsball3 : $('.Jsball3'),
}

var hover1 = $('.hover1');
var hover2 = $('.hover2');
var hover3 = $('.hover3');

hover1.click(function(){
   
ball.Jsball1.css('visibility','visible');
   
    setTimeout(function(){
        
        ball.Jsball1.css('visibility','hidden');
        
    },300);
});

hover2.click(function(){
   
ball.Jsball2.css('visibility','visible');
   
    setTimeout(function(){
        
        ball.Jsball2.css('visibility','hidden');
        
    },300);
});


hover3.click(function(){
   
ball.Jsball3.css('visibility','visible');
   
    setTimeout(function(){
        
        ball.Jsball3.css('visibility','hidden');
        
    },300);
});