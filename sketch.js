const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const World = Matter.World;
const Constraint = Matter.Constraint;
const Body = Matter.Body;

var engine, world, boy, ground, b1, b2, b3, b4, gem1, lev;
var blocks = [];
var gems = [];
var level = 1;
var gemCount = 0;
var gemNum = 0;
var gameOver = false;
var showLava = true;
var mons = [];
var monNum = 0;
var health = 100;
var al = 0;
var cImg;
var dCount = 0;
var open = false;

function preload() {
  lavaimg = loadImage('images/lava.png');
  personimg = loadImage('images/sprite_0.png');
  cryimg = loadImage('images/sprite_1.png');
  cImg = loadImage('images/treasureClosed.png');
  oImg = loadImage('images/treasureEater.jpg');
}

function setup() {
  createCanvas(600, 400);

  lev = createP('Hello! I am Sam. I am stuck in this cave full of lava. This cave belongs to the pirate Henry Avery. He hid all of his treasure here in the 15th century! But, I do not  want it. However, we could collect some gems on the way. There are traps everywhere. Be careful and look out for some hints carved on the walls.');

  engine = Engine.create();
  world = engine.world;


  boy = Bodies.rectangle(40, 200, 50, 100, {
    isStatic: false,
    restitution: 0.8,
    friction: 0.8
  });
  World.add(world, boy);

  ground = Bodies.rectangle(width / 2, 390, width, 20, {
    isStatic: true
  });
  World.add(world, ground);

  s1 = Bodies.rectangle(width / 2, -100, width, 20, {
    isStatic: true
  });
  World.add(world, s1);

  s2 = Bodies.rectangle(-100, height / 2, 20, height, {
    isStatic: true
  });
  World.add(world, s2);

  s3 = Bodies.rectangle(700, height / 2, 20, height, {
    isStatic: true
  });
  World.add(world, s3);

  b1 = new Block(50, 350, 80, 20);
  b2 = new Block(140, 270, 80, 20);
  b3 = new Block(420, 230, 80, 20);
  b4 = new Block(500, 100, 80, 20);
  blocks.push(b1, b2, b3, b4);

  gem1 = new Gem(width / 2 - 50, height / 2);
  gem1.show();

  Engine.run(engine);

  fill(255);
  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);

}

function draw() {
  background(0);

  text("Gems: " + gemCount + "   Level: " + level, 10, 20);

  if (!gameOver) {
    image(personimg, boy.position.x, boy.position.y - 5, 50, 100);
  }

  if (showLava) {
    image(lavaimg, ground.position.x, ground.position.y, width, 20);
  }

  if (level === 1) {
    if (!gameOver) {
      text("Reach Here!", 470, 80);
      fill(200);
      textSize(15);
      text("Use Up arrow keys to jump.", 270, 330);
      text("Collect the gem and reach to the topmost block.", 270, 370)
    }

    b1.show();
    b2.show();
    b3.show();
    b4.show();

    if (touchedLava()) {
      gameOver = true;
      textSize(25);
      text("Game Over!", width / 2 - 80, height / 2 - 100);
      image(cryimg, boy.position.x, boy.position.y, 50, 100);
    }

    if (reachedLev1Checkpoint() && gemCount === 1) {
      greet();
      level = 2;
      Body.setPosition(boy, { x: 30, y: height / 2 });
    }

  } else {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].removeFromWorld();
    }
  }

  if (level === 2) {
    showLava = false;
    lev.html('Level 2: Collect the gems and do not cross the borders.');
    if (gemNum < 10) {
      gems.push(new Gem(random(100, width), random(100, height)));
      gemNum++;
    }
    if (gemCount === gemNum + 1 && gemNum > 8) {
      level = 3;
      greet();
    }
  }

  if (level === 3) {
    lev.html('Go away from the monsters which are trying to eat Sam and do not go out of the borders');
    text("Health: " + health + "%", 10, 70);
    if (monNum < 7) {
      mons.push(new Monster(random(width), random(height)));
      monNum++;
    }
    for (var i in mons) {
      mons[i].show();
    }
    setTimeout(() => {
      if (!gameOver) {
        level = 4;
        if (al < 1) {
          greet();
          al++;
        }
      }
    }, 15000);

    detectCollision();
  }

  if (level === 4) {
    if (!open) {
      image(cImg, width / 2, height / 2 + 100);
    } else {
      image(oImg, width / 2, height / 2 + 100, width, height);
    }
    if (dCount < 1) {
      var p = createP('Do you want to open this box? Click on any button.');
      p.position(20, 20);
      p.style('color', '#ffffff')
      var button1 = createButton('Yes');
      button1.position(20, 70);
      var button2 = createButton('No');
      button2.position(70, 70);
      dCount++;
    }
    if (button1) {
      button1.mousePressed(() => {
        open = true;
        p.html('Oh no! There was a monster in it! GAMEOVER');
        gameOver = true;
      });
    }
  }

  collectGem(gem1.sprite, gem1);

  for (var i in gems) {
    gems[i].show();
    collectGem(gems[i].sprite, gems[i]);
  }

  gameover();

  drawSprites();
}

function detectCollision() {
  for (j in mons) {
    if (Matter.SAT.collides(boy, mons[j].body).collided && !gameOver) {
      health -= 2;
    }
  }
}

function greet() {
  alert("Congratulations! You have successfully entered the next level!");
}

function gameover() {
  if (boy.position.x < 0 || boy.position.x > width || boy.position.y > height) {
    gameOver = true;
    textSize(25);
    text("Game Over!", width / 2 - 80, height / 2 - 100);
  }
}

function collectGem(gemName, gem) {
  if (boy.position.x >= gemName.x - 30 && boy.position.x <= gemName.x + 30 && boy.position.y >= gemName.y - gemName.height / 2 - 15 && boy.position.y <= gemName.y + gemName.height / 2 + 15 && gem.isThere) {
    gemName.destroy();
    gemCount++;
    gem.isThere = false;
  }
}

function touchedLava() {
  if (Matter.SAT.collides(boy, ground).collided) {
    return true;
  } else {
    return;
  }
}

function reachedLev1Checkpoint() {
  if (boy.position.x >= 490 && boy.position.y < 100 && level === 1) {
    return true;
  } else {
    return;
  }
}

function keyPressed() {
  if (key === "ArrowUp" && !gameOver) {
    Body.applyForce(boy, boy.position, {
      x: 0,
      y: -0.1
    });
  }
  if (key === "ArrowRight" && !gameOver) {
    Body.applyForce(boy, boy.position, {
      x: 0.1,
      y: 0
    });
  }
  if (key === "ArrowLeft" && !gameOver) {
    Body.applyForce(boy, boy.position, {
      x: -0.1,
      y: 0
    });
  }
}