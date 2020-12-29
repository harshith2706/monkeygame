//creating objects & constants
var bow , arrow,  background,arrowGroup;
var bowImage, arrowImage, arrowSound, green_balloonImage, red_balloonImage, pink_balloonImage ,blue_balloonImage, balloonBurstSound, backgroundImage;
var score;
var START = 0;
var PLAY = 1;
var END = 2;
var gameState = START;
var ARROWLEFT = 10;
var arrowLeft = ARROWLEFT;

//creating function load images
function preload(){
  
  //loding images and sounds for the objects
  backgroundImage = loadImage("background0.png");
  arrowImage = loadImage("arrow0.png");
  arrowSound = loadSound("arrowSound.mp3");
  bowImage = loadImage("bow0.png");
  red_balloonImage = loadImage("red_balloon0.png");
  green_balloonImage = loadImage("green_balloon0.png");
  pink_balloonImage = loadImage("pink_balloon0.png");
  blue_balloonImage = loadImage("blue_balloon0.png");
  balloonBurstSound = loadSound("balloonBurst.mp3");
  
}

//creating setup function
function setup() {
  createCanvas(500, 460);
  
 //creating background
  background0 = createSprite(150,210,0,0);
  background0.addImage(backgroundImage);
  background0.scale = "1.2";
  
  background1= createSprite(600,210,0,0);
  background1.addImage(backgroundImage);
  background1.scale = "1.2";
  
  background2= createSprite(1050,210,0,0);
  background2.addImage(backgroundImage);
  background2.scale = "1.2";
  
  // creating bow 
  bow = createSprite(480,220,20,50);
  bow.addImage(bowImage); 
  bow.scale = 1.2;
  
 //giving a value to score 
  score = 0 ;
 
  //creating groups
  redBalloonsGroup = new Group();
  blueBalloonsGroup = new Group();
  greenBalloonsGroup = new Group();
  pinkBalloonsGroup = new Group();
  arrowGroup = new Group();
  
}

//creating draw function
function draw() {
  
  //creating background reseting function
  
  background0.velocityX = -5;
  if(background0.x < -230){
    background0.x = 1100;
  }
  
    background1.velocityX = -5;
  if(background1.x < -230){
    background1.x = 1100;
  }
  
   background2.velocityX = -5;
  if(background2.x < -230){
    background2.x = 1100;
  }
    
  //moving the bow by the "w" & "s" key
  if(keyDown("w") && gameState === PLAY){
    bow.y = bow.y - 10;
  }
  
  if(keyDown("s") && gameState === PLAY){
    bow.y = bow.y + 10;
  }
  
   // creating function to release arrow when space key is pressed
  if (keyWentDown("space")&& gameState === PLAY&& arrowLeft >0) {
    createArrow();
    arrowLeft = arrowLeft - 1;
    console.log("Arrow left :" + arrowLeft);
  }
  
  //applying function bowStop
  bowStop();
  
  //appling function balloonBurst
  balloonBurst();
  
  //applying function spawnBalloons 
  spawnBalloons();
  
  //applying function gameStateChange
  gameStateChange();
   
  //drawing the sprites
  drawSprites();
  
  console.log("gameState :" + gameState);
  
  //applying function win
  win();
  
  //applying function lose
  lose();
  
  //creating the texts
  
  fill("black")
  textSize(20);
  textFont("comic sans ms");
  text("Score :"+ score, 400,50);
 
if(gameState === END){
    
    fill("black");
    textSize(15);
    textFont("comic sans ms");
    text("DO YOU WANT TO RESTART THE GAME? IF YES, PRESS 'R'",20,250);
  }
  
if(gameState === END && score >= 30){
  
  fill("blue");
  textSize(20);
  textFont("comic sans ms");
  text("YOU WIN",200,200);
}
  
if(gameState === END && score < 30){
  
  fill("red");
  textSize(15);
  textFont("comic sans ms");
  text("YOU LOSE",200,200); 
}
  
if(gameState === START){
  
  textSize(15);
  textFont("comic sans ms");
  fill("blue");
  text("NEXT PRESS 'SPACE' TO START",135,200);
  fill("orangered");
  text("YOU HAVE 10 ARROWS ONLY",150,260);
  fill("red");
  text("CLICK ON THE SCREEN FIRST",140,180);
  fill("black");
  text("PRESS 'SPACE' TO CREATE A ARROW",123,220);
  text("PRESS 'W' & 'S' TO MOVE THE BOW UP & DOWN",77,240);
  fill("white");
  text("YOU HAVE TO SCORE MINIMUM 30 TO WIN",100,280);
}
}

//creating balloons
function redBalloon() {
  var redBalloon = createSprite(0,Math.round(random(50, 370)), 10, 10);
  redBalloon.addImage(red_balloonImage);
  redBalloon.velocityX = 3;
  redBalloon.lifetime = 150;
  redBalloon.scale = 0.1;
  redBalloonsGroup.add(redBalloon); 
}

function blueBalloon() {
  var blueBalloon = createSprite(0,Math.round(random(50, 370)), 10, 10);
  blueBalloon.addImage(blue_balloonImage);
  blueBalloon.velocityX = 3;
  blueBalloon.lifetime = 150;
  blueBalloon.scale = 0.1;
  blueBalloonsGroup.add(blueBalloon);
  
}

function greenBalloon() {
  var greenBalloon = createSprite(0,Math.round(random(50, 370)), 10, 10);
  greenBalloon.addImage(green_balloonImage);
  greenBalloon.velocityX = 3;
  greenBalloon.lifetime = 150;
  greenBalloon.scale = 0.1;
  greenBalloonsGroup.add(greenBalloon);
  
}

function pinkBalloon() {
  var pinkBalloon = createSprite(0,Math.round(random(50, 370)), 10, 10);
  pinkBalloon.addImage(pink_balloonImage);
  pinkBalloon.velocityX = 3;
  pinkBalloon.lifetime = 150;
  pinkBalloon.scale = 1
  pinkBalloonsGroup.add(pinkBalloon);

}


// Creating  arrows for bow
 function createArrow() {
  var arrow= createSprite(460, 100, 60, 10);
  arrow.addImage(arrowImage);
  arrow.y=bow.y;
  arrow.velocityX = -5;
  arrow.lifetime = 130;
  arrow.scale = 0.3;
  arrowGroup.add(arrow);
  arrowSound.play();
   
}

// creating bowStop function
function bowStop(){
  
  if(bow.y < 50){
    bow.y = bow.y + 10;
  }
  
  if(bow.y > 389){
    bow.y = bow.y - 10;
  }
}

//creating function to burst the balloons
function balloonBurst(){
  
  if(arrowGroup.isTouching(redBalloonsGroup)){
    balloonBurstSound.play();
    arrowGroup.destroyEach();
    redBalloonsGroup.destroyEach();
    score = score +2;
  }
  if(arrowGroup.isTouching(pinkBalloonsGroup)){
    balloonBurstSound.play();
    arrowGroup.destroyEach();
    pinkBalloonsGroup.destroyEach();
    score = score +3;
  }
   
  if(arrowGroup.isTouching(blueBalloonsGroup)){
    balloonBurstSound.play();
    arrowGroup.destroyEach();
    blueBalloonsGroup.destroyEach();
    score = score +4;
  }
  if(arrowGroup.isTouching(greenBalloonsGroup)){
    balloonBurstSound.play();
    arrowGroup.destroyEach();
    greenBalloonsGroup.destroyEach();
    score = score +5;
  }
  
}


//creating functions to spawn random balloons
function spawnBalloons(){
  if (frameCount % 150 === 0 && gameState === PLAY){
   var selectBalloon = Math.round(random(1,4));
    switch(selectBalloon) {
      case 1: redBalloon();
              break;
      case 2: pinkBalloon();
              break;
      case 3:blueBalloon();
              break;
      case 4: greenBalloon();
              break;
      
      default:break;
    }
 }
}

//creating function win
function win(){
  
  if(score >= 30 &&gameState === PLAY){
    gameState = END;
    text("YOU WIN",200,200);
  }
}

//creating function lose
function lose(){
  
  if(score < 30 && arrowLeft === 0 && gameState === PLAY){
    
    setTimeout(function (){
      gameState = END; 
    },1500);
  
  }
}

//creating function to change the gameState
function gameStateChange(){
  
  if(keyDown("space") && gameState === START){
    
    gameState = PLAY;
  }
  
  if(keyDown("r") && gameState === END){
    
    gameState = START;
    score = 0;
    arrowLeft = ARROWLEFT;
  }
}