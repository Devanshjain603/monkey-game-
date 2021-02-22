
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var survivaltime=0;
var ground;
var Play=0;
var End=1;
var gamestate=Play;
var monkeycollide;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeycollide=loadAnimation("sprite_1.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600);
  monkey=createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
    
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
monkey.debug=false;
}


function draw() {
background("white"); 
  stroke("white");
textSize(20);
  fill("white");
  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate());
  text("survivaltime:"+survivaltime,350,50);
  
  if(gamestate===Play){
    
  if(ground.x>350){
    ground.x=ground.width/2;
  }
 
  if(keyDown("space") && monkey.y>=200){
    monkey.velocityY=-12;
  }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
    
 if(monkey.isTouching(obstacleGroup)){
      gamestate=End;
  }  
}
  else if(gamestate===End){
  ground.velocityX=0;
  FoodGroup.setVelocityXEach(0);
  obstacleGroup.setVelocityXEach(0);
  monkey.velocityY=0;
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.changeAnimation("collide",monkeycollide);
}
  monkey.velocityY=monkey.velocityY+0.8;
  banana();
  obstacles();
  monkey.collide(ground);
  
  drawSprites();
}

function banana(){
  if(frameCount % 80 ===0){
  var banana1=createSprite(600,120,20,20);
    banana1.y=Math.round(random(120,200));
    banana1.addImage(bananaImage);
    banana1.scale=0.1;
    banana1.velocityX=-4;
    banana1.lifetime=250;
    FoodGroup.add(banana1);
  }
}

function obstacles(){
  if(frameCount % 300===0){
    var obstacle=createSprite(600,330,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2;
    obstacle.velocityX=-4;
    obstacle.lifetime=250;
    obstacleGroup.add(obstacle);
  }
  
}




