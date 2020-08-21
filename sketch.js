var trex, trex_running, trex_collided
var ground,invisibleground,groundimage
var cloudimage
var CloudsGroup
var ObstaclesGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver,restart,gameoverimg,restartimg
var count
var jump,die,checkpoint
function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png"); 
groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
   obstacle2 = loadImage("obstacle2.png");
  
   obstacle3 = loadImage("obstacle3.png");
  
   obstacle4 = loadImage("obstacle4.png");
    obstacle5 = loadImage("obstacle5.png");
  
   obstacle6 = loadImage("obstacle6.png");
  gameoverimg = loadImage("gameOver.png");
  restartimg = loadImage("restart.png");
  trex_collided = loadAnimation("trex_collided.png");
  jump = loadSound("jump.mp3");
  checkpoint = loadSound("checkPoint.mp3");
  die = loadSound("die.mp3")
  
}
function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,170,10,10)
  trex.addAnimation("running",trex_running)
   trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  ground = createSprite(200,180,400,10);
  ground.addImage(groundimage);
  invisibleground = createSprite(200,190,400,5);
  invisibleground.visible = false;
  ground.x = ground.width/2;
  CloudsGroup = createGroup();
  ObstaclesGroup = createGroup();
  //place gameOver and restart icon on the screen
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage(gameoverimg);
gameOver.scale = 0.5;
restart.addImage(restartimg);
restart.scale = 0.5;
count = 0;
gameOver.visible = false;
restart.visible = false;
}

function draw() {
  background(255);
  text("score"+count,500,50);
  trex.collide(invisibleground);
  if(gameState === PLAY){
  if(keyDown("space") && trex.y>150){
    trex.velocityY = -10; 
    jump.play();
    
  }
  trex.velocityY = trex.velocityY +0.5;
   ground.velocityX = -5;
  if(ground.x<0){
  ground.x = ground.width/2;
  }
    count = count + Math.round(getFrameRate()/60)
    if(count>0 && count%100 === 0){
      checkpoint.play();
    }
  spawnClouds();
  spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
       gameState = END;
      die.play();
       }
  } else if(gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    
  }
  
  if(mousePressedOver(restart)) {
    reset();
  }
  
  drawSprites();
}
function spawnClouds() {
  //write code here to spawn the clouds
  if (World.frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = random(80,120);
    cloud.addImage(cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 210;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 60 === 0) {
    var obstacle = createSprite(600,165 ,10,40);
    obstacle.velocityX = - 6 
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1 : obstacle.addImage(obstacle1);
    break;
     case 2 : obstacle.addImage(obstacle2);
    break;
     case 3 : obstacle.addImage(obstacle3);
    break;
     case 4 : obstacle.addImage(obstacle4);
    break;
     case 5 : obstacle.addImage(obstacle5);
    break;
     case 6 : obstacle.addImage(obstacle6);
    break;
    default:break
    }
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.4;
    obstacle.lifetime = 150;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
  function reset(){
  gameState = PLAY;
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
  trex.changeAnimation("running",trex_running);
  count= 0;
  
}