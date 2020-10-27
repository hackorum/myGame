class Circle {
    constructor() {
        this.radius = 60;
        this.al = 255;
        this.reverse = false;
    }

    show() {
        push();
        noFill();
        stroke(0, 191, 255, this.al);
        ellipse(width / 2, height / 2, this.radius, this.radius);
        pop();
    }

    update() {
        if (this.radius < width / 2 - 100 && !this.reverse && this.al > 10) {
            this.radius += 1;
            this.al -= 0.65;
        } else {
            this.reverse = true;
            this.radius -= 1;
            this.al += 0.5;
        }

        if (this.radius < 30) {
            this.reverse = false;
        }
    }
}