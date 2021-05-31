class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage(car1Image);
    car1.debug="true"
    car2 = createSprite(300,200);
    car2.addImage(car2Image);
    car2.debug="true"
    car3 = createSprite(500,200);
    car3.addImage(car3Image);
    car3.debug="true"
    car4 = createSprite(700,200);
    car4.addImage(car4Image);
    car4.debug="true"
    cars = [car1, car2, car3, car4];
    passedFinish=false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
            background(groundImage);
            image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 200;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = 200 +(index*200) +allPlayers[plr].xPos
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        textAlign(CENTER)
        textSize(20)
        text(allPlayers[plr].name,cars[index-1].x,cars[index-1].y + 75)

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y

          if(obstacles.isTouching(cars[index-1])){
            yVel-=0.7
            slidingSound.play();
          }
        }
        
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }
    if(player.distance<4265){
    if(keyIsDown(38)&& player.index !== null){
      yVel = yVel+0.9;
     
      //carSound.play();

      if(keyIsDown(37)){
        xVel = xVel-0.2;
      };

      if(keyIsDown(39)){
        xVel = xVel+0.2;
      };
    }

    else if(keyDown(38)&& yVel>0 && player.index !== null){
      yVel = yVel - 0.1;
      xVel = xVel * 0.9;
    }
    else{
      xVel = xVel * 0.9
      yVel = yVel * 0.9
    }
    }

    else if(passedFinish === false){
      yVel*=0.7
      xVel*=0.7
      Player.updateFinishedPlayers()
      player.place=finishedPlayers 
      player.update()
      passedFinished=true 
    }
    else{
      yVel*=0.9
      xVel*=0.9
    }

    player.distance+=yVel
    yVel=yVel*0.9

    player.xPos += xVel 
    xVel = xVel*0.98

    player.update();

  
    

    drawSprites();
  }

  displayRanks(){
  camera.position.y = 0;
  camera.position.x = 0;
  imageMode(CENTER)
  Player.getPlayerInfo();
  image(bronze,displayWidth/-4,-100 + displayHeight/9, 200, 240);
  image(silver,displayWidth/4,-100 + displayHeight/10, 225, 270);
  image(gold,0,-100, 250, 300)
  textAlign(CENTER)
  textSize(50)
  for(var plr in allPlayers){
    if(allPlayers[plr].place===1){
      text("1st: " + allPlayers[plr].name,0,85)
    }

    else if(allPlayers[plr].place===2){
      text("2nd: " + allPlayers[plr].name,displayWidth/4,displayHeight/9+73)
    }

    else if(allPlayers[plr].place===3){
      text("3rd: " + allPlayers[plr].name,-4,displayHeight/10+73)
    }

    else{
      textSize(30)
      text("Honourable mention: " + allPlayers[plr].name, 0,225)
    }

  }
  };


  end(){
    console.log("Game has ended!")
  }
    
  
}
