let t;

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent('circle-bg-canvas');
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '-1');
  clear();
  t = 0;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  clear();
}

function drawMetallicLoop(cx, cy, baseR, thickness) {
  let ctx = drawingContext;
  ctx.save();

  // Create a radial metallic gradient for the loop
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
    let ang = (i / 200) * 2 * Math.PI;
    let base = noise(i * 0.02, t * 0.003);
    let wobble = noise(i * 0.05 + t * 0.01, t * 0.004);
    let r = baseR + thickness + 20 * base + 10 * wobble;
    let x = cx + r * Math.cos(ang);
    let y = cy + r * Math.sin(ang);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  // Inner edge (reverse)
  for (let i = 200; i >= 0; i--) {
    let ang = (i / 200) * 2 * Math.PI;
    let base = noise(i * 0.02, t * 0.003 + 100);
    let wobble = noise(i * 0.05 + t * 0.01 + 100, t * 0.004);
    let r = baseR - thickness + 10 * base + 5 * wobble;
    let x = cx + r * Math.cos(ang);
    let y = cy + r * Math.sin(ang);
    ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Draw highlights
  noFill();
  stroke(255, 220);
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < 200; i++) {
    let ang = map(i, 0, 200, 0, TWO_PI);
    let base = noise(i * 0.02, t * 0.003);
    let wobble = noise(i * 0.05 + t * 0.01, t * 0.004);
    let r = baseR + thickness * 0.7 + 10 * base + 5 * wobble;
    let x = cx + r * cos(ang);
    let y = cy + r * sin(ang);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  // Draw shadow
  stroke(80, 80, 80, 120);
  strokeWeight(6);
  beginShape();
  for (let i = 0; i < 200; i++) {
    let ang = map(i, 0, 200, 0, TWO_PI);
    let base = noise(i * 0.02, t * 0.003 + 50);
    let wobble = noise(i * 0.05 + t * 0.01 + 50, t * 0.004);
    let r = baseR - thickness * 0.7 + 10 * base + 5 * wobble;
    let x = cx + r * cos(ang);
    let y = cy + r * sin(ang);
    curveVertex(x, y);
  }
  endShape(CLOSE);
}

function draw() {
  clear();
  let cx = width / 2;
  let cy = height / 2;
  let baseRadius = min(width, height) / 4;
  let thickness = baseRadius / 3;

  drawMetallicLoop(cx, cy, baseRadius, thickness);

  t += 1;
}
