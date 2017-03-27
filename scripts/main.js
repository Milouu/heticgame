var cube = document.querySelector(".image"),
    posX = 840,
    posY = 0,
    dirX = 10,
    dirY = 0,
    largeurJeu = 960,
    hauteurJeu = 600,
    vitesse = 40;

init();
function init(){
  jeu.style.width = largeurJeu+"px";
  jeu.style.height = hauteurJeu+"px";
  setInterval(
    function(){
      bougerCube();
    }
    ,
    vitesse
  );
}

function bougerCube(){
  posX = posX - dirX;
  posY = posY + dirY;
  cube.style.left = posX+"px";
  cube.style.top = posY+"px";
  
  if(posX < 0){
    posX = 840;
  }
}