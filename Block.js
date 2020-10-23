class Block {
  constructor(x, y, w, h) {
    this.body = Bodies.rectangle(x, y, w, h, {
      isStatic: true
    });
    World.add(world, this.body);
    this.img = loadImage('images/ground.png');
    this.w = w;
    this.h = h;
  }

  show() {
    image(this.img, this.body.position.x, this.body.position.y, this.w, this.h);
  }

  removeFromWorld() {
    World.remove(world, this.body);
  }
}