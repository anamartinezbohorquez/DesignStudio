let t;

function setup() {
  let cnv = createCanvas(window.innerWidth, window.innerHeight);
  cnv.parent('circle-bg-canvas');
  cnv.style('position', 'fixed');
  cnv.style('top', '0');
  cnv.style('left', '0');
  cnv.style('z-index', '-1');
  // background(0, 0, 0);
  clear(); // transparent background
  stroke(0, 40);
  noFill();
  t = 0;
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  background(0, 0, 0);
}

function draw() {
  translate(width / 2, height / 2);

  for (let j = 0; j < 4; j++) {
    beginShape();
    for (let i = 0; i < 200; i++) {
      let ang = map(i, 0, 200, 0, TWO_PI);
      let base = noise(i * 0.01, t * 0.003 + j * 0.1);
      let wobble = noise(i * 0.05 + t * 0.01, t * 0.004 + j * 0.1);

      let rad = min(width, height) / 3 + 80 * base + 40 * wobble + j * 1.5;
      let x = rad * cos(ang);
      let y = rad * sin(ang);
      curveVertex(x, y);
    }
    endShape(CLOSE);
  }

  beginShape();
  for (let i = 0; i < 200; i++) {
    let ang = map(i, 0, 200, 0, TWO_PI);
    let base = noise(i * 0.01, t * 0.003);
    let wobble = noise(i * 0.05 + t * 0.01, t * 0.004);

    let rad = min(width, height) / 3 + 80 * base + 40 * wobble;
    let x = rad * cos(ang);
    let y = rad * sin(ang);
    curveVertex(x, y);
  }
  endShape(CLOSE);

  t += 1;

  // fade background slightly for trailing effect
  fill(255, 10);
  noStroke();
  rect(-width / 2, -height / 2, width, height);
  noFill();
  stroke(0, 40);
}
