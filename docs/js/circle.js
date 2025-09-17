let t;
let drops = [];

function setup() {
  const header = document.querySelector('.masthead');
  const rect = header.getBoundingClientRect();
  let cnv = createCanvas(rect.width, rect.height);
  cnv.parent('circle-bg-canvas');
  cnv.position(rect.left + window.scrollX, rect.top + window.scrollY);
  cnv.style('position', 'absolute');
  cnv.style('z-index', '-1');
  noStroke();
  t = 0;

  // Create metallic floating drops
  let cx = rect.width; // match cx in draw()
  drops = [];
  for (let i = 0; i < 80; i++) {
    drops.push({
      ang: random(TWO_PI),
      orbitR: random(200, 800),
      //orbitR: random(-cx, rect.width - cx), // covers full header width
      speed: random(0.001, 0.01),
      size: random(15, 35),
      noiseOffset: random(1000)
    });
  }
}

function windowResized() {
  const header = document.querySelector('.masthead');
  const rect = header.getBoundingClientRect();
  resizeCanvas(rect.width, rect.height);
  let cnv = document.querySelector('canvas');
  cnv.style.left = (rect.left + window.scrollX) + 'px';
  cnv.style.top = (rect.top + window.scrollY) + 'px';
}

function drawMetallicLoop(cx, cy, baseR, thickness) {
  let ctx = drawingContext;
  ctx.save();

  // Radial metallic gradient
  let grad = ctx.createRadialGradient(cx, cy, baseR - thickness, cx, cy, baseR + thickness);
  grad.addColorStop(0, "#e0e0e0");
  grad.addColorStop(0.3, "#b0b0b0");
  grad.addColorStop(0.7, "#888");
  grad.addColorStop(1, "#fff");
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = grad;

  ctx.beginPath();
  // Outer edge
  for (let i = 0; i <= 200; i++) {
    let ang = (i / 200) * TWO_PI;
    let base = noise(i * 0.02, t * 0.003);
    let wobble = noise(i * 0.05 + t * 0.01, t * 0.004);
    let r = baseR + thickness + 40 * base + 30 * wobble;
    let x = cx + r * Math.cos(ang);
    let y = cy + r * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  // Inner edge
  for (let i = 200; i >= 0; i--) {
    let ang = (i / 200) * TWO_PI;
    let base = noise(i * 0.02, t * 0.003 + 100);
    let wobble = noise(i * 0.05 + t * 0.01 + 100, t * 0.004);
    let r = baseR - thickness + 20 * base + 15 * wobble;
    let x = cx + r * Math.cos(ang);
    let y = cy + r * Math.sin(ang);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawMetallicSphere(x, y, size, noiseOffset) {
  let ctx = drawingContext;

  // Create metallic gradient
  let grad = ctx.createRadialGradient(
    x - size * 0.3, y - size * 0.3, size * 0.1,
    x, y, size
  );
  grad.addColorStop(0, "#f0f0f0");
  grad.addColorStop(0.2, "#b0b0b0");
  grad.addColorStop(0.5, "#666");
  grad.addColorStop(0.8, "#333");
  grad.addColorStop(1, "#000");
  ctx.fillStyle = grad;

  // Wobbly edge
  ctx.beginPath();
  let steps = 60;
  for (let i = 0; i <= steps; i++) {
    let ang = (i / steps) * TWO_PI;
    let wobble = noise(noiseOffset + t * 0.01, cos(ang), sin(ang));
    let r = size * 0.5 * (0.85 + wobble * 0.3);
    let px = x + cos(ang) * r;
    let py = y + sin(ang) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function drawDrops(cx, cy, baseR) {
  for (let d of drops) {
    d.ang += d.speed;
    let rNoise = noise(d.noiseOffset + t * 0.005) * 40 - 20;
    let r = baseR + d.orbitR + rNoise;
    let x = cx + r * cos(d.ang);
    let y = cy + r * sin(d.ang);
    drawMetallicSphere(x, y, d.size, d.noiseOffset);
  }
}

function draw() {
  clear();
  let cx = width * 0.9;  // width
  let cy = height / 2;  // height
  let baseRadius = min(width, height) / 3; // Base radius of the loop
  let thickness = baseRadius / 3; // Thickness of the loop

  drawMetallicLoop(cx, cy, baseRadius, thickness);
  drawDrops(cx, cy, baseRadius);

  t += 1;
}
