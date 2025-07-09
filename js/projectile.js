export default class Projectile {
  constructor(x, y, angle, speed = 80, radius = 4) {
    this.position = { x, y };
    this.angle    = angle;
    this.speed    = speed;
    this.radius   = radius;
  }

  update() {
    this.position.x += Math.cos(this.angle) * this.speed;
    this.position.y += Math.sin(this.angle) * this.speed;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = '#f44336';
    ctx.fill();
  }

  isOffScreen(width, height) {
    return (
      this.position.x < -this.radius ||
      this.position.x > width  + this.radius ||
      this.position.y < -this.radius ||
      this.position.y > height + this.radius
    );
  }
}
