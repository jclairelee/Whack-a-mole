const startBtn = document.getElementById("startButton");
const content = document.getElementById("game-content");
const descEl = document.querySelector(".desc");
const timerEl = document.querySelector(".timer span");
let timer = 180;
let countdown;

const cursor = document.querySelector(".hammer");
const holes = [...document.querySelectorAll(".hole")];
const scoreEl = document.querySelector(".score span");
let score = 0;
const hittingSound = new Audio("./sound/hit.mp3");
const bombSound = new Audio("./sound/bomb.mp3");

startBtn.addEventListener("click", function () {
  descEl.style.display = "none";
  startBtn.style.display = "none";
  content.style.display = "block";

  countdown = setInterval(function () {
    timer--;
    timerEl.textContent = timer;

    if (timer <= 0) {
      clearInterval(countdown);
      alert("Time's up!");
    }
  }, 1000);

  run();
});

function run() {
  const randomNum = Math.floor(Math.random() * holes.length);
  const hole = holes[randomNum];

  if (hole.querySelector(".mole") || hole.querySelector(".bomb")) {
    run();
    return;
  }

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
    }, 800);
  });

  hole.appendChild(img);

  // bombs
  const bombChance = Math.random();
  if (bombChance < 0.1) {
    const bombImg = document.createElement("img");
    bombImg.classList.add("bomb");
    bombImg.src = "./image/bomb.png";

    bombImg.addEventListener("click", (e) => {
      bombSound.play();
      score -= 10;
      scoreEl.textContent = score;
      img.src = "./image/whack-a-mole.png";
      clearTimeout(timer);
      setTimeout(() => {
        hole.removeChild(bombImg);
        run();
      }, 1000);
    });

    hole.appendChild(bombImg);
  }

  const moleSpeed = Math.random() * (1500 - 500) + 500;
  timer = setTimeout(() => {
    if (hole.contains(img)) {
      hole.removeChild(img);
    }
    run();
  }, moleSpeed);
}

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
