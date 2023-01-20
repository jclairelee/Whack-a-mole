const cursor = document.querySelector(" .hammer");
//total nine holes (3X3)
const holes = [...document.querySelectorAll(" .hole")];
const scoreEl = document.querySelector(" .score span");
let score = 0;
const hittingSound = new Audio("./sound/hit.mp3");

function run() {
  const randomNum = Math.floor(Math.random() * holes.length);
  const hole = holes[randomNum];
  let timer = null;
  const img = document.createElement("img");
  img.classList.add("mole");
  img.src = "./image/mole.png";

  img.addEventListener("click", () => {
    score += 10;
    hittingSound.play();
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
  }, 1300);
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
