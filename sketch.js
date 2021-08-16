var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1,heart2,heart3
var heart1img,heart2img,heart3img
var zombie,zombieimg
var zombiegroup
var bullets=70
var gameState="fight"

function preload(){
  bgImg=loadImage("assets/bg.jpeg");
  shooterImg=loadImage("assets/shooter_1.png");
  shooter_shooting=loadImage("assets/shooter_3.png")

  heart1img=loadImage("assets/heart_1.png");
  heart2img=loadImage("assets/heart_2.png");
  heart3img=loadImage("assets/heart_3.png");

  zombieimg=loadImage("assets/zombie.png")
} 

function setup() {
createCanvas(windowWidth,windowHeight);
bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20);
bg.addImage(bgImg);
player=createSprite(displayWidth-1150, displayHeight-300, 50, 50);
player.addImage(shooterImg);
player.scale=0.6

heart1=createSprite(displayWidth-150,40,20,20);
heart1.addImage(heart1img);
heart1.scale=0.4;
heart1.visible=false;

heart2=createSprite(displayWidth-100,40,20,20);
heart2.addImage(heart2img);
heart2.scale=0.4;
heart2.visible=false;

heart3=createSprite(displayWidth-150,40,20,20);
heart3.addImage(heart3img);
heart3.scale=0.4;


zombiegroup=new Group()
bulletGroup=new Group();

}

function draw() {
  background(0); 
 
  

if(gameState==="fight"){
  if(keyDown("UP_ARROW")){
    player.y=player.y-2
  }
 
  if (keyDown("DOWN_ARROW")){
    player.y=player.y+2
  }

  if(keyDown("LEFT_ARROW")){
    player.x=player.x-2
  }
 
  if(keyDown("RIGHT_ARROW")){
    player.x=player.x+2
  }
  
  if(keyWentDown("space")){
  player.addImage(shooter_shooting)
  bullet=createSprite(displayWidth-1150,player.y-50,20,10)
  bullet.velocityX=20
  bullets=bullets-1
  bulletGroup.add(bullet)
  bullet.depth=player.depth+2
  }
  if(bullets===0){
    gameState="bullet"
  }
  
  if(keyWentUp("space")){
    player.addImage(shooterImg)
  }

 enemy()
 if(zombiegroup.isTouching(player)){
   for(var i=0;i<zombiegroup.length;i++){
     if(zombiegroup[i].isTouching(player)){
       zombiegroup[i].destroy()
     }
   }
 }

 if(zombiegroup.isTouching(bulletGroup)){
  for(var i=0;i<zombiegroup.length;i++){
    if(zombiegroup[i].isTouching(bulletGroup)){
      zombiegroup[i].destroy()
      bulletGroup.destroyEach()

    }
  }
}

}
drawSprites();
if(gameState==="bullet"){
  player.destroy();
  zombiegroup.destroyEach();
  bulletGroup.destroyEach();
  textSize(50)
  fill("red");
  text("NO BULLETS",520,410)
}
else if(gameState==="lost"){
 player.destroy();
 zombiegroup.destroyEach();
 textSize(50)
 fill("red")
 text("YOU LOST",400,400) 
}
else if(gameState===("won")){
  player.destroy();
  zombiegroup.destroyEach();
  textSize(50);
  fill("blue")
  text("YOU WON",400,400)
}

}

function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(500,1100),random(100,500),40,40)
    zombie.addImage(zombieimg)
    zombie.scale=0.15
    zombie.velocityX=-3
    zombie.setCollider("rectangle",0,0,400,400)
    zombie.lifetime=400
    zombiegroup.add(zombie)
  }
}