import InputHandler from './inputHandler.js';
import Player       from './player.js';
import Projectile   from './projectile.js';

const canvas      = document.getElementById('gameCanvas');
const ctx         = canvas.getContext('2d');
const input       = new InputHandler(canvas);
const projectiles = [];
let   player;

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

player = new Player(canvas.width / 2, canvas.height / 2);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  player.run(input.running);
  player.update(input, { width: canvas.width, height: canvas.height });
  player.draw(ctx);

  if (input.shoot) {
    projectiles.push(
      new Projectile(player.position.x, player.position.y, player.angle)
    );
    input.shoot = false;
  }

  projectiles.forEach(p => {
    p.update();
    p.draw(ctx);
  });

  for (let i = projectiles.length - 1; i >= 0; i--) {
    if (projectiles[i].isOffScreen(canvas.width, canvas.height)) {
      projectiles.splice(i, 1);
    }
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
