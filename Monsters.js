class Monster {
  constructor(x, y) {
    this.image1 = loadImage('images/monster.png');
    this.image2 = loadImage('images/monster2.png');
    this.body = Bodies.circle(x, y, 30, { restitution: 1.25 });
    World.add(world, this.body);
    this.r = 30;
    this.num = floor(random(2));
  }

  show() {
    var pos = this.body.position;
    // switch (this.num) {
    //   case 0: image(this.image1, pos.x, pos.y, this.r, this.r);
    //     break;
    //   case 1: image(this.image2, pos.x, pos.y, this.r, this.r);
    //     break;
    //   default: image(this.image2, pos.x, pos.y, this.r, this.r);
    //     break;
    // }
    ellipse(pos.x, pos.y, this.r, this.r);
  }
}