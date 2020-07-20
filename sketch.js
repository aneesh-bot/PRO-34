//Create variables here
var dogImg,happyDogImg;
var database;
var foodS,foodStock;
var dog;
function preload()
{
  //load images here
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png");
  
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
 dog = createSprite(width/2,height/2,10,10);
 dog.addImage("dog",dogImg);
 dogImg.width = dogImg.width/6;
 dogImg.height = dogImg.height/6;


 foodStock = database.ref('Food');
 foodStock.on("value",readStock);

}


function draw() {  
background(46,139,87);

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  
  dog.changeImage("happyDog",happyDogImg);
  happyDogImg.width = dogImg.width/6;
  happyDogImg.height = dogImg.height/6;
 }
 if(keyWentDown("space")){
  foodS = foodS+20
 }
  drawSprites();
  //add styles here
  textSize(25);
  fill("white");
  stroke(2);
  textFont("Georgia");
  text("Food remaining:" + foodS,150,180);
  text("Press UP_ARROW to feed Drago Milk",50,30);
}
function readStock(data){
 foodS = data.val();
}

function writeStock(x){

  if(x<=0){
   x=0;
  }else{
    x=x-1;
  }
 
 database.ref('/').update({
  Food:x

 })
 
}


