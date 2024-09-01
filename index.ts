const ball_radius = 20;
const ball_colors = ["#FF5733", "#33FF7D", "#337DFF", "#FFB733"];
const ball_velocity = 5;

const canvas_padding = 50;

let balls: { cx: number; cy: number; dx: number; dy: number; color: string }[] = [];

const canvas = document.querySelector("svg") as SVGSVGElement;
const btn = document.querySelector(".circle-button") as HTMLElement;
btn.addEventListener("click", () => {
  canvas.classList.toggle("blackBg");
  btn.classList.toggle("black");
});
canvas.addEventListener("click", (e: MouseEvent) => {
  const cx = e.clientX;
  const cy = e.clientY;
  const dx = (Math.random() - 0.5) * ball_velocity;
  const dy = (Math.random() - 0.5) * ball_velocity;
  const color = ball_colors[Math.floor(Math.random() * ball_colors.length)];
  balls.push({ cx, cy, dx, dy, color });
});
canvas.setAttribute("width", window.innerWidth.toString());
canvas.setAttribute("height", window.innerHeight.toString());

function createBalls(numBalls: number = 1) {
  for (let i = 0; i < numBalls; i++) {
    const cx =
      Math.random() * (window.innerWidth - canvas_padding - ball_radius * 2) +
      ball_radius +
      canvas_padding / 2;
    const cy =
      Math.random() * (window.innerWidth - canvas_padding - ball_radius * 2) +
      ball_radius +
      canvas_padding / 2;
    const dx = (Math.random() - 0.5) * ball_velocity;
    const dy = (Math.random() - 0.5) * ball_velocity;
    const color = ball_colors[Math.floor(Math.random() * ball_colors.length)];
    balls.push({ cx, cy, dx, dy, color });
  }
}
function updateBalls() {
  balls.forEach((ball) => {
    ball.cx += ball.dx;
    ball.cy += ball.dy;

    if (ball.cx + ball_radius > window.innerWidth || ball.cx - ball_radius < 0) {
      ball.dx = -ball.dx;
    }
    if (ball.cy + ball_radius > window.innerHeight || ball.cy - ball_radius < 0) {
      ball.dy = -ball.dy;
    }
  });
}

function drawBall() {
  balls.forEach((ball) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    circle.setAttribute("cx", `${ball.cx.toString()}px`);
    circle.setAttribute("cy", `${ball.cy.toString()}px`);
    circle.setAttribute("r", `${ball_radius.toString()}px`);
    circle.setAttribute("fill", ball.color);
    canvas.append(circle);
  });
}

createBalls(Number(prompt("Введите количество шаров:")));
requestAnimationFrame(gameLoop);

function gameLoop() {
  updateBalls();
  canvas.innerHTML = "";
  drawBall();
  requestAnimationFrame(gameLoop);
}
