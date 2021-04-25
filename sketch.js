var dog,d, happyDog, database, foodS, foodStock

function preload()
{
	d=loadImage("images/Dog.png");
  happyDog=loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500,500);
  dog=createSprite(250,350,50,50);
  dog.addImage(d);
  dog.scale=0.25
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background("Yellow");
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    
  }
  drawSprites();
  textSize(20);
  text("Note: Press UP ARROW Key To Feed The Dog Milk! ",20,50);
  textSize(20);
  text("Food remaining: "+foodS,180,250);
}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){
  if(x<=0){
    x=0;
  }
  else{
    x-=1;
  }
  database.ref('/').update({
    Food:x
  })
  
}



