class Gem {
  constructor(x, y) {
    this.sprite = createSprite(x, y);
    this.img1 = loadImage('images/1.png');
    this.img2 = loadImage('images/2.png');
    this.img3 = loadImage('images/3.png');
    this.isThere = true;
    this.num = floor(random(3));
  }

  show() {
    switch (this.num) {
      case 0: this.sprite.addImage(this.img1);
        break;
      case 1: this.sprite.addImage(this.img2);
        break;
      case 2: this.sprite.addImage(this.img3);
        break;
      default: console.log("Gem");
    }
  }
}