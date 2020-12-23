var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var ground;
var invisibleground;
var FoodGroup;
var obstacleGroup;
var gameOver,gameOverImg;
var restart,restartImg;
var ground_2,ground_2Img;
var survivaltime=0;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
  ground_2Img=loadImage("ground.jpg");
  
  gameOverImg=loadImage("Game-Over-xD_o_38686.jpg");
  
  restartImg=loadImage("restart.png");
}



function setup() {
  createCanvas(400,400)
  

  
  ground=createSprite(200,370,400,20);
  
  invisibleground=createSprite(200,370,400,10);
  
  ground_2=createSprite(200,180,300,300);
  ground_2.addAnimation("ground_2make",ground_2Img);
  ground_2.x = ground_2.width /2;
  ground_2.scale=1;
  ground_2.velocityX=-3;
  
  monkey=createSprite(100,300,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.2
  
  bananacreate();
  
  obstaclesCreate();
  
  FoodGroup=createGroup();
  
  obstacleGroup=createGroup();
 
  gameOver=createSprite(200,200,20,20);
 gameOver.addImage("gameOver",gameOverImg);
 gameOver.scale=0.9;
 gameOver.visible=false;
  
  restart=createSprite(200,320,20,20);
  restart.addImage("reset",restartImg);
  restart.visible=false;
  restart.scale=0.08;

}


function draw() {
  background(125);
  
  console.log(gameState);

  textSize(20);
  textSize(20);
  
  
  monkey.collide(invisibleground);
  
  if(gameState===PLAY){
  bananacreate();
  obstaclesCreate(); 
    
  survivaltime =survivaltime+Math.ceil(getFrameRate()/80);
    
    ground_2.velocityX=-3;
    
  //restart.visible=false;
  //gameOver.visible=false;
    
  if(keyWentDown("space") && monkey.y >= 100){
    monkey.velocityY=-40;
  }
  else if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    score=score+1;
  }
  else if(obstacleGroup.isTouching(monkey)){
    //obstacleGroup.destroyEach();
    gameState=END;
    gameOver.visible=true;
    restart.visible=true;
  }
  else if (ground_2.x < 100){
      ground_2.x = ground_2.width/2;
  }
  }
  else if(gameState===END){
    banana.velocityX=0;
    obstacle.velocityX=0;
    banana.destroy();
    obstacle.destroy();
    ground_2.velocityX=-0;
  if(mousePressedOver(restart)) {
    gameState=PLAY;
    gameOver.visible=false;
    restart.visible=false;
    score=0;
    survivaltime=0;
  }
  }  



  monkey.velocityY = monkey.velocityY + 3.8;
    
  FoodGroup.add(banana);
  obstacleGroup.add(obstacle);
  
 
  drawSprites();
  
  fill("lightred")
  text("Survival Time: "+ survivaltime, 130,30);
 
  fill("lightred")
  text("Score: "+ score, 170,60);
}


function bananacreate(){
  
  if(frameCount%80===0){
    banana=createSprite(500,150,20,20);
    banana.addImage("banana",bananaImage);
    banana.scale=0.2;
    banana.velocityX=-5;
    banana.lifetime=130;
 }
}

function obstaclesCreate(){
   if(frameCount%200===0){
    obstacle=createSprite(500,330,20,20);
    obstacle.addImage("obstacle",obstaceImage);
    obstacle.scale=0.18;
    obstacle.velocityX=-8;
    obstacle.lifetime=138;
   }
}

