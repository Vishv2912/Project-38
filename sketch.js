var score = 0;
var highScore=0
var trex, trex_running, edges;
var groundImage,n,v;
var invisible_ground
var obstacleGroup, cloudGroup;
//constants
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexStop
var restartImage, gameOverImage
var restart, gameOver
var jumpSound, trexCrash, trexMilestone;


function preload() {
  trex_running = loadAnimation("t1.png", "t2.png", "t3.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage('cloud2.png');
  obstacle1 = loadImage('o1.png');
  obstacle2 = loadImage('o2.png');
  obstacle3 = loadImage('o3.png');
  obstacle4 = loadImage('o4.png');
  obstacle5 = loadImage('o1.png');
  obstacle6 = loadImage('o3.png');
  trexStop = loadAnimation("trex1.png");
  gameOverImage = loadImage('game over.png');
  restartImage = loadImage('restart 1.png');
  jumpSound = loadSound("Jump.mp3")
  trexCrash = loadSound("trexCrash.mp3")
  trexMilestone = loadSound("trex100.mp3")


}

function setup() {
  createCanvas(displayWidth,displayHeight);
  // creating trex
  trex = createSprite(camera.x-width+200,0, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Stop", trexStop);
 trex.velocityX=4;
  trex.scale=1000
  edges = createEdgeSprites();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  invisible_ground = createSprite(width/2,displayHeight/2-1,width, 1)
  //invisible_ground.shapeColor="white"  
  invisible_ground.visible = true;

  ground = createSprite(width/2,353,displayHeight/2, 5);
  ground.velocityX = -2
  ground.addImage(groundImage);
ground.visible=false
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  //trex.debug=true;
  //trex.setCollider('circle',0,0,40);

  restart = createSprite(camera.x+width/2,height/2,20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.3;

  gameOver = createSprite(camera.x+width/2,height/2-100, 20, 20)
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;

  restart.visible = false;
  gameOver.visible = false;
 n=createSprite(width/2,displayHeight/2+8,width*10,20);
  n.velocityX=2;
 v=createSprite(width/2,displayHeight/2+410,width*10,800);
 v.velocityX=2;
}


function draw() {
  //set background color 
  console.log(displayWidth)
  background("skyblue");
n.shapeColor="Green"
v.shapeColor="brown"
 gameOver.x=restart.x=camera.x
  trex.collide(v)
  if (gameState == PLAY) {
    camera.x=trex.x+220
   
    if ((keyDown("space")||(touches.length > 0)) && (trex.y >height-120)) {
      trex.velocityY = -10;
      jumpSound.play();
    touches=[];
    
    }
    if (ground.x < 0) {
      ground.x =width/2;
    }
    spawnCloud();
    spawnObstacle();

    ///score = Math.round(frameCount / 1);
///console.log(getFrameRate());    
    score=score+Math.round(getFrameRate()/20);
    
    if (score % 100 == 0 && score > 0) {
      trexMilestone.play();
    }

    if (frameCount % 50 == 0) {
      ground.velocityX = ground.velocityX - 1

    }

    if (trex.isTouching(obstacleGroup)) {
      gameState = END;

      trexCrash.play();



    }






  } else if (gameState == END) {
    
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("Stop", trexStop)
    cloudGroup.setLifetimeEach(-1);
if(score>highScore){
  highScore=score
}
   
    
    restart.visible = true;
    gameOver.visible = true;

if(mousePressedOver(restart)||(touches.length>0)){
  reset();
  touches=[];
}

  }






  //logging the y position of the trex
  //console.log(trex.y)

  //jump when space key is pressed

  //for gravity
  trex.velocityY = trex.velocityY + 0.5;

  //stop trex from falling down
  trex.collide(invisible_ground);



  drawSprites();
  textSize(20);
  fill("yellow")
  text("Score:" + score,camera.x-width/2,displayHeight/20);
text("High Score : "+highScore,camera.x-width/2,displayHeight/50)


}
function reset(){
  gameState=PLAY;
v.velocityX=2
n.velocityX=2
trex.velocityX=2
trex.x=0;
trex.y=displayHeight/120
v.x=displayWidth-displayWidth;
n.x=displayWidth-displayWidth;
ground.x=0;  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  score=0;
  
}








function spawnCloud() {
  if (frameCount % 100 == 0) {

    var cloudHeight = Math.round(random(displayHeight/4, displayHeight/3))
    console.log(cloudHeight);
    var cloud = createSprite(camera.x+width/2,cloudHeight, 20, 20);
    cloud.velocityX = -2;
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    trex.depth = cloud.depth + 1;
    console.log(trex.depth, cloud.depth)
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
    restart.depth = cloud.depth + 1;
    gameOver.depth = cloud.depth + 1;


  }

}

function spawnObstacle() {
  if (frameCount % 200 == 0) {
    var select = Math.round(random(1, 6));

    var obstacle = createSprite(camera.x+width/2,n.y-20, 10, 10);
    obstacle.velocityX = -(4 + score / 100);
    /*if(select==1){
  obstacle.addImage(obstacle1); 
    
}
  else if(select==2){
  obstacle.addImage(obstacle2);  
  }

  else if(select==3){
  obstacle.addImage(obstacle3);  
  }

  else if(select==4){
  obstacle.addImage(obstacle4);  
  }

  else if(select==5){
  obstacle.addImage(obstacle5);  
  }

  else if(select==6){
  obstacle.addImage(obstacle6);  
  }*/
    switch (select) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }



    obstacleGroup.add(obstacle);


    obstacle.scale = 0.7;
  }
}