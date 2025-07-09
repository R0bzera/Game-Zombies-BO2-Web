export default class Player {
  constructor(x, y, radius = 20, baseSpeed = 2) {
    this.position = { x, y };
    this.radius   = radius;
    this.baseSpeed = baseSpeed;
    this.speed    = this.baseSpeed;
    this.runMultiplier = 2;
    this.angle    = 0;
  }

  update(input, bounds) {
    if (input.up)    this.position.y -= this.speed;
    if (input.down)  this.position.y += this.speed;
    if (input.left)  this.position.x -= this.speed;
    if (input.right) this.position.x += this.speed;

    this.position.x = Math.max(this.radius, Math.min(bounds.width  - this.radius, this.position.x));
    this.position.y = Math.max(this.radius, Math.min(bounds.height - this.radius, this.position.y));

    const dx = input.mouseX - this.position.x;
    const dy = input.mouseY - this.position.y;
    this.angle = Math.atan2(dy, dx);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.angle);

    ctx.beginPath();
    ctx.moveTo(this.radius, 0);
    ctx.lineTo(-this.radius,  this.radius * 0.6);
    ctx.lineTo(-this.radius, -this.radius * 0.6);
    ctx.closePath();
    ctx.fillStyle = '#2196F3';
    ctx.fill();

    ctx.restore();
  }

  run(enable = true){
    this.speed = enable
    ? this.baseSpeed * this.runMultiplier
    : this.baseSpeed;
  }
}
