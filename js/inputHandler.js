export default class InputHandler {
  constructor(canvas) {
    // inicializa todos os flags
    this.up = this.down = this.left = this.right = this.shoot = this.running = false;
    this.mouseX = this.mouseY = 0;

    // teclado
    window.addEventListener('keydown', e => this._toggle(e.code, true));
    window.addEventListener('keyup',   e => this._toggle(e.code, false));

    // mouse
    canvas.addEventListener('mousemove', e => {
      const r = canvas.getBoundingClientRect();
      this.mouseX = e.clientX - r.left;
      this.mouseY = e.clientY - r.top;
    });
    canvas.addEventListener('mousedown', e => {
      if (e.button === 0) this.shoot = true;
    });
    canvas.addEventListener('mouseup',   e => {
      if (e.button === 0) this.shoot = false;
    });
  }

  _toggle(code, val) {
    switch (code) {
      case 'KeyW':
        this.up = val;
        break;
      case 'KeyS':
        this.down = val;
        break;
      case 'KeyA':
        this.left = val;
        break;
      case 'KeyD':
        this.right = val;
        break;
      case 'ShiftLeft':
      case 'ShiftRight':
        this.running = val;
        break;
    }
  }
}