//Dylan's D-lite
var player;var dylan;var cloud;var bone;var count;

function preload(){
  treat=loadImage('assets/dylantreat.png');
  dylan=loadImage('assets/frenchie2.png');
  cloud=loadImage('assets/white-cloud.png');
}

function setup() {
  createCanvas(600, 400);
  angleMode(DEGREES);
  noCursor();
  player=new Player();
  bone=new Bone();
}

function draw() {
  background(0,0,200);
  fill(200,200,220);
  textSize(100);
  textStyle(BOLD);
  if(count>=10){  //winning conditions
    textAlign(CENTER);
    textSize(25);
    text('we have a winner!!!',width/2,height/2);
    text('thanks for playing!',400,300);
    bone.y=100;
    player.x=150;
    if(keyIsPressed==true){
      count=0;
    }
  }
  else if(count<500){
    text(count,255,100);
  }
  image(cloud,100,100,350,200);  //the two clouds
  image(cloud,500,100,350,200);
  player.show();
  player.move();
  bone.show();
  bone.move();
}

class Player{  //the player
  constructor(){
    this.x=width/2;
    this.y=342;
    this.size=180;
    this.speed=10;
  }
  move(){  //the controls
    if(keyCode===RIGHT_ARROW){this.x+=this.speed;}
    if(keyCode===LEFT_ARROW){this.x+=-this.speed;}
    if(keyCode===UP_ARROW){this.x=this.x;}
    if(keyCode===DOWN_ARROW){this.x=this.x;}
    if(this.x>=585){this.x=585;}
    if(this.x<=15){this.x=15;}
  }
  show(){
    imageMode(CENTER);  //image transformation to match motion
    if(count<=0){
      textAlign(CENTER);
      textSize(25);
      text('<= & => to move, UP to stop',width/2,300);}
    if(keyCode===RIGHT_ARROW){
        push();
        image(dylan,this.x,this.y,this.size,this.size);
        pop();
    } 
    else if(keyCode===LEFT_ARROW){
      push();
      scale(-1,1);
      image(dylan,-this.x,this.y,this.size,this.size);
      pop();
    }
    else if(keyCode===UP_ARROW){
      push();
      image(dylan,this.x,this.y,this.size,this.size);
      pop();
    }
    else if(keyCode===DOWN_ARROW){
      push();
      scale(-1,1);
      image(dylan,-this.x,this.y,this.size,this.size);
      pop();
    }
  }
}

class Bone{  //the treat
  constructor(){
    this.array=[50,150,250,350,450];
    shuffle(this.array,true);
    this.x=this.array[0];
    this.y=0;
    this.speed=random(2,8);
    this.angle=1;
    count=0;
    }
  move(){
    if(player.x==width/2 && this.y==0 && count==0){
      this.speed=0;
    } 
    else{
      this.speed=random(2,8);
    }
    if (this.y>=height){
      this.speed=random(2,8);
      this.y=0;
      shuffle(this.array,true);
      this.x=this.array[0];
      count=count-1;
      }  //the miss
    if(dist(bone.x,bone.y,player.x,player.y)<=60){
      count=count+1;
      this.speed=random(2,8);
      this.y=0;
      shuffle(this.array,true);
      this.x=this.array[0];
      }  //the make
    this.y+=this.speed;
  }
  show(){  //the spinning of the treat
    push();
    translate(this.x,this.y);
    rotate(frameCount*10);
    image(treat,0,0,60,80);
    pop();
  }
}