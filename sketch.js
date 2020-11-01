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
var timeout = true;
var lev5 = false;
var mon1 = 0;
var bigMon;
var sh = true;
var pCount = 0;
var myHealth = 100;
var cir;
var s1 = true;

function preload() {
  lavaimg = loadImage('images/lava.png');
  personimg = loadImage('images/sprite_0.png');
  cryimg = loadImage('images/sprite_1.png');
  cImg = loadImage('images/treasureClosed.png');
  oImg = loadImage('images/treasureEater.jpg');
  ov = loadImage('images/gameOver.jpg');
  sword = loadImage('images/sword.png');

  gemSound = loadSound('gemSound.mp3');
  dieSound = loadSound('die.mp3');
  checkSound = loadSound('checkPoint.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight - 100);

  lev = createP('Hello! I am Sam. I am stuck in this cave full of lava. This cave belongs to the pirate Henry Avery. He hid all of his treasure here in the 15th century! But, I do not  want it. However, we could collect some gems on the way. There are traps everywhere. Be careful and look out for some hints carved on the walls.');

  engine = Engine.create();
  world = engine.world;

  bigMon = new Monster(width / 2 + 500, height / 2, true);

  boy = Bodies.rectangle(width / 10, height / 10, 50, 100, {
    isStatic: false,
    restitution: 0.8,
    friction: 0.8
  });
  World.add(world, boy);

  ground = Bodies.rectangle(width / 2, height - 10, width, 20, {
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

  s3 = Bodies.rectangle(width + 100, height / 2, 20, height, {
    isStatic: true
  });
  World.add(world, s3);

  b1 = new Block(width / 10, ground.position.y - 80, 80, 20);
  b2 = new Block(width / 3.8 + 50, height / 1.5, 80, 20);
  b3 = new Block(width / 1.5, height / 2.1, 80, 20);
  b4 = new Block(width / 1.2, height / 4, 80, 20);
  blocks.push(b1, b2, b3, b4);

  gem1 = new Gem(width / 2 - 50, height / 2);
  gem1.show();

  cir = new Circle();

  Engine.run(engine);
  fill(255);
  rectMode(CENTER);
  imageMode(CENTER);
  ellipseMode(RADIUS);

}

function draw() {
  background(0);

  text("Gems: " + gemCount + "   Level: " + level, 10, 20);

  if (!gameOver && sh) {
    image(personimg, boy.position.x, boy.position.y - 5, 50, 100);
  }
  if (!sh) {
    image(sword, boy.position.x, boy.position.y, 50, 100);
  }

  if (showLava) {
    image(lavaimg, ground.position.x, ground.position.y, width, 20);
  }

  if (level === 1) {
    if (!gameOver) {
      text("Reach Here!", width / 1.3, height / 5);
      fill(200);
      textSize(15);
      text("Use Up arrow keys to jump.", 50, height - 100);
      text("Collect the gem and reach to the top.", 0, height - 50)
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
      Body.setPosition(boy, {
        x: 30,
        y: height / 2
      });
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
    text("Health: " + myHealth + "%", 10, 40);
    lev.html('Go away from the monsters which are trying to eat Sam and do not go out of the borders');
    if (monNum < 5) {
      mons.push(new Monster(random(width), random(height)));
      monNum++;
    }
    for (var i in mons) {
      mons[i].show();
    }
    if (timeout) {
      setTimeout(() => {
        if (!gameOver) {
          level = 4;
          if (al < 1) {
            greet();
            al++;
          }
        }
      }, 15000);
    }
  }

  if (!lev5) {
    if (level === 4) {
      timeout = false;
      lev.html('Be careful there might be a trap.');
      Body.setPosition(boy, {
        x: width / 2,
        y: height - 100
      });
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
    }
  }
  if (button1) {
    button1.mousePressed(() => {
      open = true;
      p.html('Oh no! There was a monster in it! GAMEOVER');
      gameOver = true;
    });
  }
  if (button2) {
    button2.mouseClicked(() => {
      greet();
      removeElements();
      Body.setPosition(boy, {
        x: width / 2,
        y: height / 2 + 100
      });
      lev5 = true;
    });

  }

  if (lev5) {
    level = 5;
    sh = false;
    cir.show();
    cir.update();
    if (pCount < 1) {
      des = createP('This is an energy core. Try to blast it so that I can get out of this cave.');
      pCount++;
    }
    text("Energy Left in the core: " + floor(health) + "%", 10, 70);
    Body.setPosition(bigMon.body, {
      x: width / 2,
      y: height / 2
    });
    bigMon.show();
  }

  collectGem(gem1.sprite, gem1);

  for (var i in gems) {
    gems[i].show();
    collectGem(gems[i].sprite, gems[i]);
  }

  if (gameOver) {
    textSize(25);
    text("Game Over!", width / 2 - 80, height / 2 - 100);
    World.remove(world, boy);
    if (s1) {
      dieSound.play();
      s1 = false;
    }
  }

  gameover();
  detectCollision();
  core();
  level3health();

  drawSprites();
}

function core() {
  if (health < 1) {
    level = "Over";
    World.remove(world, bigMon.body);
    bg = createSprite(width / 2, height / 2);
    bg.addImage(ov);
    gameOver = true;
    if (des) {
      des.html('Thank you! You have blasted the core and have gotten out of the cave!');
    }
  }
}

function detectCollision() {
  if (Matter.SAT.collides(boy, bigMon.body).collided) {
    health -= 0.5;
  }
}

function level3health() {
  for (const j in mons) {
    if (Matter.SAT.collides(boy, mons[j].body).collided) {
      myHealth -= 5;
    }
  }
  if (myHealth < 1) {
    myHealth = 0;
    gameOver = true;
    textSize(25);
    text("Game Over!", width / 2 - 80, height / 2 - 100);
  }
}

function greet() {
  checkSound.play();
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
    gemSound.play();
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
  if (boy.position.x >= width / 1.2 && boy.position.y < height / 4 && level === 1) {
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
