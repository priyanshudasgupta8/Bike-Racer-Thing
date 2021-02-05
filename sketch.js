var path,mainCyclist;
var pathImg,mainRacerImg1;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  cycleBellSound = loadSound("bell.mp3");

  // obstacles
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");

  obstacle4 = loadAnimation("opponent1.png", "opponent2.png");
  obstacle5 = loadAnimation("opponent4.png", "opponent5.png");
  obstacle6 = loadAnimation("opponent7.png", "opponent8.png");

  gameOverImg = loadImage("gameOver.png")
}

function setup(){
  
  createCanvas(500,300);

  // Moving background
  path=createSprite(100,150);
  path.addImage(pathImg);

  //creating boy running
  mainCyclist  = createSprite(70,150,20,20);
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;

  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  obstaclesGroup = new Group();

  distance = 0;  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,350,30);
  
  if(gameState === PLAY){
    
    // Updates the score
    if (World.frameCount % 60 == 0) {
      distance = distance + Math.round(World.frameCount/120);
    }
    
    // Plays the sound
    if (keyDown("space")) {
      cycleBellSound.play()
    }

    path.velocityX = -5;
    spawnObstacles();
        
    mainCyclist.y = World.mouseY;
  
    edges= createEdgeSprites();
    mainCyclist.collide(edges);
  
    //code to reset the background
    if(path.x < 0 ){
      path.x = width/2;
    }

    if (mainCyclist.isTouching(obstaclesGroup)){
      gameState = END
    }
  } else if (gameState === END) {
    gameOver.visible = true;
    
    //set velocity of each game object to 0
    path.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
  }    
}

function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  
  obstaclesGroup.destroyEach();
    
  distance = 0;  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    yVal = random(50,250)
    var obstacle = createSprite(600,yVal,10,40);
    obstacle.velocityX = path.velocityX-2;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addAnimation("Opponent 1", obstacle4);
              break;
      case 5: obstacle.addAnimation("Opponent 2", obstacle5);
              break;
      case 6: obstacle.addAnimation("Opponent 3", obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.07;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}