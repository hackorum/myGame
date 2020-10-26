class Monster {
  constructor(x, y, big) {
    if (!big) {
      this.image1 = loadImage('images/monster.png');
      this.image2 = loadImage('images/monster2.png');
      this.body = Bodies.circle(x, y, 30, { restitution: 1.25 });
      World.add(world, this.body);
      this.r = 60;
      this.num = floor(random(2));
    } else {
      this.img1 = loadImage('images/energyCore.png');
      this.body = Bodies.circle(x, y, 60, { isStatic: false });
      World.add(world, this.body);
    }
    this.big = big;
  }

  show() {
    var pos = this.body.position;

    if (!this.big) {
      switch (this.num) {
        case 0: image(this.image1, pos.x, pos.y, this.r, this.r);
          break;
        case 1: image(this.image2, pos.x, pos.y, this.r, this.r);
          break;
        default: image(this.image2, pos.x, pos.y, this.r, this.r);
          break;
      }
    } else {
      image(this.img1, this.body.position.x, this.body.position.y, 120, 120);
    }
  }
}
