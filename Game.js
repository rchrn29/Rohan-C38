class Game {
  constructor(){}

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
    car1 = createSprite(100,200,50,50);
    car2 = createSprite(300,200,50,50);
    car3 = createSprite(500,200,50,50);
    car4 = createSprite(700,200,50,50);
    cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index=0;
      //x and y position of the cars
      var x = 0;
      var y;
      for(var plr in allPlayers){
        //adds 1 new player to the index every loop
        index+=1;
        
        //positions the cars at an equal distance from eachother
        x+=200;
        //the distance traveledwill be taken from the database
        y=displayHeight-allPlayers[plr].distance;
        cars[index-1].x=x
        cars[index-1].y=y
        if(index===player.index){
          cars[index-1].shapeColor = "red"
          camera.position.x=displayWidth/2;
          camera.position.y=cars[index-1].y;
        }
      }
    }

    if(keyDown(UP_ARROW) && player.index !== undefined){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}