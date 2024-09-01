var ball_radius = 20;
var ball_colors = ["#FF5733", "#33FF7D", "#337DFF", "#FFB733"];
var ball_velocity = 5;
var canvas_padding = 50;
var balls = [];
var canvas = document.querySelector("svg");
var btn = document.querySelector(".circle-button");
btn.addEventListener("click", function () {
    canvas.classList.toggle("blackBg");
    btn.classList.toggle("black");
});
canvas.addEventListener("click", function (e) {
    var cx = e.clientX;
    var cy = e.clientY;
    var dx = (Math.random() - 0.5) * ball_velocity;
    var dy = (Math.random() - 0.5) * ball_velocity;
    var color = ball_colors[Math.floor(Math.random() * ball_colors.length)];
    balls.push({ cx: cx, cy: cy, dx: dx, dy: dy, color: color });
});
canvas.setAttribute("width", window.innerWidth.toString());
canvas.setAttribute("height", window.innerHeight.toString());
function createBalls(numBalls) {
    if (numBalls === void 0) { numBalls = 1; }
    for (var i = 0; i < numBalls; i++) {
        var cx = Math.random() * (window.innerWidth - canvas_padding - ball_radius * 2) +
            ball_radius +
            canvas_padding / 2;
        var cy = Math.random() * (window.innerWidth - canvas_padding - ball_radius * 2) +
            ball_radius +
            canvas_padding / 2;
        var dx = (Math.random() - 0.5) * ball_velocity;
        var dy = (Math.random() - 0.5) * ball_velocity;
        var color = ball_colors[Math.floor(Math.random() * ball_colors.length)];
        balls.push({ cx: cx, cy: cy, dx: dx, dy: dy, color: color });
    }
}
function updateBalls() {
    balls.forEach(function (ball) {
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
    balls.forEach(function (ball) {
        var circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "".concat(ball.cx.toString(), "px"));
        circle.setAttribute("cy", "".concat(ball.cy.toString(), "px"));
        circle.setAttribute("r", "".concat(ball_radius.toString(), "px"));
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
