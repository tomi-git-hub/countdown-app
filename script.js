let interval;

const titleInput = document.getElementById("title");
const targetInput = document.getElementById("target");
const startBtn = document.getElementById("start");
const eventName = document.getElementById("eventName");
const msg = document.getElementById("msg");

function update(target) {
  const diff = target - Date.now();

  if (diff <= 0) {
    clearInterval(interval);
    setTime(0, 0, 0, 0);
    msg.textContent = "Time's up! 🎉";
    localStorage.removeItem("countdown");
    return;
  }

  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  setTime(d, h, m, s);
}

function setTime(d, h, m, s) {
  document.getElementById("d").textContent = d;
  document.getElementById("h").textContent = h;
  document.getElementById("m").textContent = m;
  document.getElementById("s").textContent = s;
}

function begin(target, title) {
  clearInterval(interval);
  msg.textContent = "";
  eventName.textContent = title;
  update(target);
  interval = setInterval(() => update(target), 1000);
}

startBtn.addEventListener("click", () => {
  if (!targetInput.value) {
    msg.textContent = "Please pick a date and time.";
    return;
  }
  const target = new Date(targetInput.value).getTime();
  const title = titleInput.value || "Countdown";
  localStorage.setItem("countdown", JSON.stringify({ target, title }));
  begin(target, title);
});

// Restore saved countdown on page load
const saved = JSON.parse(localStorage.getItem("countdown"));
if (saved) begin(saved.target, saved.title);
