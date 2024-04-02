const startBtn = document.getElementById("startButton");
const content = document.getElementById("game-content");
const descEl = document.querySelector(" .desc");
const timerEl = document.querySelector(" .timer span");
let timer = 180;
const cursor = document.querySelector(" .hammer");
//total nine holes (3X3)
const holes = [...document.querySelectorAll(" .hole")];
const scoreEl = document.querySelector(" .score span");
let score = 0;
const hittingSound = new Audio("./sound/hit.mp3");

startBtn.addEventListener("click", function () {
  descEl.style.display = "none";
  startBtn.style.display = "none";

  content.style.display = "block";
  console.log(timerEl.innerHTML);

  const countdown = setInterval(function () {
    let secondsLeft = parseInt(timerEl.textContent) - 1;
    timerEl.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      clearInterval(timer);

      alert("Time's up!");
    }
  }, 1000);
});

function run() {
  const randomNum = Math.floor(Math.random() * holes.length);
  const hole = holes[randomNum];
  const img = document.createElement("img");

  img.classList.add("mole");
  img.src = "./image/mole.png";

  img.addEventListener("click", (e) => {
    hittingSound.play();
    score += 5;
    scoreEl.textContent = score;
    img.src = "./image/whack-a-mole.png";
    clearTimeout(timer);
    setTimeout(() => {
      hole.removeChild(img);
      run();
    }, 500);
  });

  hole.appendChild(img);
  timer = setTimeout(() => {
    hole.removeChild(img);
    run();
  }, 1500);
}
run();

window.addEventListener("mouseover", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

window.addEventListener("mousedown", () => {
  cursor.classList.add("active");
});

window.addEventListener("mouseup", () => {
  cursor.classList.remove("active");
});
