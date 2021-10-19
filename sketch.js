var gato, gatoImg;
var rato, ratoImg;
var arvore, arvoreImg;
var chao, chaoImg, chaoinv;
var troncos, troncosImg;
var arvores,arvoresImg;
var paredeInv;

var pontuacao=0;

var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=JOGAR;



function preload(){

  gatoImg=loadAnimation("projeto_tom_e_jerry.gif");
  ratoImg=loadAnimation("projeto_jerry_e_tom.gif");
  
  chaoImg=loadImage("vamos_la.png");

  troncosImg=loadImage("tronco.png");
  
  
  


}

function setup() {
 createCanvas(800,800);
  
  gato=createSprite(200,600,10,10);
  gato.addAnimation("running",gatoImg);
  gato.scale=0.4;
  
  
  rato=createSprite(600,600,10,10);
  rato.addAnimation("rat",ratoImg);
  rato.scale=0.2;
  
  chao=createSprite(400,760,1500,50);
  chao.velocityX=-5;
  chao.addImage(chaoImg);
  chao.scale=3;
  
  chaoInv=createSprite(400,700,800,50);
  chaoInv.visible=false;
  
  grupoDeTroncos= new Group();
  grupoDeArvores= new Group();
  
  
  rato.setCollider("rectangle",0,0,700,300);
  
  
  paredeInv=createSprite(rato.x-100,800,50,800);
  paredeInv.visible=false;
  
}
  
function draw() {
  background("lightblue");
  
  textSize(20);
  text("Distancia :"+pontuacao,200,200);
  
  gato.velocityY=gato.velocityY+ 0.8;
  rato.velocityY=rato.velocityY+ 0.8;
  
  rato.collide(paredeInv);
  
  
  gato.collide(chaoInv);
  rato.collide(chaoInv);
 
  if(chao.x < 300){
    chao.x = 500;
  }
  
  if(touches.length>0||keyDown("space")&&gato.isTouching(chao)){
    
    gato.velocityY=-17;
    touches=[];
    
    
  }
  if(grupoDeTroncos.isTouching(gato)&&estadoJogo===JOGAR){
    
    
    estadoJogo=ENCERRAR;
    
  }
  if(estadoJogo===JOGAR){
   
   rato.visible=true;
   gato.visible=true;
   chao.velocityX=-5;
    
    if(frameCount%5===0){
    
    pontuacao=pontuacao+1;
    
    }
  
   
   
 }
  else if(estadoJogo===ENCERRAR){
    
  
    gato.visible=false;
    rato.visible=false
    grupoDeTroncos.destroyEach();
    troncos.velocityX=0;
    chao.velocityX=0;
    fill("blue")
    textSize(20);
    text("Você perdeu!!",400,400);
    textSize(15);
    text("Pressione R para recomeçar",400,450);
    
  }
  if(keyDown("r")||touches.length>0&&estadoJogo===ENCERRAR){
    
    recomeco();
    
    
  } 
  
 
  gerarTroncos();
  
  
  
  if(grupoDeTroncos.isTouching(rato)){
    
    rato.velocityY=-20;
    rato.velocityX=6;
  
  }
  
  rato.velocityX=rato.velocityX-0.2;

  
 
  drawSprites();
}

function gerarTroncos(){
  
  if(frameCount%200===0){ 
   
  troncos=createSprite(800,700,10,10);
  troncos.addImage(troncosImg);
  troncos.velocityX = -(6+pontuacao/10);
  troncos.scale=0.150;
  grupoDeTroncos.add(troncos);
  
  
  troncos.setCollider("rectangle",-100,0,700,100);
   
  troncos.collide(chaoInv);

 }
}


function recomeco(){
  
  pontuacao=0;
  estadoJogo=JOGAR;
  
  
  
  
}