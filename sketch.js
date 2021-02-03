var dog,sadDog,happyDog;
var database;


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database = firebase.database;
  
  dog=createSprite(800,100,150,150);
  dog.addImage(happyDog);
  dog.scale=0.15;

  food = new Food();

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  food.display();
  dog.display();
  FeedTime=database.ref('FeedTime');
  FeedTime.on("value", function(data){
    lastFed=data.val();
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12 + "PM", 350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM", 350,30);
  }else{
    text("Last Feed :"+ lastFed + "AM", 350,30);
  }

  drawSprites();
}

//function to read food Stock


//function to update food stock and last fed time
function feedDog(){dog.addImage(happyDog);

 foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hours() })}

   //function feedDog(){dog.addImage(happyDog);
  // if (foodObj.getFoodStock()<=0){foodObj.updatefoodStock(foodObj.getFoodStock()*0);
   //}else{ foodObj.updatefoodStock(foodObj.getFoodStock()-1);}}

function addFoods(){
  foodS++;
  database.ref('/').update({
    fFood: foodS
  })
}
