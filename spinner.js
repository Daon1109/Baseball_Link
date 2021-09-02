const lipsumText = `<p>
<a href="mainpage.html"><h1>Go to YadongLink</h1></a>
</p>`;

// State variables
var spinnerProgress = 0;
var mouseIsDown = false;
var previousPos = undefined;

// Document objects
var progressNum;
var lipsum;
var canv;
var ctx;
var rect;

window.onload = function () {
  progressNum = document.getElementById("progress-num");
  lipsum = document.getElementById("lipsum");
  canv = document.getElementById("spinner-canvas");
  ctx = canv.getContext("2d");
  rect = canv.getBoundingClientRect();

  progressNum.innerHTML = `Loading... ${+spinnerProgress.toFixed(1)}%`;

  // Add event listeners
  canv.addEventListener("mousedown", onMouseDown);
  canv.addEventListener("mousemove", onMouseMove);
  canv.addEventListener("mouseup", onMouseUp);

  // Draw spinner
  drawSpinner();
}

function onMouseDown(event) {
  mouseIsDown = true;
  let radialPos = calculateRadians(event.pageX, event.pageY);
  previousPos = radialPos;
}

function onMouseUp(event) {
  mouseIsDown = false;
  previousPos = undefined;
}

function onMouseMove(event) {
  if (mouseIsDown === true) {
    let radialPos = calculateRadians(event.pageX, event.pageY);
    let delta = (radialPos - previousPos) % (2 * Math.PI);
    previousPos = radialPos;

    // If absolute value of delta is very large we need to compensate
    // Otherwise, delta will hang around 0 and 6.28 until mouse is released
    if (delta > 4.75) {
      delta -= 2 * Math.PI;
    } else if (delta < -4.75) {
      delta += 2 * Math.PI;
    }

    // Apply spinner delta to overall spinner progress
    spinnerProgress += delta;

    if (spinnerProgress > 100) {
      // Hide spinner and load contents
      progressNum.style.display = 'none';
      canv.style.display = 'none';
      lipsum.innerHTML = lipsumText;
    } else {
      // Update progress % number
      progressNum.innerHTML = `Loading... ${+spinnerProgress.toFixed(1)}%`;

      // Rotate canvas and re-draw spinner
      ctx.translate(rect.width / 2, rect.height / 2);
      ctx.rotate(delta);
      ctx.translate(-rect.width / 2, -rect.height / 2);
      drawSpinner();
    }
  }
}

function calculateRadians(x, y) {
  /**
   * Calculates radians of mouse position from center of rect.
   */
  let rectX = x - rect.left - 1;
  let rectY = y - rect.top - 1;
  let deltaX = rectX - rect.width / 2;
  let deltaY = rectY - rect.height / 2;
  return Math.atan2(deltaY, deltaX);
}

function drawSpinner() {
  ctx.lineWidth = Math.floor(rect.height * 0.04);
  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.arc(
    rect.width * 0.5,
    rect.height * 0.5,
    rect.height * 0.15,
    spinnerProgress % (2 * Math.PI),
    (spinnerProgress + 5) % (2 * Math.PI)
  );
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth++;
  ctx.beginPath();
  ctx.strokeStyle = 'white';
  ctx.arc(
    rect.width * 0.5,
    rect.height * 0.5,
    rect.height * 0.15,
    spinnerProgress % (2 * Math.PI),
    (spinnerProgress + 5) % (2 * Math.PI),
    true
  );
  ctx.stroke();
  ctx.closePath();
  ctx.lineWidth = 1;
}
