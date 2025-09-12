let imgs = [];
let movers = [];
let avoidRects = [];
let canvasW, canvasH;

function preload() {
  imgs[0] = loadImage('assets/metalic/silver1.png');
  imgs[1] = loadImage('assets/metalic/silver2.png');
  imgs[2] = loadImage('assets/metalic/silver3.png');
  imgs[3] = loadImage('assets/metalic/silver4.png');
  imgs[4] = loadImage('assets/metalic/silver5.png');
  imgs[5] = loadImage('assets/metalic/silver6.png');
  imgs[6] = loadImage('assets/metalic/silver7.png');
  imgs[7] = loadImage('assets/metalic/silver8.png');
  imgs[8] = loadImage('assets/metalic/silver9.png');
  imgs[9] = loadImage('assets/metalic/silver10.png');
  imgs[10] = loadImage('assets/metalic/silver11.png');
  imgs[11] = loadImage('assets/metalic/silver12.png');

}

function setup() {
  canvasW = document.body.scrollWidth;
  canvasH = document.body.scrollHeight;
  let cnv = createCanvas(canvasW, canvasH);
  cnv.parent('p5-global-canvas');
  cnv.position(0, 0);
  cnv.style('position', 'absolute');
  cnv.style('pointer-events', 'none');
  movers = [];
  for (let i = 0; i < imgs.length; i++) {
    let w = imgs[i].width * 0.2;
    let h = imgs[i].height * 0.2;
    movers.push(new Mover(random(canvasW-w), random(canvasH-h), w, h, imgs[i]));
  }
  updateAvoidRects();
}

function windowResized() {
  canvasW = document.body.scrollWidth;
  canvasH = document.body.scrollHeight;
  resizeCanvas(canvasW, canvasH);
  updateAvoidRects();
}

function updateAvoidRects() {
  avoidRects = [];
  document.querySelectorAll(
    '.entrega-img, .about-img, .about-text-col, .moodboard-image img, .moodboard-text, .delivery-info-section .col-md-3'
  ).forEach(el => {
    let rect = el.getBoundingClientRect();
    avoidRects.push({
      x: rect.left + window.scrollX,
      y: rect.top + window.scrollY,
      w: rect.width,
      h: rect.height
    });
  });
}

function draw() {
  clear();
  for (let m of movers) {
    m.update();
    // Check collision with avoidRects
// In draw(), replace your collision block with:
for (let r of avoidRects) {
  if (
    m.x + m.w > r.x &&
    m.x < r.x + r.w &&
    m.y + m.h > r.y &&
    m.y < r.y + r.h
  ) {
    // horizontal collision
    if (m.x + m.w / 2 < r.x + r.w / 2) {
      m.x = r.x - m.w - 2;
      m.vx = -abs(m.vx);
    } else {
      m.x = r.x + r.w + 2;
      m.vx = abs(m.vx);
    }

    // vertical collision
    if (m.y + m.h / 2 < r.y + r.h / 2) {
      m.y = r.y - m.h - 2;
      m.vy = -abs(m.vy);
    } else {
      m.y = r.y + r.h + 2;
      m.vy = abs(m.vy);
    }
  }
}
    m.display();
  }
}

class Mover {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
    this.vx = random(-1.5, 1.5);
    this.vy = random(-1.5, 1.5);
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    // Allow objects to go a bit off screen (20px)
    if (this.x < -20) {
      this.x = -20;
      this.vx *= -1;
    }
    if (this.x + this.w > canvasW + 20) {
      this.x = canvasW + 20 - this.w;
      this.vx *= -1;
    }
    if (this.y < -20) {
      this.y = -20;
      this.vy *= -1;
    }
    if (this.y + this.h > canvasH + 20) {
      this.y = canvasH + 20 - this.h;
      this.vy *= -1;
    }
  }
  display() {
    image(this.img, this.x, this.y, this.w, this.h);
  }
}

// Update avoidRects on scroll or resize
window.addEventListener('scroll', updateAvoidRects);
window.addEventListener('resize', updateAvoidRects);